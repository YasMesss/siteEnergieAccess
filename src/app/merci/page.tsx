import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Clock } from "lucide-react";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Merci",
  robots: { index: false, follow: true },
};

export default function MerciPage() {
  return (
    <main className="relative overflow-hidden bg-bg-alt min-h-[80vh] flex items-center justify-center px-4 py-20 grain isolate">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-gradient-to-br from-primary/15 to-accent/20 blur-[120px]" />
      </div>
      <div className="relative max-w-xl text-center">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white border border-accent/20 shadow-[0_20px_50px_-18px_rgba(16,185,129,0.35)]">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </span>
        <h1 className="mt-8 font-display font-extrabold text-ink text-4xl lg:text-5xl tracking-tight leading-[1.05]">
          Demande reçue.
        </h1>
        <p className="mt-5 text-text-light text-[1.05rem] leading-relaxed max-w-lg mx-auto">
          Un conseiller examine votre dossier dès à présent et revient vers vous sous
          24 h ouvrées avec un premier point d’avancement.
        </p>

        <div className="mt-8 inline-flex items-center gap-2 chip bg-white text-text-light border border-line">
          <Clock className="w-3.5 h-3.5 text-accent" />
          Réponse sous 24 h ouvrées
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/">
            Retour à l’accueil
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button href="/blog" variant="secondary">
            Lire le blog
          </Button>
        </div>

        <p className="mt-10 text-sm text-text-muted">
          Besoin urgent ?{" "}
          <Link href="/contact" className="text-primary font-semibold hover:text-accent transition-colors">
            Revenir au contact
          </Link>
        </p>
      </div>
    </main>
  );
}
