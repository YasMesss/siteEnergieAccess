import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { join } from "path";
import { sendEmail } from "@/lib/mailer";
import { formatParisDateTime } from "@/lib/date-paris";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

const DATA_DIR = join(process.cwd(), "data");
const SUBSCRIBERS_FILE = join(DATA_DIR, "newsletter.jsonl");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip, 3, 60_000)) {
      return NextResponse.json(
        { error: "Trop de demandes. Réessayez dans quelques minutes." },
        { status: 429 },
      );
    }

    const { email, _hp } = await request.json();
    if (_hp) return NextResponse.json({ success: true });

    if (!email || !EMAIL_RE.test(String(email).trim())) {
      return NextResponse.json({ error: "Email valide requis" }, { status: 400 });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    if (existsSync(SUBSCRIBERS_FILE)) {
      const existing = readFileSync(SUBSCRIBERS_FILE, "utf-8");
      if (existing.includes(`"email":"${cleanEmail}"`)) {
        return NextResponse.json({ success: true, message: "Déjà inscrit" });
      }
    }

    const subscriber = {
      email: cleanEmail,
      subscribedAt: new Date().toISOString(),
      source: "footer",
    };
    appendFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscriber) + "\n", "utf-8");

    const emailBody = [
      `NEWSLETTER — ${formatParisDateTime()}`,
      ``,
      `Email : ${cleanEmail}`,
      `Referer : ${request.headers.get("referer") || "-"}`,
    ].join("\n");
    await sendEmail(`[Energie Access] Newsletter — ${cleanEmail}`, emailBody);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[NEWSLETTER]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
