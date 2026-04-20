"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, AlertCircle, Loader2 } from "lucide-react";
import { getTrackingParams, trackEvent } from "@/lib/tracking";

const creneaux = [
  "9h–12h",
  "14h–17h",
  "Après 17h",
  "Peu importe",
];

export default function CallbackForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [hp, setHp] = useState("");
  const [form, setForm] = useState({
    nom: "",
    entreprise: "",
    telephone: "",
    creneau: "",
  });

  const inputClass =
    "w-full bg-bg-alt/50 border border-primary/10 rounded-xl px-4 py-3 text-text placeholder:text-text-light/60 focus:ring-2 focus:ring-accent/30 focus:border-accent/40 focus:bg-white outline-none transition-all duration-300";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: typeof window !== "undefined" ? window.location.pathname : "",
          tracking: getTrackingParams(),
          _hp: hp,
        }),
      });
      if (res.ok) {
        trackEvent("generate_lead", { event_category: "form", event_label: "callback" });
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
          <label htmlFor="cb-nom" className="block text-xs font-medium text-text-light mb-1.5 uppercase">
            Nom *
          </label>
          <input
            id="cb-nom"
            required
            className={inputClass}
            value={form.nom}
            onChange={(e) => setForm((p) => ({ ...p, nom: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="cb-ent" className="block text-xs font-medium text-text-light mb-1.5 uppercase">
            Entreprise *
          </label>
          <input
            id="cb-ent"
            required
            className={inputClass}
            value={form.entreprise}
            onChange={(e) => setForm((p) => ({ ...p, entreprise: e.target.value }))}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cb-tel" className="block text-xs font-medium text-text-light mb-1.5 uppercase">
          Téléphone *
        </label>
        <input
          id="cb-tel"
          type="tel"
          required
          className={inputClass}
          value={form.telephone}
          onChange={(e) => setForm((p) => ({ ...p, telephone: e.target.value }))}
        />
      </div>
      <div>
        <label htmlFor="cb-slot" className="block text-xs font-medium text-text-light mb-1.5 uppercase">
          Créneau souhaité
        </label>
        <select
          id="cb-slot"
          className={inputClass}
          value={form.creneau}
          onChange={(e) => setForm((p) => ({ ...p, creneau: e.target.value }))}
        >
          <option value="">—</option>
          {creneaux.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
        Être rappelé
      </button>
    </form>
  );
}
