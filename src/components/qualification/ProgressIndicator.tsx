export function ProgressIndicator({ step, total }: { step: number; total: number }) {
  const label = `Krok ${step} z ${total}`;

  return (
    <div>
      <p className="text-sm font-medium text-ink-muted tabular-nums">{label}</p>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
        className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-line"
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-forest to-primary transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
