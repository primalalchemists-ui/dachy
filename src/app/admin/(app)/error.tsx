"use client";

export default function CrmError({ retry }: { retry: () => void }) {
  return (
    <div className="py-10">
      <p className="text-sm text-ink">Nie udało się wczytać danych.</p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-4 h-10 rounded-control border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors hover:bg-canvas"
      >
        Spróbuj ponownie
      </button>
    </div>
  );
}
