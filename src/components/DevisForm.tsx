"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, AlertCircle, Loader2 } from "lucide-react";
import { getTrackingParams, trackEvent } from "@/lib/tracking";

const secteurs = [
  "Artisanat / TPE",
  "CHR & hôtellerie",
  "Copropriété",
  "Collectivité",
  "PME / PMI",
  "Industrie & logistique",
  "Grande distribution",
  "Agriculture / viticulture",
  "Autre",
];

export default function DevisForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [hp, setHp] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    nom: "",
    entreprise: "",
    email: "",
    telephone: "",
    secteur: "",
    consoApprox: "",
    message: "",
  });

  const inputClass =
    "w-full bg-bg-alt/50 border border-primary/10 rounded-xl px-4 py-3 text-text placeholder:text-text-light/60 focus:ring-2 focus:ring-accent/30 focus:border-accent/40 focus:bg-white outline-none transition-all duration-300";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const fd = new FormData();
      fd.set("nom", form.nom);
      fd.set("entreprise", form.entreprise);
      fd.set("email", form.email);
      fd.set("telephone", form.telephone);
      fd.set("secteur", form.secteur);
      fd.set("consoApprox", form.consoApprox);
      fd.set("message", form.message);
      fd.set("source", typeof window !== "undefined" ? window.location.pathname : "");
      fd.set("tracking", JSON.stringify(getTrackingParams()));
      fd.set("_hp", hp);
      if (file) fd.set("invoice", file);

      const res = await fetch("/api/devis", {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        trackEvent("generate_lead", { event_category: "form", event_label: "devis" });
        router.push("/merci");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erreur");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erreur réseau");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4">
      <div aria-hidden="true" className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden">
        <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>
      {status === "error" && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errorMsg}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-light mb-1.5 uppercase" htmlFor="dv-nom">
            Nom *
          </label>
          <input
            id="dv-nom"
            required
            className={inputClass}
            value={form.nom}
            onChange={(e) => setForm((p) => ({ ...p, nom: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-light mb-1.5 uppercase" htmlFor="dv-ent">
            Entreprise *
          </label>
          <input
            id="dv-ent"
            required
            className={inputClass}
            value={form.entreprise}
            onChange={(e) => setForm((p) => ({ ...p, entreprise: e.target.value }))}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-light mb-1.5 uppercase" htmlFor="dv-mail">
            Email pro *
          </label>
          <input
            id="dv-mail"
            type="email"
            required
            className={inputClass}
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-light mb-1.5 uppercase" htmlFor="dv-tel">
            Téléphone *
          </label>
          <input
            id="dv-tel"
            type="tel"
            required
            className={inputClass}
            value={form.telephone}
            onChange={(e) => setForm((p) => ({ ...p, telephone: e.target.value }))}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-light mb-1.5 uppercase" htmlFor="dv-sec">
            Secteur
          </label>
          <select
            id="dv-sec"
            className={inputClass}
            value={form.secteur}
            onChange={(e) => setForm((p) => ({ ...p, secteur: e.target.value }))}
          >
            <option value="">—</option>
            {secteurs.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-light mb-1.5 uppercase" htmlFor="dv-conso">
            Conso annuelle (approx.)
          </label>
          <input
            id="dv-conso"
            className={inputClass}
            placeholder="ex. 45 000 kWh élec"
            value={form.consoApprox}
            onChange={(e) => setForm((p) => ({ ...p, consoApprox: e.target.value }))}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-text-light mb-1.5 uppercase" htmlFor="dv-msg">
          Message / besoins
        </label>
        <textarea
          id="dv-msg"
          rows={3}
          className={inputClass}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-text-light mb-1.5 uppercase" htmlFor="dv-file">
          Dernière facture (PDF, JPEG, PNG — max 10 Mo)
        </label>
        <input
          id="dv-file"
          type="file"
          accept=".pdf,image/jpeg,image/png,image/webp"
          className="block w-full text-sm text-text-light file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary file:text-white"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 btn-shine disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
        Obtenir mon étude gratuite
      </button>
    </form>
  );
}
