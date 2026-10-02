import type { BuildingType, RoofCovering, Timeline } from "@/data/qualification";
import type { Attribution } from "@/lib/attribution";
import type { QualificationData } from "@/lib/qualification";
import type { LeadStatus } from "./status";

/** Payload sent from the qualification flow to the server. Untrusted until validated. */
export type LeadSubmission = {
  qualification: QualificationData;
  attribution: Attribution;
  honeypot: string;
};

export type LeadInsertResult = { ok: true } | { ok: false; reason: "invalid" | "failed" };

/** A row of `public.leads`. */
export type Lead = {
  id: string;
  name: string;
  phone: string;
  location: string;
  roof_covering: RoofCovering;
  building_type: BuildingType;
  timeline: Timeline;
  financing_interested: boolean;
  privacy_accepted: boolean;
  privacy_accepted_at: string;
  status: LeadStatus;
  notes: string | null;
  next_contact_at: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  fbclid: string | null;
  landing_path: string | null;
  referrer: string | null;
  created_at: string;
  updated_at: string;
};

export type LeadInsert = Omit<Lead, "id" | "status" | "notes" | "next_contact_at" | "created_at" | "updated_at">;

/** Fields shown in CRM lists, cards and the pipeline. */
export type LeadSummary = Pick<
  Lead,
  "id" | "name" | "phone" | "location" | "status" | "timeline" | "financing_interested" | "next_contact_at" | "created_at"
>;

export type LeadUpdate = Pick<Lead, "status" | "notes" | "next_contact_at">;

/** CRM edit form values; `nextContact` is a datetime-local value in Warsaw time. */
export type LeadEditorValues = { status: LeadStatus; notes: string; nextContact: string };

export type LeadUpdateResult = { ok: true } | { ok: false };
