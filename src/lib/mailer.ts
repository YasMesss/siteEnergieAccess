import { spawn } from "child_process";

const DEFAULT_TO = "ymessai@formationaccess.fr";

function getFrom(): string {
  return process.env.SMTP_FROM || DEFAULT_TO;
}

function getTo(): string {
  return process.env.LEADS_NOTIFY_EMAIL || DEFAULT_TO;
}

/**
 * Envoie un email via msmtp (stdin RFC822), comme le projet de référence.
 * Sur Windows sans msmtp, log uniquement (dev).
 */
export function sendEmail(subject: string, body: string): Promise<void> {
  const from = getFrom();
  const to = getTo();
  const message = Buffer.from(
    [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      `Content-Type: text/plain; charset=utf-8`,
      "",
      body,
    ].join("\n"),
    "utf8",
  );

  return new Promise((resolve) => {
    const msmtpPath = process.platform === "win32" ? "msmtp" : "/usr/bin/msmtp";
    const child = spawn(msmtpPath, [to], {
      stdio: ["pipe", "pipe", "pipe"],
      env: {
        ...process.env,
        PATH: process.env.PATH || "/usr/local/bin:/usr/bin:/bin",
      },
    });

    let stderr = "";
    child.stderr?.on("data", (c) => {
      stderr += c.toString();
    });

    child.on("error", (err) => {
      console.error("[MAILER] spawn error (msmtp absent en local ?):", err?.message);
      console.log("[MAILER] fallback log — To:", to, "Subject:", subject);
      resolve();
    });

    child.on("close", (code) => {
      if (code !== 0) {
        console.error("[MAILER] msmtp exit", code, stderr.trim());
      }
      resolve();
    });

    child.stdin.write(message);
    child.stdin.end();
  });
}
