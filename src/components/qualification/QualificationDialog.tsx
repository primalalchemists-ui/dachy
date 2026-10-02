import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import {
  buildingTypeOptions,
  qualificationQuestions,
  roofCoveringOptions,
  timelineOptions,
} from "@/data/qualification";
import { getAttribution } from "@/lib/attribution";
import { submitLead } from "@/lib/leads/actions";
import { initialQualificationData, QUALIFICATION_TOTAL_STEPS, type QualificationData } from "@/lib/qualification";
import { site } from "@/lib/site";
import { ChoiceStep } from "./ChoiceStep";
import { ConfirmationState } from "./ConfirmationState";
import { ContactForm } from "./ContactForm";
import { ProgressIndicator } from "./ProgressIndicator";
import { QualificationHeader } from "./QualificationHeader";

const CONTACT_STEP = 4;
const ADVANCE_DELAY_MS = 180;

export function QualificationDialog({ onClosed }: { onClosed: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const advanceTimer = useRef<number | undefined>(undefined);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QualificationData>(initialQualificationData);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  const close = () => dialogRef.current?.close();

  const update = (patch: Partial<QualificationData>) => setAnswers((current) => ({ ...current, ...patch }));

  const choose = (patch: Partial<QualificationData>) => {
    update(patch);
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => setStep((current) => Math.min(current + 1, CONTACT_STEP)), ADVANCE_DELAY_MS);
  };

  const goBack = () => {
    window.clearTimeout(advanceTimer.current);
    if (step === 1) close();
    else setStep(step - 1);
  };

  const submit = async (honeypot: string) => {
    const result = await submitLead({ qualification: answers, attribution: getAttribution(), honeypot });
    if (result.ok) setSubmitted(true);
    return result.ok;
  };

  const isPristine = step === 1 && answers.roofCovering === null;

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget && (isPristine || submitted)) close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={site.ctaLabel}
      onClose={onClosed}
      onClick={handleBackdropClick}
      className="m-0 h-dvh max-h-none w-full max-w-none flex-col overflow-hidden border-0 bg-canvas p-0 text-ink transition-[opacity,translate] duration-200 ease-out backdrop:bg-night/70 open:flex motion-reduce:transition-none starting:open:translate-y-2 starting:open:opacity-0 lg:m-auto lg:h-[min(46rem,calc(100dvh-3rem))] lg:w-[36rem] lg:rounded-card lg:shadow-modal"
    >
      <QualificationHeader onBack={submitted ? undefined : goBack} onClose={close} />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-10 lg:pb-10">
        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
          {submitted ? (
            <div className="flex flex-1 animate-step-in flex-col motion-reduce:animate-none">
              <ConfirmationState onClose={close} />
            </div>
          ) : (
            <>
              <ProgressIndicator step={step} total={QUALIFICATION_TOTAL_STEPS} />
              <div key={step} className="mt-8 flex flex-1 animate-step-in flex-col motion-reduce:animate-none lg:mt-10">
                {step === 1 && (
                  <ChoiceStep
                    {...qualificationQuestions.roofCovering}
                    options={roofCoveringOptions}
                    selected={answers.roofCovering}
                    onSelect={(roofCovering) => choose({ roofCovering })}
                  />
                )}
                {step === 2 && (
                  <ChoiceStep
                    {...qualificationQuestions.buildingType}
                    options={buildingTypeOptions}
                    selected={answers.buildingType}
                    onSelect={(buildingType) => choose({ buildingType })}
                  />
                )}
                {step === 3 && (
                  <ChoiceStep
                    {...qualificationQuestions.timeline}
                    options={timelineOptions}
                    selected={answers.timeline}
                    onSelect={(timeline) => choose({ timeline })}
                  />
                )}
                {step === CONTACT_STEP && <ContactForm values={answers} onChange={update} onSubmit={submit} />}
              </div>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
