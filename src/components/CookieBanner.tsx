"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-update"));
  };

  const refuse = () => {
    localStorage.setItem("cookie-consent", "refused");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 lg:p-6 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl shadow-primary/10 border border-primary/5 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Cookie className="w-6 h-6 text-accent flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <p className="text-sm text-text">
            Nous utilisons des cookies pour mesurer l&apos;audience et améliorer votre
            expérience.{" "}
            <Link href="/politique-confidentialite" className="text-accent hover:underline">
              En savoir plus
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={refuse}
            className="px-4 py-2.5 min-h-[44px] text-sm font-medium text-text-light hover:text-text transition-colors rounded-lg"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={accept}
            className="px-5 py-2.5 min-h-[44px] text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-xl hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
          >
            Accepter
          </button>
          <button
            type="button"
            onClick={refuse}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-text-light hover:text-text sm:hidden"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
