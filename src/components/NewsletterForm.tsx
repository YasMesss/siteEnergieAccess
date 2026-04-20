"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, _hp: hp }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-emerald-400 text-sm">
        <CheckCircle className="w-4 h-4" />
        <span>Inscription confirmée !</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {status === "error" && (
        <p className="text-red-400 text-xs">Erreur. Veuillez réessayer.</p>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2 relative">
        <div aria-hidden="true" className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden">
          <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </div>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.fr"
          aria-label="Adresse email pour la newsletter"
          maxLength={254}
          className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent/40 outline-none transition-all"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="S'inscrire à la newsletter"
          className="px-4 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 disabled:opacity-70"
        >
          {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}
