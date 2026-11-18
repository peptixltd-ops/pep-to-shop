"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function AccountPage() {
  const [mode, setMode] = useState<"login" | "register" | "reset">("login");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError("");
    setMessage("");
    const response = await fetch("/api/account", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        action: mode,
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error || "Request failed.");
      return;
    }
    setMessage(json.message);
  }

  return (
    <div className="container-x py-16 max-w-lg">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Account</p>
      <h1 className="font-display text-4xl text-ink">Sign in</h1>
      <p className="mt-3 text-sm text-muted-foreground">Imported customers have no password. Use password reset before the first sign-in. Reset notices are not emailed unless email delivery is explicitly enabled.</p>
      <div className="mt-6 flex gap-3 text-xs uppercase tracking-wider">
        {(["login", "register", "reset"] as const).map((item) => (
          <button key={item} type="button" onClick={() => setMode(item)} className={mode === item ? "text-primary" : "text-muted-foreground"}>{item}</button>
        ))}
      </div>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input name="email" type="email" required placeholder="Email" className="w-full border border-border px-4 py-3 text-sm" />
        {mode !== "reset" && <input name="password" type="password" required minLength={8} placeholder="Password" className="w-full border border-border px-4 py-3 text-sm" />}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {message && <p className="text-sm text-foreground">{message}</p>}
        <button className="bg-primary text-primary-foreground px-6 py-3 text-sm uppercase tracking-wider">Continue</button>
      </form>
      <p className="mt-6 text-sm"><Link href="/account/reset" className="text-primary underline">Enter a reset token</Link></p>
    </div>
  );
}
