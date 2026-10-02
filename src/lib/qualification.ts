import type { BuildingType, RoofCovering, Timeline } from "@/data/qualification";

export const QUALIFICATION_TOTAL_STEPS = 5;

export type QualificationData = {
  roofCovering: RoofCovering | null;
  buildingType: BuildingType | null;
  timeline: Timeline | null;
  name: string;
  phone: string;
  location: string;
  financingInterested: boolean;
  privacyAccepted: boolean;
};

export const initialQualificationData: QualificationData = {
  roofCovering: null,
  buildingType: null,
  timeline: null,
  name: "",
  phone: "",
  location: "",
  financingInterested: false,
  privacyAccepted: false,
};

export const CONTACT_MAX_LENGTH = { name: 100, phone: 30, location: 150 } as const;

export type ContactField = "name" | "phone" | "location" | "privacyAccepted";
export type ContactErrors = Partial<Record<ContactField, string>>;

/** Accepts 9-digit Polish numbers with optional +48 / 0048 prefix and common separators. */
export function normalizePhone(raw: string): string | null {
  const match = /^(?:\+48|0048)?(\d{9})$/.exec(raw.replace(/[\s\-().]/g, ""));
  return match ? `+48${match[1]}` : null;
}

export function validateContact(answers: QualificationData): ContactErrors {
  const errors: ContactErrors = {};

  if (!answers.name.trim()) errors.name = "Podaj imię.";

  if (!answers.phone.trim()) errors.phone = "Podaj numer telefonu.";
  else if (!normalizePhone(answers.phone)) errors.phone = "Podaj poprawny numer telefonu, np. 500 000 000.";

  if (!answers.location.trim()) errors.location = "Podaj kod pocztowy lub miejscowość.";

  if (!answers.privacyAccepted) errors.privacyAccepted = "Zaakceptuj politykę prywatności, abyśmy mogli oddzwonić.";

  return errors;
}
