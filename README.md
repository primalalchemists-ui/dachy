# Ekologiczna Polska – wymiana dachów

Landing page for roof covering replacement leads (Opole i okolice).
Next.js (App Router) · TypeScript · Tailwind CSS 4.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Supabase setup (lead storage)

1. Create a project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run `supabase/migrations/001_create_leads.sql`.
3. In **Project Settings → API**, copy the **Project URL**.
4. In **Project Settings → API Keys**, copy the **publishable** key (`sb_publishable_…`) and a **secret** key (`sb_secret_…`).
5. `cp .env.example .env.local` and set `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SECRET_KEY`. All are read server-side only; the secret key must never be exposed.
6. `npm run dev`, submit the form, and check **Table Editor → leads**.

Leads are inserted only by the server action in `src/lib/leads/actions.ts`; the table has RLS enabled with no public policies.

## CRM (`/admin`)

There is no public sign-up. Create CRM users manually:

1. **Authentication → Sign In / Providers**: turn off **Allow new users to sign up** (keep the Email provider enabled).
2. **Authentication → Users → Add user → Create new user**: enter email and password and tick **Auto Confirm User**.
3. Sign in at `/admin/login`.

Every authenticated Supabase user has CRM access. Session cookies are refreshed in `src/proxy.ts`; every CRM query and action verifies the session (`src/lib/crm/auth.ts`) before using the server-side secret-key client.

## Where things live

| What | Where |
| --- | --- |
| Design tokens (colors, radii, shadows, type scale, section spacing) | `src/app/globals.css` |
| Site name, SEO copy, CTA label, privacy policy link | `src/lib/site.ts` |
| Before/after projects (content in `content/realizations.json`; published pairs/order in `LANDING_REALIZATION_IDS`) | `src/data/realizations.ts` |
| Testimonials (content in `content/testimonials.json`) | `src/data/testimonials.ts` |
| Process steps, solution benefits | `src/data/process.ts`, `src/data/benefits.ts` |
| Landing sections | `src/components/landing/` |
| Shared primitives (button, carousel arrow, photo, logo…) | `src/components/ui/` |
| Carousel behaviour (Embla, autoplay, keyboard) | `src/lib/use-carousel.ts` |
| Qualification flow (dialog, steps, contact form) | `src/components/qualification/` |
| Lead types, server validation, DB mapping, server action | `src/lib/leads/` |
| UTM / fbclid capture (sessionStorage, first touch) | `src/lib/attribution.ts` |
| CRM pages / components | `src/app/admin/`, `src/components/crm/` |
| CRM data access (protected queries) and actions | `src/lib/leads/queries.ts`, `src/lib/crm/actions.ts` |
| Lead statuses and Polish labels | `src/lib/leads/status.ts`, `src/lib/leads/labels.ts` |

## Replacing placeholder assets

- **Logo:** `public/brand/logo.webp` (640×198), rendered by `src/components/ui/BrandLogo.tsx`. If a replacement has a different aspect ratio, update `width`/`height` there.
- **Favicon:** `src/app/icon.png` and `src/app/apple-icon.png` (the emblem from the logo).
- **Photos:** `public/images/hero.webp` (hero, 5:4) and `public/images/pokrycia.webp` (roof-covering section, 4:3), both cropped with `object-cover`. Realization photos come from `scripts/migrate-ekologiczna-polska-content.mjs` (`public/images/realizations/before-XX.webp` / `after-XX.webp`).
