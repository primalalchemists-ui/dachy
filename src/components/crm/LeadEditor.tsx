"use client";

import { useState, useTransition, type FormEvent } from "react";
import { formControlClassName } from "@/components/ui/form-control";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { updateLead } from "@/lib/crm/actions";
import { cn } from "@/lib/cn";
import { LEAD_STATUSES } from "@/lib/leads/status";
import type { LeadEditorValues } from "@/lib/leads/types";
import { NOTES_MAX_LENGTH } from "@/lib/leads/validate";

type SaveState = "idle" | "saved" | "failed";

export function LeadEditor({ leadId, initialValues }: { leadId: string; initialValues: LeadEditorValues }) {
  const [values, setValues] = useState(initialValues);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [pending, startTransition] = useTransition();

  const change = (patch: Partial<LeadEditorValues>) => {
    setValues((current) => ({ ...current, ...patch }));
    setSaveState("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        const result = await updateLead(leadId, values);
        setSaveState(result.ok ? "saved" : "failed");
      } catch {
        setSaveState("failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="lead-status" className="block text-sm font-medium text-ink">
          Status
        </label>
        <select
          id="lead-status"
          value={values.status}
          onChange={(event) => change({ status: event.target.value as LeadEditorValues["status"] })}
          className={cn("mt-2 h-11 px-3", formControlClassName())}
        >
          {LEAD_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="lead-next-contact" className="block text-sm font-medium text-ink">
          Następny kontakt
        </label>
        <input
          id="lead-next-contact"
          type="datetime-local"
          value={values.nextContact}
          onChange={(event) => change({ nextContact: event.target.value })}
          className={cn("mt-2 h-11 px-3", formControlClassName())}
        />
      </div>

      <div>
        <label htmlFor="lead-notes" className="block text-sm font-medium text-ink">
          Notatka
        </label>
        <textarea
          id="lead-notes"
          rows={7}
          maxLength={NOTES_MAX_LENGTH}
          value={values.notes}
          onChange={(event) => change({ notes: event.target.value })}
          className={cn("mt-2 resize-y px-3 py-2.5 leading-relaxed", formControlClassName())}
        />
      </div>

      <div>
        <PrimaryButton type="submit" withArrow={false} disabled={pending} className="h-11 w-full">
          {pending ? "Zapisywanie…" : "Zapisz zmiany"}
        </PrimaryButton>
        <p aria-live="polite" className="mt-2 min-h-5 text-center text-sm">
          {saveState === "saved" && <span className="text-forest">Zapisano</span>}
          {saveState === "failed" && <span className="text-danger">Nie udało się zapisać zmian.</span>}
        </p>
      </div>
    </form>
  );
}
