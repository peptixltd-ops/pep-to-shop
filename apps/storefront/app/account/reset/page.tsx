"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ResetForm() {
  const params = useSearchParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError("");
    const response = await fetch("/api/account", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "update", token: form.get("token"), password: form.get("password") }),
    });
    const json = await response.json();
    if (!response.ok) setError(json.error || "Reset failed.");
    else setMessage(json.message);
  }
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3">
      <input name="token" required defaultValue={params.get("token") || ""} placeholder="Reset token" className="w-full border border-border px-4 py-3 text-sm" />
      <input name="password" type="password" required minLength={8} placeholder="New password" className="w-full border border-border px-4 py-3 text-sm" />
      {error && <p className="text-sm text-destructive">{error}</p>}
      {message && <p className="text-sm">{message}</p>}
      <button className="bg-primary text-primary-foreground px-6 py-3 text-sm uppercase tracking-wider">Set password</button>
    </form>
  );
}

export default function ResetPage() {
  return (
    <div className="container-x py-16 max-w-lg">
      <h1 className="font-display text-4xl text-ink">Set a new password</h1>
      <p className="mt-3 text-sm text-muted-foreground">Use the token from a manually issued reset. Imported customers must do this before they can sign in.</p>
      <Suspense>
        <ResetForm />
      </Suspense>
    </div>
  );
}
