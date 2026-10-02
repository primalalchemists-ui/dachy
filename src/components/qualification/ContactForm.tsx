import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/Checkbox";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/ui/TextField";
import { CONTACT_MAX_LENGTH, validateContact, type ContactField, type QualificationData } from "@/lib/qualification";
import { site } from "@/lib/site";
import { StepTitle } from "./StepTitle";

const FIELD_IDS: Record<ContactField, string> = {
  name: "qualification-name",
  phone: "qualification-phone",
  location: "qualification-location",
  privacyAccepted: "qualification-privacy",
};

type ContactFormProps = {
  values: QualificationData;
  onChange: (patch: Partial<QualificationData>) => void;
  /** Resolves to true once the lead is saved. */
  onSubmit: (honeypot: string) => Promise<boolean>;
};

export function ContactForm({ values, onChange, onSubmit }: ContactFormProps) {
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const inFlight = useRef(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const errors = attempted ? validateContact(values) : {};

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const currentErrors = validateContact(values);
    const firstInvalid = (Object.keys(FIELD_IDS) as ContactField[]).find((field) => currentErrors[field]);
    if (firstInvalid) {
      setAttempted(true);
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return;
    }

    inFlight.current = true;
    setSubmitting(true);
    setFailed(false);
    let saved = false;
    try {
      saved = await onSubmit(honeypotRef.current?.value ?? "");
    } catch {
      saved = false;
    }
    inFlight.current = false;
    if (!saved) {
      setSubmitting(false);
      setFailed(true);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-1 flex-col">
      <StepTitle>Zostaw dane kontaktowe</StepTitle>

      <div className="mt-6 space-y-4 lg:mt-8">
        <TextField
          id={FIELD_IDS.name}
          label="Imię"
          placeholder="Np. Anna"
          autoComplete="given-name"
          maxLength={CONTACT_MAX_LENGTH.name}
          value={values.name}
          onChange={(event) => onChange({ name: event.target.value })}
          error={errors.name}
        />
        <TextField
          id={FIELD_IDS.phone}
          label="Telefon"
          type="tel"
          inputMode="tel"
          placeholder="Np. 500 000 000"
          autoComplete="tel"
          maxLength={CONTACT_MAX_LENGTH.phone}
          value={values.phone}
          onChange={(event) => onChange({ phone: event.target.value })}
          error={errors.phone}
        />
        <TextField
          id={FIELD_IDS.location}
          label="Kod pocztowy / miejscowość"
          placeholder="Np. 45-001 Opole"
          autoComplete="postal-code"
          maxLength={CONTACT_MAX_LENGTH.location}
          value={values.location}
          onChange={(event) => onChange({ location: event.target.value })}
          error={errors.location}
        />
      </div>

      <div className="mt-6 space-y-4">
        <Checkbox
          id="qualification-financing"
          label="Chcę poznać możliwości finansowania"
          checked={values.financingInterested}
          onChange={(event) => onChange({ financingInterested: event.target.checked })}
        />
        <Checkbox
          id={FIELD_IDS.privacyAccepted}
          label={
            <>
              Akceptuję{" "}
              <Link
                href={site.privacyPolicyHref}
                target="_blank"
                rel="noopener"
                className="font-medium text-forest underline underline-offset-4 hover:no-underline"
              >
                Politykę prywatności
              </Link>
            </>
          }
          checked={values.privacyAccepted}
          onChange={(event) => onChange({ privacyAccepted: event.target.checked })}
          error={errors.privacyAccepted}
        />
      </div>

      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="qualification-website">Strona internetowa</label>
        <input ref={honeypotRef} id="qualification-website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-auto pt-8">
        <PrimaryButton type="submit" disabled={submitting} withArrow={!submitting} className="w-full">
          {submitting ? "Wysyłanie…" : site.ctaLabel}
        </PrimaryButton>
        {failed && (
          <p role="alert" className="mt-3 text-center text-sm text-danger">
            Nie udało się wysłać zgłoszenia. Spróbuj ponownie.
          </p>
        )}
      </div>
    </form>
  );
}
