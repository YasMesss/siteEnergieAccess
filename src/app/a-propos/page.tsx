import type { Metadata } from "next";
import { MapPin, Target, Scale, Users, Sparkles, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Button from "@/components/Button";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "À propos",
  description: `Qui sommes-nous — ${company.name}, courtier en énergie pour les professionnels en ${company.region}.`,
};

const values = [
  {
    icon: Target,
    title: "Expertise marché",
    desc: "Lecture fine des clauses contractuelles, suivi quotidien des indicateurs de gros et des évolutions réglementaires.",
  },
  {
    icon: Scale,
    title: "Transparence totale",
    desc: "Aucun frais caché. Notre modèle de rémunération est présenté dès le premier échange et contractualisé.",
  },
  {
    icon: Users,
    title: "Conseiller dédié",
    desc: "Un interlocuteur unique, joignable, qui connaît votre dossier — du premier échange jusqu’à la première facture.",
  },
];

export default function AProposPage() {
  return (
    <main>
      <PageHero
        eyebrow="Qui sommes-nous"
        title="Un courtier énergie ancré en PACA, pensé pour les décideurs."
        subtitle="Proximité, exigence technique, éthique de la transparence : notre métier est de vous faire gagner du temps et du budget, sans jamais vous déposséder de la décision."
      />

      {/* Mission */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr,1.3fr] gap-12 lg:gap-16 items-start">
            <AnimateOnScroll>
              <span className="chip bg-primary/8 text-primary border border-primary/15">
                <Sparkles className="w-3.5 h-3.5" />
                Notre mission
              </span>
              <h2 className="mt-5 font-display font-extrabold text-ink text-3xl lg:text-[2.4rem] tracking-tight leading-[1.1]">
                Traduire le marché de l’énergie en décisions budgétaires claires.
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <div className="space-y-5 text-text-light leading-relaxed text-[1.02rem]">
                <p>
                  <strong className="text-ink">{company.name}</strong> accompagne les{" "}
                  <strong className="text-ink">professionnels et entreprises</strong> dans la
                  mise en concurrence de leurs contrats d’électricité et de gaz naturel.
                  Nous traduisons les offres fournisseurs en gains budgétaires réels, sans
                  jargon inutile.
                </p>
                <p>
                  Basés à <strong className="text-ink">{company.city}</strong>, nous
                  intervenons en priorité en {company.region}, et au niveau national pour
                  les réseaux multi-sites.
                </p>
                <p>
                  Notre équipe cumule <strong className="text-ink">plus de 15 ans</strong>{" "}
                  d’expérience sur le marché de l’énergie B2B — côté fournisseur puis côté
                  courtage, ce qui nous permet de décrypter les clauses comme personne.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-bg-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="max-w-2xl">
              <span className="chip bg-white text-text-light border border-line">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Nos valeurs
              </span>
              <h2 className="mt-5 font-display font-extrabold text-ink text-3xl lg:text-[2.2rem] tracking-tight leading-[1.1]">
                Trois exigences non négociables.
              </h2>
            </div>
          </AnimateOnScroll>
          <div className="mt-12 grid md:grid-cols-3 gap-5 lg:gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <AnimateOnScroll key={title} delay={i * 80}>
                <div className="card-elevated h-full p-7 lg:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary border border-primary/15">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-5 font-display font-bold text-ink text-[1.25rem] leading-snug">
                    {title}
                  </h3>
                  <p className="mt-2 text-text-light text-[0.95rem] leading-relaxed">{desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-ink text-white p-8 lg:p-12 grain">
            <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
            <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-accent/20 blur-3xl" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="chip bg-white/10 border border-white/15 text-white/85">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  Implantation
                </span>
                <h2 className="mt-5 font-display font-extrabold text-3xl lg:text-[2.2rem] tracking-tight leading-[1.1]">
                  Au cœur de la région{" "}
                  <span className="gradient-text-bright">Provence-Alpes-Côte d’Azur</span>.
                </h2>
                <p className="mt-5 text-white/70 leading-relaxed max-w-xl">
                  {company.street}
                  <br />
                  {company.postalCode} {company.city}
                </p>
                <p className="mt-4 text-white/60 text-sm">{company.hours}</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button href="/contact" size="md">
                    Nous contacter
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <a
                    href={company.phoneTel}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-[0.92rem] font-semibold text-white hover:bg-white/10 transition-all"
                  >
                    {company.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      "Marseille",
                      "Aix-en-Provence",
                      "Les Pennes-Mirabeau",
                      "Vitrolles",
                      "Aubagne",
                      "La Ciotat",
                      "Toulon",
                      "Cannes",
                      "Nice",
                    ].map((v) => (
                      <div
                        key={v}
                        className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-center text-xs font-medium text-white/75"
                      >
                        {v}
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-xs text-white/55">
                    + interventions nationales pour les entreprises multi-sites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
