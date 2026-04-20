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
  telephone: string;
  creneau?: string;
  source?: string;
  _hp?: string;
  tracking?: Record<string, string>;
}

const LEADS_DIR = join(process.cwd(), "data");
const LEADS_FILE = join(LEADS_DIR, "leads.jsonl");
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
      return NextResponse.json({ success: true });
    }

    if (!body.nom?.trim() || !body.entreprise?.trim() || !body.telephone?.trim()) {
      return NextResponse.json({ error: "Nom, entreprise et téléphone requis" }, { status: 400 });
    }
    if (!PHONE_RE.test(body.telephone.trim())) {
      return NextResponse.json({ error: "Téléphone invalide" }, { status: 400 });
    }

    const lead = {
      type: "callback" as const,
      nom: sanitize(body.nom, 100),
      entreprise: sanitize(body.entreprise, 150),
      telephone: sanitize(body.telephone, 20),
      creneau: body.creneau ? sanitize(body.creneau, 200) : null,
      source: body.source || null,
      tracking: body.tracking || null,
      ip,
      createdAt: new Date().toISOString(),
    };

    if (!existsSync(LEADS_DIR)) mkdirSync(LEADS_DIR, { recursive: true });
    appendFileSync(LEADS_FILE, JSON.stringify(lead) + "\n", "utf-8");

    const emailBody = [
      `RAPPEL DEMANDÉ — ${formatParisDateTime()}`,
      ``,
      `Nom : ${lead.nom}`,
      `Entreprise : ${lead.entreprise}`,
      `Tél : ${lead.telephone}`,
      `Créneau souhaité : ${lead.creneau || "non précisé"}`,
      `Page : ${lead.source || "-"}`,
    ].join("\n");

    await sendEmail(`[Energie Access] Rappel — ${lead.nom}`, emailBody);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[CALLBACK]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
