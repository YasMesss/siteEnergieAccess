import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/mailer";
import { formatParisDateTime } from "@/lib/date-paris";
import { sanitize } from "@/lib/sanitize";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

const LEADS_DIR = join(process.cwd(), "data");
const UPLOADS_DIR = join(LEADS_DIR, "uploads");
const LEADS_FILE = join(LEADS_DIR, "leads.jsonl");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[\d\s\-+().]{7,20}$/;
const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip, 5, 60_000)) {
      return NextResponse.json(
        { error: "Trop de demandes. Réessayez dans quelques minutes." },
        { status: 429 },
      );
    }

    const ct = request.headers.get("content-type") || "";
    if (!ct.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Multipart requis" }, { status: 400 });
    }

    const form = await request.formData();
    const hp = form.get("_hp");
    if (hp && String(hp).length > 0) {
      return NextResponse.json({ success: true });
    }

    const nom = String(form.get("nom") || "").trim();
    const entreprise = String(form.get("entreprise") || "").trim();
    const email = String(form.get("email") || "").trim();
    const telephone = String(form.get("telephone") || "").trim();
    const secteur = String(form.get("secteur") || "").trim();
    const consoApprox = String(form.get("consoApprox") || "").trim();
    const message = String(form.get("message") || "").trim();
    const source = String(form.get("source") || "").trim();
    let tracking: Record<string, string> | null = null;
    const trRaw = form.get("tracking");
    if (trRaw && typeof trRaw === "string") {
      try {
        tracking = JSON.parse(trRaw) as Record<string, string>;
      } catch {
        tracking = null;
      }
    }

    if (!nom || !entreprise || !email || !telephone) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    if (!PHONE_RE.test(telephone)) {
      return NextResponse.json({ error: "Téléphone invalide" }, { status: 400 });
    }

    let attachmentPath: string | null = null;
    const file = form.get("invoice");
    if (file && file instanceof File && file.size > 0) {
      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: "Fichier trop volumineux (max 10 Mo)" }, { status: 400 });
      }
      const mime = file.type || "application/octet-stream";
      if (!ALLOWED.has(mime)) {
        return NextResponse.json(
          { error: "Format non accepté (PDF, JPEG, PNG, WebP)" },
          { status: 400 },
        );
      }
      const buf = Buffer.from(await file.arrayBuffer());
      if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true });
      const ext = (file.name || "facture").split(".").pop()?.slice(0, 8) || "pdf";
      const safeExt = ext.replace(/[^a-z0-9]/gi, "") || "bin";
      const fname = `${randomUUID()}_${sanitize(entreprise, 40).replace(/\s/g, "_")}.${safeExt}`;
      const fpath = join(UPLOADS_DIR, fname);
      writeFileSync(fpath, buf);
      attachmentPath = `data/uploads/${fname}`;
    }

    const lead = {
      type: "devis" as const,
      nom: sanitize(nom, 100),
      entreprise: sanitize(entreprise, 150),
      email: email.toLowerCase().slice(0, 254),
      telephone: sanitize(telephone, 20),
      secteur: secteur ? sanitize(secteur, 120) : null,
      consoApprox: consoApprox ? sanitize(consoApprox, 80) : null,
      message: message ? sanitize(message, 2000) : null,
      attachmentPath,
      source: source || null,
      tracking,
      ip,
      createdAt: new Date().toISOString(),
    };

    if (!existsSync(LEADS_DIR)) mkdirSync(LEADS_DIR, { recursive: true });
    appendFileSync(LEADS_FILE, JSON.stringify(lead) + "\n", "utf-8");

    const emailBody = [
      `DEMANDE D'ÉTUDE / DEVIS — ${formatParisDateTime()}`,
      ``,
      `Nom : ${lead.nom}`,
      `Entreprise : ${lead.entreprise}`,
      `Email : ${lead.email}`,
      `Tél : ${lead.telephone}`,
      `Secteur : ${lead.secteur || "-"}`,
      `Conso approx. : ${lead.consoApprox || "-"}`,
      `Message : ${lead.message || "-"}`,
      `Pièce jointe : ${lead.attachmentPath || "aucune"}`,
      `Page : ${lead.source || "-"}`,
    ].join("\n");

    await sendEmail(`[Energie Access] Devis — ${lead.entreprise}`, emailBody);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[DEVIS]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
