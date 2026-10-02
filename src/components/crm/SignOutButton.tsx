import { LogOut } from "lucide-react";
import { signOut } from "@/lib/crm/actions";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="flex h-10 items-center gap-2 rounded-control px-3 text-sm font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
      >
        <LogOut aria-hidden strokeWidth={1.75} className="size-4.5" />
        Wyloguj
      </button>
    </form>
  );
}
