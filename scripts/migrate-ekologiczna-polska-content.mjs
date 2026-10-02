// One-off migration of company-owned content from https://ekologiczna-polska.pl/
// Downloads before/after realization photos and extracts customer testimonials.
//
// Usage: node scripts/migrate-ekologiczna-polska-content.mjs

import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const SOURCE_URL = "https://ekologiczna-polska.pl/";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGE_DIR = path.join(ROOT, "public/images/realizations");
const CONTENT_DIR = path.join(ROOT, "content");
const PUBLIC_IMAGE_PREFIX = "/images/realizations";

const EXTENSIONS = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png", "image/avif": "avif" };

const SIGNATURES = {
  webp: (b) => b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP",
  jpg: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  png: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  avif: (b) => b.toString("ascii", 4, 12).startsWith("ftyp"),
};

const warnings = [];

function fail(message) {
  console.error(`\n✖ ${message}`);
  process.exit(1);
}

function sectionByHeading($, headingText) {
  const heading = $("h2").filter((_, el) => $(el).text().trim() === headingText).first();
  if (!heading.length) fail(`Heading "${headingText}" not found on ${SOURCE_URL}`);
  const section = heading.closest("section");
  if (!section.length) fail(`No <section> container around "${headingText}"`);
  return section;
}

/** Original asset URL behind Next.js `/_next/image?url=…`, otherwise the URL itself. */
function originalAssetUrl(rawUrl) {
  const url = new URL(rawUrl, SOURCE_URL);
  if (url.pathname === "/_next/image" && url.searchParams.get("url")) {
    return new URL(url.searchParams.get("url"), SOURCE_URL).href;
  }
  return url.href;
}

/** Picks the best source for an <img>: the original asset, else the largest srcset candidate. */
function bestImageUrl($img) {
  const candidates = [];
  const srcset = $img.attr("srcset") ?? $img.attr("srcSet") ?? "";
  for (const entry of srcset.split(",").map((part) => part.trim()).filter(Boolean)) {
    const [url, descriptor = "1x"] = entry.split(/\s+/);
    candidates.push({ url, size: parseFloat(descriptor) * (descriptor.endsWith("w") ? 1 : 10_000) });
  }
  if ($img.attr("src")) candidates.push({ url: $img.attr("src"), size: 0 });
  if (!candidates.length) return null;

  const originals = new Set(candidates.map((candidate) => originalAssetUrl(candidate.url)));
  if (originals.size === 1) return [...originals][0];

  return originalAssetUrl(candidates.sort((a, b) => b.size - a.size)[0].url);
}

function extractRealizations($) {
  const section = sectionByHeading($, "Przed i po remoncie");
  const slides = section.find('[aria-roledescription="slide"]');
  if (!slides.length) fail('No realization slides found in "Przed i po remoncie".');

  return slides.toArray().map((slide, index) => {
    const number = index + 1;
    const $slide = $(slide);
    const title = $slide.find("h3").first().text().replace(/\s+/g, " ").trim();

    const imageFor = (label) => {
      const labelEl = $slide.find("p").filter((_, el) => $(el).text().trim() === label);
      if (labelEl.length !== 1) fail(`Realization ${number} ("${title}"): expected one "${label}" label, found ${labelEl.length}.`);
      const imgs = labelEl.parent().find("img");
      if (imgs.length !== 1) fail(`Realization ${number} ("${title}"): expected one "${label}" image, found ${imgs.length}.`);
      const url = bestImageUrl(imgs.first());
      if (!url) fail(`Realization ${number} ("${title}"): "${label}" image has no src/srcset.`);

      const alt = imgs.first().attr("alt") ?? "";
      const expected = label === "Przed" ? "przed" : "po";
      if (!alt.toLowerCase().endsWith(expected)) warnings.push(`Realization ${number}: "${label}" image alt is "${alt}".`);
      return url;
    };

    return { number, title, before: imageFor("Przed"), after: imageFor("Po") };
  });
}

function extractTestimonials($) {
  const section = sectionByHeading($, "Co mówią nasi klienci");
  const articles = section.find("article").toArray();
  if (!articles.length) fail('No testimonials found in "Co mówią nasi klienci".');

  const seen = new Set();
  const testimonials = [];

  for (const article of articles) {
    const $article = $(article);
    const quote = $article
      .find("blockquote p")
      .toArray()
      .map((p) => $(p).text().trim())
      .join("\n\n");
    const footer = $article.find('[data-slot="card-footer"] p').toArray().map((p) => $(p).text().trim());
    const [author, location] = footer;

    if (!quote || !author || location === undefined || footer.length !== 2) {
      warnings.push(`Testimonial skipped (unexpected structure): ${$article.text().trim().slice(0, 80)}…`);
      continue;
    }

    const key = JSON.stringify([quote, author, location]);
    if (seen.has(key)) continue; // the marquee repeats its items
    seen.add(key);
    testimonials.push({ quote, author, location });
  }

  return { testimonials, rawCount: articles.length };
}

async function download(url, context) {
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    fail(`${context}: request failed for ${url} (${error.message})`);
  }
  if (!response.ok) fail(`${context}: HTTP ${response.status} for ${url}`);

  const contentType = (response.headers.get("content-type") ?? "").split(";")[0].trim();
  const extension = EXTENSIONS[contentType] ?? path.extname(new URL(url).pathname).slice(1).toLowerCase();
  if (!SIGNATURES[extension]) fail(`${context}: unsupported image type "${contentType}" for ${url}`);

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length === 0) fail(`${context}: empty response for ${url}`);
  if (!SIGNATURES[extension](bytes)) fail(`${context}: file signature does not match ${extension} for ${url}`);

  return { bytes, extension };
}

async function main() {
  console.log(`Fetching ${SOURCE_URL}`);
  const response = await fetch(SOURCE_URL);
  if (!response.ok) fail(`HTTP ${response.status} for ${SOURCE_URL}`);
  const $ = cheerio.load(await response.text());

  const realizations = extractRealizations($);
  const { testimonials, rawCount } = extractTestimonials($);

  const urlUse = new Map();
  for (const { number, before, after } of realizations) {
    for (const [role, url] of [["before", before], ["after", after]]) {
      if (urlUse.has(url)) warnings.push(`Realization ${number} ${role} reuses the image of ${urlUse.get(url)}: ${url}`);
      else urlUse.set(url, `realization ${number} ${role}`);
    }
  }

  await mkdir(IMAGE_DIR, { recursive: true });
  await mkdir(CONTENT_DIR, { recursive: true });
  for (const file of await readdir(IMAGE_DIR)) {
    if (/^(before|after)-\d+\.\w+$/.test(file)) await rm(path.join(IMAGE_DIR, file));
  }

  const downloaded = new Map();
  const manifest = [];
  for (const { number, title, before, after } of realizations) {
    const id = String(number).padStart(2, "0");
    const entry = { id: number };

    for (const [role, url] of [["before", before], ["after", after]]) {
      if (!downloaded.has(url)) {
        const { bytes, extension } = await download(url, `Realization ${number} ("${title}") ${role}`);
        const fileName = `${role}-${id}.${extension}`;
        await writeFile(path.join(IMAGE_DIR, fileName), bytes);
        downloaded.set(url, `${PUBLIC_IMAGE_PREFIX}/${fileName}`);
        console.log(`  ✓ ${fileName}  ${(bytes.length / 1024).toFixed(0)} KB  ← ${url}`);
      }
      entry[role] = downloaded.get(url);
    }
    manifest.push(entry);
  }

  await writeFile(path.join(CONTENT_DIR, "realizations.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(path.join(CONTENT_DIR, "testimonials.json"), `${JSON.stringify(testimonials, null, 2)}\n`);

  const separator = "-".repeat(30);
  const text = testimonials
    .map((t, index) => `OPINIA ${index + 1}\n\nAuthor: ${t.author}\nLocation: ${t.location}\n\n"${t.quote}"`)
    .join(`\n\n${separator}\n\n`);
  await writeFile(path.join(CONTENT_DIR, "testimonials.txt"), `${text}\n`);

  console.log(`\nRealization pairs: ${realizations.length}`);
  console.log(`Images downloaded: ${downloaded.size}`);
  console.log(`Testimonials: ${testimonials.length} unique (${rawCount} rendered, marquee duplicates removed)`);
  console.log(`Images:  ${path.relative(ROOT, IMAGE_DIR)}`);
  console.log(`Content: ${path.relative(ROOT, CONTENT_DIR)}`);
  if (warnings.length) {
    console.log(`\nWarnings:\n${warnings.map((w) => `  ! ${w}`).join("\n")}`);
  }
}

await main();
