"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import { getTrackingParams, trackEvent } from "@/lib/tracking";

export default function ContactMessageForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [hp, setHp] = useState("");
  const [form, setForm] = useState({
    nom: "",
    entreprise: "",
    email: "",
    telephone: "",
    message: "",
  });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const inputClass =
    "w-full bg-bg-alt/50 border border-primary/10 rounded-xl px-4 py-3 text-text placeholder:text-text-light/60 focus:ring-2 focus:ring-accent/30 focus:border-accent/40 focus:bg-white outline-none transition-all duration-300";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
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
        trackEvent("generate_lead", { event_category: "form", event_label: "contact" });
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
          <label htmlFor="cm-nom" className="block text-xs font-medium text-text-light mb-1.5 uppercase">
            Nom *
          </label>
          <input id="cm-nom" required className={inputClass} value={form.nom} onChange={(e) => update("nom", e.target.value)} />
        </div>
        <div>
          <label htmlFor="cm-ent" className="block text-xs font-medium text-text-light mb-1.5 uppercase">
            Entreprise *
          </label>
          <input
            id="cm-ent"
            required
            className={inputClass}
            value={form.entreprise}
            onChange={(e) => update("entreprise", e.target.value)}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cm-mail" className="block text-xs font-medium text-text-light mb-1.5 uppercase">
            Email *
          </label>
          <input
            id="cm-mail"
            type="email"
            required
            className={inputClass}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cm-tel" className="block text-xs font-medium text-text-light mb-1.5 uppercase">
            Téléphone *
          </label>
          <input
            id="cm-tel"
            type="tel"
            required
            className={inputClass}
            value={form.telephone}
            onChange={(e) => update("telephone", e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cm-msg" className="block text-xs font-medium text-text-light mb-1.5 uppercase">
          Message
        </label>
        <textarea
          id="cm-msg"
          rows={4}
          className={inputClass}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 btn-shine disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        Envoyer
      </button>
    </form>
  );
}
