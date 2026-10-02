"use client";

import { useActionState } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/ui/TextField";
import { signIn, type SignInState } from "@/lib/crm/actions";

const INITIAL_STATE: SignInState = { error: null, email: "" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-4">
      <TextField id="crm-email" name="email" type="email" label="Email" autoComplete="username" defaultValue={state.email} required />
      <TextField
        id="crm-password"
        name="password"
        type="password"
        label="Hasło"
        autoComplete="current-password"
        required
      />
      {state.error && (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}
      <PrimaryButton type="submit" withArrow={false} disabled={pending} className="mt-2 w-full">
        Zaloguj się
      </PrimaryButton>
    </form>
  );
}
