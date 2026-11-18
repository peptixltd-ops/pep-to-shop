import { NextResponse } from "next/server";

function config() {
  const base = process.env.MEDUSA_BACKEND_URL || process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://127.0.0.1:9000";
  const key = process.env.MEDUSA_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";
  return { base, key };
}

async function medusa(path: string, init: RequestInit = {}) {
  const { base, key } = config();
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      "x-publishable-api-key": key,
      ...(init.headers || {}),
    },
  });
  const text = await response.text();
  const json = text ? JSON.parse(text) : {};
  if (!response.ok) throw new Error(json.message || text || `Medusa ${response.status}`);
  return json;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "");
  const password = String(body.password || "");
  try {
    if (body.action === "register") {
      const registered = await medusa("/auth/customer/emailpass/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const token = registered.token;
      await medusa("/store/customers", {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: JSON.stringify({ email }),
      });
      return NextResponse.json({ message: "Account created. You can sign in." });
    }
    if (body.action === "reset") {
      await medusa("/auth/customer/emailpass/reset-password", {
        method: "POST",
        body: JSON.stringify({ identifier: email }),
      });
      return NextResponse.json({
        message: "If the address can be reset, the token is held for a manual send. No email was sent.",
      });
    }
    if (body.action === "update") {
      await medusa("/auth/customer/emailpass/update", {
        method: "POST",
        headers: { authorization: `Bearer ${body.token}` },
        body: JSON.stringify({ password }),
      });
      return NextResponse.json({ message: "Password updated. You can sign in." });
    }
    await medusa("/auth/customer/emailpass", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return NextResponse.json({ message: "Signed in." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Account request failed.";
    const imported = /password|identity|invalid/i.test(message);
    return NextResponse.json({
      error: imported && body.action === "login"
        ? "Sign-in failed. Imported customers must reset their password before the first login."
        : message,
    }, { status: 400 });
  }
}
