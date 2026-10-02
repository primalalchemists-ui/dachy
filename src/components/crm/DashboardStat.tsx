import Link from "next/link";

type DashboardStatProps = {
  label: string;
  value: number;
  href: string;
};

export function DashboardStat({ label, value, href }: DashboardStatProps) {
  return (
    <Link
      href={href}
      className="block rounded-card border border-line bg-surface p-5 transition-colors hover:border-forest/30 sm:p-6"
    >
      <p className="text-sm text-ink-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-ink tabular-nums">{value}</p>
    </Link>
  );
}
