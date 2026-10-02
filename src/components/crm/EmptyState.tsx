export function EmptyState({ message }: { message: string }) {
  return (
    <p className="rounded-card border border-dashed border-line px-4 py-8 text-center text-sm text-ink-muted">{message}</p>
  );
}
