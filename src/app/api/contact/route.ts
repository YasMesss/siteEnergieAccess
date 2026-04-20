import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { sendEmail } from "@/lib/mailer";
import { formatParisDateTime } from "@/lib/date-paris";
import { sanitize } from "@/lib/sanitize";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

interface Payload {
  nom: string;
  entreprise: string;
  email: string;
  telephone: string;
  message?: string;
  source?: string;
  _hp?: string;
  tracking?: Record<string, string>;
}

const LEADS_DIR = join(process.cwd(), "data");
const LEADS_FILE = join(LEADS_DIR, "leads.jsonl");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[\d\s\-+().]{7,20}$/;

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip, 5, 60_000)) {
      return NextResponse.json(
        { error: "Trop de demandes. Réessayez dans quelques minutes." },
        { status: 429 },
      );
    }

    const body: Payload = await request.json();

    if (body._hp) {
      return NextResponse.json({ success: true, message: "Message enregistré" });
    }

    if (!body.nom?.trim() || !body.entreprise?.trim() || !body.telephone?.trim()) {
      return NextResponse.json(
        { error: "Champs obligatoires : nom, entreprise, téléphone" },
        { status: 400 },
      );
    }

    if (!body.email?.trim() || !EMAIL_RE.test(body.email.trim())) {
      return NextResponse.json({ error: "Email valide requis" }, { status: 400 });
    }

    if (!PHONE_RE.test(body.telephone.trim())) {
      return NextResponse.json({ error: "Numéro de téléphone invalide" }, { status: 400 });
    }

    const lead = {
      type: "contact" as const,
      nom: sanitize(body.nom, 100),
      entreprise: sanitize(body.entreprise, 150),
      email: body.email.trim().toLowerCase().slice(0, 254),
      telephone: sanitize(body.telephone, 20),
      message: body.message ? sanitize(body.message, 2000) : null,
      source: body.source || null,
      tracking: body.tracking || null,
      ip,
      createdAt: new Date().toISOString(),
    };

    if (!existsSync(LEADS_DIR)) mkdirSync(LEADS_DIR, { recursive: true });
    appendFileSync(LEADS_FILE, JSON.stringify(lead) + "\n", "utf-8");

    const t = body.tracking || {};
    const emailBody = [
      `NOUVEAU MESSAGE CONTACT — ${formatParisDateTime()}`,
      ``,
      `Nom : ${lead.nom}`,
      `Entreprise : ${lead.entreprise}`,
      `Email : ${lead.email}`,
      `Tél : ${lead.telephone}`,
      `Message : ${lead.message || "-"}`,
      `Page : ${lead.source || "-"}`,
      `UTM : ${t.utm_source || "-"} / ${t.utm_medium || "-"}`,
    ].join("\n");

    await sendEmail(`[Energie Access] Contact — ${lead.nom}`, emailBody);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[CONTACT]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
