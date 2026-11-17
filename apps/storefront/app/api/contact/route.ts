import { NextResponse } from "next/server";
import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!body.email || !body.message) {
    return NextResponse.json({ success: false, error: "Email and message are required." }, { status: 400 });
  }
  const file = process.env.CONTACT_OUTBOX || "/tmp/pondok-contact.jsonl";
  mkdirSync(dirname(file), { recursive: true });
  appendFileSync(file, `${JSON.stringify({ at: new Date().toISOString(), ...body, emailed: false })}\n`);
  return NextResponse.json({ success: true, emailed: false });
}
