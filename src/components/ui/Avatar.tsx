function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden
      className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface-soft text-sm font-semibold tracking-wide text-forest"
    >
      {initials(name)}
    </span>
  );
}
