import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  Factory,
  FileSignature,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Button from "@/components/Button";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Courtage électricité et gaz, accompagnement résiliation, efficacité énergétique et CEE pour les entreprises.",
};

const details: Record<string, string[]> = {
  electricite: [
    "Analyse de votre profil C5 / C4 / C3 et courbe de charge",
    "Mise en concurrence des principaux fournisseurs du marché",
    "Comparatif clauses d’indexation, ARENH, services inclus",
    "Recommandation contractuelle argumentée",
  ],
  gaz: [
    "Étude indexation PEG / TTF, prix fixe, formules hybrides",
    "Décryptage des clauses d’ajustement et des index",
    "Sécurisation de votre budget annuel",
    "Coordination multi-sites si besoin",
  ],
  accompagnement: [
    "Mandat de collecte Enedis / GRDF sécurisé",
    "Signature électronique du contrat fournisseur",
    "Résiliation auprès de l’ancien fournisseur",
    "Suivi jusqu’à la première facture du nouveau contrat",
  ],
  cee: [
    "Identification des leviers d’efficacité (éclairage, isolation…)",
    "Orientation vers les primes CEE applicables",
    "Mise en relation avec des installateurs qualifiés",
    "Suivi du dossier administratif",
  ],
};

const icons: Record<string, typeof Zap> = {
  electricite: Zap,
  gaz: Factory,
  accompagnement: FileSignature,
  cee: Sparkles,
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Nos services"
        title="Un seul interlocuteur pour vos achats d’énergie."
        subtitle="De l’audit de factures à la signature électronique, nous pilotons l’ensemble du dossier — en gardant la décision dans vos mains."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
          {services.map((s, i) => {
            const Icon = icons[s.slug] ?? Zap;
            const reversed = i % 2 === 1;
            return (
              <AnimateOnScroll key={s.slug}>
                <article
                  id={s.slug}
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center scroll-mt-28 ${
                    reversed ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-text-muted text-sm tabular-nums">
                        0{i + 1}
                      </span>
                      <span className="h-px w-10 bg-line" />
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary border border-primary/15">
                        <Icon className="w-5 h-5" />
                      </span>
                    </div>
                    <h2 className="mt-5 font-display font-extrabold text-3xl lg:text-[2.2rem] text-ink tracking-tight leading-[1.1]">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-text-light leading-relaxed text-[1.02rem]">
                      {s.short}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {(details[s.slug] ?? []).map((d) => (
                        <li key={d} className="flex gap-3 text-[0.95rem] text-ink">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="mt-8 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-primary hover:text-accent transition-colors"
                    >
                      Demander une étude pour ce service
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Visual panel */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-2xl" />
                    <div className="relative card-elevated p-8 lg:p-10">
                      <div className="flex items-center justify-between">
                        <span className="chip bg-bg-alt text-text-light border border-line">
                          Prestation
                        </span>
                        <span className="font-display font-bold text-text-muted text-sm">
                          {s.slug.toUpperCase()}
                        </span>
                      </div>
                      <div className="mt-6 flex items-center justify-center">
                        <span className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent text-white shadow-[0_20px_50px_-18px_rgba(29,78,216,0.55)]">
                          <Icon className="w-10 h-10" />
                        </span>
                      </div>
                      <div className="mt-6 grid grid-cols-3 gap-2">
                        {["Profil", "Marché", "Contrat"].map((l, j) => (
                          <div
                            key={l}
                            className="rounded-xl bg-bg-alt border border-line p-3"
                          >
                            <div className="h-1 rounded-full bg-line overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-accent"
                                style={{ width: `${[100, 80, 65][j]}%` }}
                              />
                            </div>
                            <div className="mt-1.5 text-[0.68rem] text-text-muted font-medium">
                              {l}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </AnimateOnScroll>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-bg-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-extrabold text-3xl lg:text-[2.2rem] text-ink tracking-tight leading-[1.1]">
            Besoin d’aide pour choisir la prestation adaptée ?
          </h2>
          <p className="mt-4 text-text-light max-w-xl mx-auto">
            On échange 15 min au téléphone pour cadrer votre besoin — ensuite on vous
            propose une trajectoire claire.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/contact" size="lg">
              Étude gratuite
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button href="/prix-energie" variant="secondary" size="lg">
              Voir les prix marché
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
