import { appendFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Manual, one-address password reset notice.
 * Usage: node request-password-reset.mjs --email person@example.com
 * Add --send only after EMAIL_TRANSPORT=smtp and SMTP_URL are set.
 * Never pass a customer list. There is no import hook.
 */
const here = dirname(fileURLToPath(import.meta.url));
const emailFlag = process.argv.indexOf("--email");
const email = emailFlag >= 0 ? process.argv[emailFlag + 1] : "";
const send = process.argv.includes("--send");

if (!email || !email.includes("@") || email.includes(",")) {
  console.error("Pass one address: --email person@example.com");
  process.exit(1);
}

const outbox = resolve(here, "../../apps/backend/data/email-outbox.jsonl");
mkdirSync(dirname(outbox), { recursive: true });
const row = {
  at: new Date().toISOString(),
  from: `${process.env.EMAIL_FROM_NAME || "Pondok Peptides"} <${process.env.EMAIL_FROM || "info@pondokpeptides.com"}>`,
  to: email,
  template: "customer.password_reset",
  allow_send: send,
  delivered: false,
  note: "Manual single-customer reset. Not sent by the importer.",
};
appendFileSync(outbox, `${JSON.stringify(row)}\n`);
console.log(JSON.stringify({ queued: email, delivered: false, send_requested: send }));
