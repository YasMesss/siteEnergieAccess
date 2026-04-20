import type { Metadata } from "next";
import { ArrowRight, TrendingUp, FileCheck, Gauge } from "lucide-react";
import PageHero from "@/components/PageHero";
import EnergyPriceWidget from "@/components/EnergyPriceWidget";
import Button from "@/components/Button";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Prix de l’énergie en direct",
  description:
    "Indicateurs de marché (day-ahead) et rappels réglementaires TRV / ARENH — données à titre informatif pour les entreprises.",
};

export const revalidate = 3600;

const cards = [
  {
    icon: TrendingUp,
    title: "Prix spot day-ahead",
    desc: "Référence du marché de gros. Fluctue avec la météo, le gaz, le parc nucléaire et les échanges européens.",
  },
  {
    icon: FileCheck,
    title: "TRV & pros",
    desc: "Les tarifs réglementés de vente évoluent selon un calendrier officiel. Certains profils restent éligibles.",
  },
  {
    icon: Gauge,
    title: "ARENH",
    desc: "Accès régulé à l’énergie nucléaire historique, plafonné à 100 TWh et écrêté selon la demande.",
  },
];

export default function PrixEnergiePage() {
  return (
    <main>
      <PageHero
        eyebrow="Veille marché en continu"
        title="Comprendre les prix, c’est déjà négocier mieux."
        subtitle="Day-ahead, TRV, ARENH, indexations PEG / EEX… Nous suivons les indicateurs de marché au quotidien pour ajuster nos recommandations contractuelles."
      />

      <section className="pt-20 lg:pt-28 pb-10 lg:pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <EnergyPriceWidget />
          </AnimateOnScroll>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
            {cards.map(({ icon: Icon, title, desc }, i) => (
              <AnimateOnScroll key={title} delay={i * 80}>
                <div className="card-elevated h-full p-6 lg:p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary border border-primary/15">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-4 font-display font-bold text-ink text-[1.1rem] leading-snug">
                    {title}
                  </h3>
                  <p className="mt-2 text-text-light text-[0.92rem] leading-relaxed">{desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-bg-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-extrabold text-3xl lg:text-[2.2rem] text-ink tracking-tight leading-[1.1]">
            Les prix marché, c’est bien.
            <br />
            Votre facture, c’est mieux.
          </h2>
          <p className="mt-4 text-text-light max-w-xl mx-auto leading-relaxed">
            Les courbes publiques donnent une tendance. Votre tarif réel dépend de votre
            profil, de votre fournisseur et de votre formule. Notre analyse sur facture le
            révèle en quelques heures.
          </p>
          <div className="mt-8">
            <Button href="/contact" size="lg">
              Analyse sur facture
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
