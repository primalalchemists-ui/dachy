import { buildingTypeOptions, roofCoveringOptions, timelineOptions, type ChoiceOption } from "@/data/qualification";
import { CONTACT_MAX_LENGTH, normalizePhone } from "@/lib/qualification";
import { fromDateTimeInputValue } from "@/lib/format";
import { isLeadStatus } from "./status";
import type { LeadInsert, LeadUpdate } from "./types";

export const NOTES_MAX_LENGTH = 5000;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ATTRIBUTION_MAX_LENGTH = { campaign: 255, fbclid: 500, landingPath: 500, referrer: 1000 } as const;

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isOption<V extends string>(options: readonly ChoiceOption<V>[], value: unknown): value is V {
  return options.some((option) => option.value === value);
}

function requiredText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text && text.length <= maxLength ? text : null;
}

/** Attribution is never a reason to reject a lead, so oversized values are truncated. */
function optionalText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  return value.trim().slice(0, maxLength) || null;
}

export function isHoneypotFilled(input: unknown): boolean {
  return isRecord(input) && typeof input.honeypot === "string" && input.honeypot.trim() !== "";
}

/**
 * Validates an untrusted LeadSubmission and maps it to the `leads` row shape.
 * Returns null when the submission is not acceptable.
 */
export function toLeadInsert(input: unknown, submittedAt: Date): LeadInsert | null {
  if (!isRecord(input) || !isRecord(input.qualification)) return null;

  const qualification = input.qualification;
  const attribution = isRecord(input.attribution) ? input.attribution : {};
  const { roofCovering, buildingType, timeline } = qualification;

  const name = requiredText(qualification.name, CONTACT_MAX_LENGTH.name);
  const rawPhone = requiredText(qualification.phone, CONTACT_MAX_LENGTH.phone);
  const phone = rawPhone && normalizePhone(rawPhone);
  const location = requiredText(qualification.location, CONTACT_MAX_LENGTH.location);

  if (
    !name ||
    !phone ||
    !location ||
    qualification.privacyAccepted !== true ||
    !isOption(roofCoveringOptions, roofCovering) ||
    !isOption(buildingTypeOptions, buildingType) ||
    !isOption(timelineOptions, timeline)
  ) {
    return null;
  }

  return {
    name,
    phone,
    location,
    roof_covering: roofCovering,
    building_type: buildingType,
    timeline,
    financing_interested: qualification.financingInterested === true,
    privacy_accepted: true,
    privacy_accepted_at: submittedAt.toISOString(),
    utm_source: optionalText(attribution.utmSource, ATTRIBUTION_MAX_LENGTH.campaign),
    utm_medium: optionalText(attribution.utmMedium, ATTRIBUTION_MAX_LENGTH.campaign),
    utm_campaign: optionalText(attribution.utmCampaign, ATTRIBUTION_MAX_LENGTH.campaign),
    utm_content: optionalText(attribution.utmContent, ATTRIBUTION_MAX_LENGTH.campaign),
    utm_term: optionalText(attribution.utmTerm, ATTRIBUTION_MAX_LENGTH.campaign),
    fbclid: optionalText(attribution.fbclid, ATTRIBUTION_MAX_LENGTH.fbclid),
    landing_path: optionalText(attribution.landingPath, ATTRIBUTION_MAX_LENGTH.landingPath),
    referrer: optionalText(attribution.referrer, ATTRIBUTION_MAX_LENGTH.referrer),
  };
}

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

/**
 * Validates CRM edits. `nextContact` is a datetime-local value in Warsaw time
 * ("" clears the date). Returns null when the input is not acceptable.
 */
export function toLeadUpdate(input: unknown): LeadUpdate | null {
  if (!isRecord(input)) return null;
  const { status, notes, nextContact } = input;

  if (!isLeadStatus(status)) return null;
  if (typeof notes !== "string" || notes.length > NOTES_MAX_LENGTH) return null;
  if (typeof nextContact !== "string") return null;

  const nextContactAt = nextContact === "" ? null : fromDateTimeInputValue(nextContact);
  if (nextContact !== "" && !nextContactAt) return null;

  return { status, notes: notes.trim() || null, next_contact_at: nextContactAt };
}
