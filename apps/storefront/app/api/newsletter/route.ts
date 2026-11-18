import { NextResponse } from "next/server";
import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (body.website) return NextResponse.json({ success: true, code: "WELCOME20" });
  if (!body.email || !String(body.email).includes("@")) {
    return NextResponse.json({ success: false, error: "Enter a valid email." }, { status: 400 });
  }
  const file = process.env.NEWSLETTER_OUTBOX || "/tmp/pondok-newsletter.jsonl";
  mkdirSync(dirname(file), { recursive: true });
  appendFileSync(file, `${JSON.stringify({ at: new Date().toISOString(), email: body.email, phone: body.phone || "", emailed: false })}\n`);
  return NextResponse.json({ success: true, code: "WELCOME20", emailed: false });
}
