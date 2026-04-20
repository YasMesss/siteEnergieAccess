import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, HelpCircle, MessageSquare } from "lucide-react";
import PageHero from "@/components/PageHero";
import FAQAccordion from "@/components/FAQAccordion";
import Button from "@/components/Button";
import { faqItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes sur le courtage en énergie, les TRV, l’ARENH et le marché de l’électricité.",
};

export default function FAQPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <PageHero
        eyebrow="Questions fréquentes"
        title="Tout ce qu’on nous demande, avec des réponses droites."
        subtitle="Les réponses ci-dessous sont générales. Votre situation (PDL / PCE, puissance, type d’offre) peut modifier les options disponibles — appelez-nous pour une lecture personnalisée."
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-text-light">
              {faqItems.length} questions essentielles
            </span>
          </div>
          <FAQAccordion items={faqItems} />

          <div className="mt-14 relative overflow-hidden rounded-2xl bg-ink text-white p-6 sm:p-8 lg:p-10 grain">
            <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
            <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-accent/25 blur-3xl" />
            <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="max-w-md">
                <span className="chip bg-white/10 border border-white/15 text-white/85">
                  <MessageSquare className="w-3.5 h-3.5 text-accent" />
                  Votre cas n’y est pas ?
                </span>
                <h2 className="mt-4 font-display font-extrabold text-xl lg:text-2xl leading-tight">
                  Posez-nous votre question précise, on répond sous 24 h ouvrées.
                </h2>
              </div>
              <div className="flex gap-3">
                <Button href="/contact" size="md">
                  Nous écrire
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-text-muted">
            Envie d’approfondir ?{" "}
            <Link href="/blog" className="text-primary font-semibold hover:text-accent transition-colors">
              Consulter le blog →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
