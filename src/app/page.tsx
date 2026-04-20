import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Shield,
  ShieldCheck,
  LineChart,
  Headphones,
  Sparkles,
  Building2,
  Factory,
  Store,
  FileSignature,
  FileSearch,
  ClipboardCheck,
  TrendingDown,
  Zap,
  Quote,
  Lock,
  HeartHandshake,
} from "lucide-react";
import Button from "@/components/Button";
import SectionTitle from "@/components/SectionTitle";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import StatsBar from "@/components/StatsBar";
import MiniPriceCard from "@/components/MiniPriceCard";
import ProviderMarquee from "@/components/ProviderMarquee";
import ProcessTimeline from "@/components/ProcessTimeline";
import { company, sectors, services } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* ────────────────────── HERO ────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-white grain isolate">
        {/* Mesh blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-primary/45 blur-[120px] mesh-blob-1" />
          <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-accent/35 blur-[120px] mesh-blob-2" />
          <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] rounded-full bg-signal/25 blur-[120px] mesh-blob-3" />
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0 -z-10 grid-lines opacity-80" aria-hidden />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 lg:pt-20 pb-20 lg:pb-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left : copy */}
            <div className="lg:col-span-7">
              <span className="chip bg-white/10 border border-white/15 text-white/85 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                Courtier énergie B2B · {company.region.split("—")[0].trim()}
              </span>

              <h1 className="mt-6 font-display font-extrabold tracking-[-0.035em] leading-[1.02] text-[2.6rem] sm:text-5xl lg:text-[4.2rem]">
                Payez le juste prix
                <br />
                pour votre{" "}
                <span className="relative inline-block">
                  <span className="gradient-text-bright">électricité</span>
                </span>{" "}
                &amp; <span className="gradient-text-bright">gaz</span>
                <span className="text-accent">.</span>
              </h1>

              <p className="mt-6 text-[1.08rem] lg:text-[1.15rem] text-white/70 max-w-xl leading-relaxed">
                Mise en concurrence des principaux fournisseurs, analyse de votre profil réel,
                décryptage des clauses. Vous gardez la main — nous faisons le travail.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Button href="/contact" size="lg" className="!shadow-[0_20px_50px_-14px_rgba(16,185,129,0.55)]">
                  Étude gratuite en 4 min
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Link
                  href="/prix-energie"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-[1rem] font-semibold text-white hover:bg-white/10 transition-all"
                >
                  Voir les prix marché
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-lg text-sm">
                {[
                  { k: "0 €", v: "Frais cachés" },
                  { k: "4 min", v: "Pour nous transmettre vos factures" },
                  { k: "48 h", v: "Pour votre comparatif" },
                ].map((x) => (
                  <div key={x.k} className="border-l border-white/15 pl-3">
                    <div className="font-display font-bold text-white text-lg sm:text-xl tabular-nums">{x.k}</div>
                    <div className="text-white/55 text-[0.78rem] mt-1 leading-snug">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right : bento */}
            <div className="lg:col-span-5">
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                {/* Anatomy of the bill — pedagogical card */}
                <div className="col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 sm:p-6 backdrop-blur-sm">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="chip bg-white/10 text-white/80 border border-white/15 self-start">
                      <FileSearch className="w-3.5 h-3.5 text-accent" />
                      Anatomie d’une facture
                    </span>
                    <span className="text-[0.7rem] text-white/50">exemple PME · Tarif Jaune</span>
                  </div>

                  <h3 className="mt-4 font-display font-bold text-[1.2rem] sm:text-[1.35rem] leading-snug tracking-tight text-white max-w-sm">
                    Là où se joue <span className="gradient-text-bright">réellement</span> votre budget électricité.
                  </h3>

                  <div className="mt-5 space-y-3.5">
                    {[
                      {
                        label: "Part énergie",
                        sub: "fourniture — négociable",
                        pct: 45,
                        highlight: true,
                      },
                      {
                        label: "Acheminement",
                        sub: "TURPE — régulé par la CRE",
                        pct: 28,
                        highlight: false,
                      },
                      {
                        label: "Taxes & TVA",
                        sub: "CSPE, CTA, TVA — fixes",
                        pct: 27,
                        highlight: false,
                      },
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`font-semibold text-[0.88rem] truncate ${
                                row.highlight ? "text-white" : "text-white/75"
                              }`}
                            >
                              {row.label}
                            </span>
                            <span className="text-[0.72rem] text-white/45 truncate hidden sm:inline">
                              — {row.sub}
                            </span>
                          </div>
                          <span
                            className={`font-display font-bold tabular-nums ${
                              row.highlight ? "text-white text-lg" : "text-white/70 text-base"
                            }`}
                          >
                            {row.pct}%
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              row.highlight
                                ? "bg-gradient-to-r from-primary to-accent"
                                : "bg-white/20"
                            }`}
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-accent/20 bg-accent/[0.06] px-3.5 py-3">
                    <span className="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
                    <p className="text-[0.8rem] text-white/80 leading-relaxed">
                      Seule la <strong className="text-white font-semibold">part énergie</strong>{" "}
                      varie d’un fournisseur à l’autre. C’est là que notre mise en concurrence
                      crée de la valeur — le reste est contraint.
                    </p>
                  </div>
                </div>

                {/* Mini price card */}
                <div className="col-span-2 sm:col-span-1">
                  <MiniPriceCard dark />
                </div>

                {/* Mandat card */}
                <div className="col-span-2 sm:col-span-1 rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex flex-col justify-between">
                  <div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                      <Lock className="w-5 h-5 text-white" />
                    </span>
                    <p className="mt-3 font-display font-bold text-white text-[0.95rem] leading-snug">
                      Mandat légal sécurisé
                    </p>
                    <p className="mt-1 text-[0.78rem] text-white/60 leading-relaxed">
                      Collecte Enedis &amp; GRDF uniquement après votre accord.
                    </p>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 text-[0.72rem] text-white/50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    RGPD-compatible
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div
          className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          aria-hidden
        />
      </section>

      {/* ─────────────── PROVIDERS MARQUEE ─────────────── */}
      <ProviderMarquee />

      {/* ─────────────── STATS ─────────────── */}
      <section className="py-16 lg:py-20 bg-bg-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr,auto] gap-8 items-end mb-10">
            <div>
              <span className="chip bg-white text-text-light border border-line">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Ce qui nous distingue
              </span>
              <h2 className="mt-4 font-display text-3xl lg:text-[2.4rem] font-extrabold tracking-tight leading-[1.1] text-ink max-w-xl">
                Un métier de précision, pas de promesses.
              </h2>
            </div>
            <p className="text-text-light leading-relaxed max-w-sm text-[0.95rem]">
              Nos valeurs tiennent en trois chiffres — transparence, engagement, et
              un conseiller qui connaît votre dossier par cœur.
            </p>
          </div>
          <StatsBar />
        </div>
      </section>

      {/* ─────────────── WHY BROKER — BENTO ─────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionTitle
              eyebrow="Pourquoi un courtier"
              title="Le marché de l’énergie est complexe. Votre facture ne devrait pas l’être."
              subtitle="Entre TRV, ARENH, indexations et profils de conso, les offres fournisseurs sont rarement comparables en surface. Nous les ramenons à la même unité."
            />
          </AnimateOnScroll>

          <div className="mt-14 space-y-6">
            {/* Big card full width */}
            <AnimateOnScroll>
              <div className="relative overflow-hidden rounded-3xl bg-ink text-white p-6 sm:p-8 lg:p-12 grain">
                <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
                <div className="absolute -top-20 -right-20 w-[360px] h-[360px] rounded-full bg-accent/25 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-[320px] h-[320px] rounded-full bg-primary/30 blur-3xl" />
                <div className="relative z-10 grid lg:grid-cols-5 gap-8 items-center">
                  <div className="lg:col-span-3">
                    <span className="chip bg-white/10 border border-white/15 text-white/85">
                      <LineChart className="w-3.5 h-3.5 text-accent" />
                      Mise en concurrence
                    </span>
                    <h3 className="mt-5 font-display font-extrabold text-2xl lg:text-[2.2rem] leading-[1.15] tracking-tight max-w-xl">
                      Un accès direct aux{" "}
                      <span className="gradient-text-bright">principaux fournisseurs</span>{" "}
                      — pas à deux ou trois.
                    </h3>
                    <p className="mt-5 text-white/65 leading-relaxed max-w-lg">
                      Nous interrogeons simultanément EDF, Engie, TotalEnergies, Eni, Alpiq
                      et les acteurs alternatifs pertinents pour votre profil. Vous recevez
                      un comparatif ramené au même périmètre — puissance, courbe de charge,
                      clauses d’indexation, services inclus.
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {["EDF", "Engie", "TotalEnergies", "Eni", "Alpiq", "Ekwateur", "Wekiwi", "Vattenfall", "+4 autres"].map((p) => (
                        <span
                          key={p}
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[0.78rem] font-medium text-white/75"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {[
                {
                  icon: Shield,
                  title: "0 € pour vous",
                  text: "Notre rémunération est portée par le fournisseur retenu — jamais par vos factures. Conditions transparentes et contractualisées.",
                },
                {
                  icon: Headphones,
                  title: "Un conseiller dédié",
                  text: "Un interlocuteur unique, du premier échange jusqu’à la première facture du nouveau contrat.",
                },
                {
                  icon: HeartHandshake,
                  title: "Sans engagement",
                  text: "Vous restez libre à chaque étape. Aucun contrat signé sans votre accord explicite.",
                },
              ].map(({ icon: Icon, title, text }, i) => (
                <AnimateOnScroll key={title} delay={i * 80}>
                  <div className="card-elevated h-full p-7 lg:p-8 flex flex-col">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary border border-primary/15">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="mt-5 font-display font-bold text-ink text-[1.2rem] leading-snug">
                      {title}
                    </h3>
                    <p className="mt-2 text-text-light text-[0.93rem] leading-relaxed">{text}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── PROCESS TIMELINE ─────────────── */}
      <section className="relative overflow-hidden bg-ink text-white py-20 lg:py-28 grain isolate">
        <div className="absolute inset-0 -z-10 grid-lines opacity-50" aria-hidden />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full bg-accent/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="chip bg-white/10 border border-white/15 text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Comment ça marche
            </span>
            <h2 className="mt-5 font-display text-3xl lg:text-[2.8rem] font-extrabold tracking-tight leading-[1.08]">
              Six étapes nettes.
              <br />
              <span className="text-white/55">Aucune surprise.</span>
            </h2>
            <p className="mt-5 text-white/65 text-[1.02rem] max-w-xl leading-relaxed">
              Vous gardez la décision finale. Nous gérons la complexité réglementaire,
              l’analyse tarifaire et la coordination avec les fournisseurs.
            </p>
          </div>
          <div className="mt-14 lg:mt-20">
            <ProcessTimeline />
          </div>
          <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t border-white/10">
            <p className="text-white/65 max-w-xl text-[0.95rem]">
              En moyenne, une étude complète demande 4 minutes de votre temps pour le
              transfert des factures. Le reste, c’est nous.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Démarrer mon étude
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─────────────── SERVICES — EDITORIAL ROWS ─────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <SectionTitle
              eyebrow="Nos services"
              title="Électricité, gaz, résiliation, CEE — un seul interlocuteur."
              centered={false}
            />
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-primary hover:text-accent transition-colors self-start"
            >
              Tous les services
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {services.map((s, i) => {
              const icons = [Zap, Factory, FileSignature, Sparkles];
              const Icon = icons[i] ?? Zap;
              return (
                <AnimateOnScroll key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 py-8 lg:py-10 items-center hover:bg-bg-alt/40 transition-colors -mx-4 sm:-mx-6 px-4 sm:px-6 rounded-2xl"
                  >
                    <div className="lg:col-span-1">
                      <span className="font-display text-text-muted text-sm tabular-nums">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="lg:col-span-1">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/15 text-primary group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </span>
                    </div>
                    <div className="lg:col-span-6">
                      <h3 className="font-display font-bold text-ink text-[1.4rem] lg:text-[1.6rem] tracking-tight leading-tight">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-text-light leading-relaxed max-w-2xl">{s.short}</p>
                    </div>
                    <div className="lg:col-span-4 flex lg:justify-end">
                      <span className="inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-primary group-hover:text-accent transition-colors">
                        En savoir plus
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── PRIX ÉNERGIE ─────────────── */}
      <section className="py-20 lg:py-28 bg-bg-alt relative overflow-hidden">
        <div className="absolute inset-0 grid-lines-light opacity-60" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-16 items-center">
            <div>
              <span className="chip bg-white text-text-light border border-line">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping" />
                  <span className="relative h-2 w-2 rounded-full bg-accent" />
                </span>
                Veille marché en continu
              </span>
              <h2 className="mt-5 font-display text-3xl lg:text-[2.6rem] font-extrabold tracking-tight leading-[1.08] text-ink">
                Comprendre les prix,
                <br />
                <span className="gradient-text">c’est déjà négocier mieux.</span>
              </h2>
              <p className="mt-5 text-[1.02rem] text-text-light leading-relaxed max-w-xl">
                Day-ahead, TRV, ARENH, indexation PEG/EEX… Nous suivons les indicateurs de
                marché chaque jour pour ajuster nos recommandations contractuelles.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button href="/prix-energie" variant="dark" size="lg">
                  Page détaillée
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Analyse sur facture
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/15 to-accent/15 rounded-3xl blur-2xl" />
              <div className="relative">
                <MiniPriceCard />
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="card-elevated p-4">
                    <div className="text-[0.72rem] uppercase tracking-wide text-text-muted font-semibold">
                      TRV Bleu pro
                    </div>
                    <div className="mt-1.5 font-display font-bold text-ink text-lg">
                      Calendrier réglementé
                    </div>
                    <div className="text-text-light text-[0.82rem] mt-1">
                      Échéances mises à jour en temps réel sur la page dédiée.
                    </div>
                  </div>
                  <div className="card-elevated p-4">
                    <div className="text-[0.72rem] uppercase tracking-wide text-text-muted font-semibold">
                      ARENH
                    </div>
                    <div className="mt-1.5 font-display font-bold text-ink text-lg">
                      42 €/MWh
                    </div>
                    <div className="text-text-light text-[0.82rem] mt-1">
                      Plafond 100 TWh — volume écrêté selon demande.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── SECTORS BENTO ─────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionTitle
              eyebrow="Pour qui"
              title="Des dossiers énergie adaptés à chaque métier."
              subtitle="TPE, CHR, industrie, copropriétés, collectivités — notre expertise couvre tous les profils C5, C4, C3, et multi-sites."
            />
          </AnimateOnScroll>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] sm:auto-rows-[180px] lg:auto-rows-[200px] gap-4">
            {sectors.slice(0, 6).map((sec, i) => {
              const icons = [Store, Store, Building2, Building2, Factory, Factory];
              const Icon = icons[i];
              const isLarge = i === 0 || i === 3;
              return (
                <AnimateOnScroll
                  key={sec.title}
                  delay={i * 40}
                  className={
                    isLarge
                      ? "sm:col-span-2 sm:row-span-2"
                      : "col-span-1 row-span-1"
                  }
                >
                  <Link
                    href="/services"
                    className="group relative block h-full overflow-hidden rounded-2xl border border-line bg-white"
                  >
                    <Image
                      src={sec.image}
                      alt={sec.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      sizes={isLarge ? "(max-width:1024px) 100vw, 50vw" : "(max-width:1024px) 50vw, 25vw"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-between">
                      <span className="inline-flex self-start h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 text-white">
                        <Icon className="w-4 h-4" />
                      </span>
                      <div>
                        <h3 className="font-display font-bold text-white text-[1.05rem] lg:text-lg leading-tight">
                          {sec.title}
                        </h3>
                        {isLarge && (
                          <p className="mt-1.5 text-white/75 text-sm max-w-xs leading-snug">
                            {sec.desc}
                          </p>
                        )}
                        <span className="mt-3 inline-flex items-center gap-1 text-[0.78rem] text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          Voir les cas
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── TESTIMONIAL / CONFIANCE ─────────────── */}
      <section className="py-20 lg:py-28 bg-bg-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Quote
              className="absolute -top-6 -left-2 w-14 h-14 sm:-top-8 sm:-left-4 sm:w-20 sm:h-20 text-primary/10"
              aria-hidden
            />
            <blockquote className="relative">
              <p className="font-display font-bold text-ink text-[1.6rem] sm:text-3xl lg:text-[2.2rem] leading-[1.25] tracking-tight">
                « Nous pensions avoir déjà optimisé nos contrats. Energie Access a démontré
                en 48 h qu’il restait{" "}
                <span className="headline-accent">14 % d’économies</span> possibles, sans
                changer nos usages. »
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-display font-bold text-white">
                  MG
                </span>
                <div>
                  <div className="font-semibold text-ink">Marc G.</div>
                  <div className="text-sm text-text-light">
                    Dirigeant, PME industrielle · 6 sites · PACA
                  </div>
                </div>
              </footer>
              <p className="mt-6 text-[0.72rem] text-text-muted italic">
                Témoignage anonymisé représentatif d’un dossier traité. Résultats
                variables selon profil.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─────────────── FINAL CTA ─────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-ink text-white grain isolate">
        <div className="absolute inset-0 -z-10 opacity-60">
          <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-primary/25 blur-[140px]" />
          <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] rounded-full bg-accent/25 blur-[140px]" />
        </div>
        <div className="absolute inset-0 -z-10 grid-lines opacity-[0.08]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* ── Message & CTA ───────────────── */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Étude gratuite · réponse sous 48&nbsp;h ouvrées
              </span>

              <h2 className="mt-7 font-display font-extrabold text-3xl sm:text-4xl lg:text-[3.6rem] tracking-tight leading-tight sm:leading-[1.04]">
                Un diagnostic énergie <span className="gradient-text-bright">sérieux</span>,
                <br className="hidden sm:block" /> livré par un courtier <span className="gradient-text-bright">indépendant</span>.
              </h2>

              <p className="mt-6 text-white/70 max-w-xl text-[1.05rem] leading-relaxed">
                Nous auditons vos factures, challengeons huit fournisseurs sur votre profil
                de consommation réel et vous remettons un livrable chiffré. Vous décidez
                ensuite — aucun contrat n&apos;est signé sans votre validation écrite.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Button href="/contact" size="lg">
                  Lancer mon étude
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <a
                  href={company.phoneTel}
                  className="inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 rounded-xl border border-white/20 bg-white/[0.04] px-5 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-[1rem] font-semibold text-white hover:bg-white/10 hover:border-white/30 transition-all text-center"
                >
                  <span className="inline-flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-accent" />
                    Parler à un conseiller
                  </span>
                  <span className="hidden sm:inline text-white/40">·</span>
                  <span className="tabular-nums">{company.phoneDisplay}</span>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.82rem] text-white/55">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  Mandat révocable à tout moment
                </span>
                <span className="hidden sm:inline text-white/20">·</span>
                <span className="inline-flex items-center gap-2">
                  <Lock className="w-4 h-4 text-accent" />
                  Données traitées en France, RGPD
                </span>
                <span className="hidden sm:inline text-white/20">·</span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  Zéro démarchage après l&apos;étude
                </span>
              </div>
            </div>

            {/* ── Deliverable card ─────────────── */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 lg:p-8 backdrop-blur-sm shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
                <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

                <div className="flex items-center justify-between">
                  <span className="text-[0.7rem] uppercase tracking-[0.16em] text-white/50 font-medium">
                    Ce que vous recevez
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[0.68rem] font-semibold text-accent">
                    <FileSignature className="w-3 h-3" />
                    Livrable PDF
                  </span>
                </div>

                <h3 className="mt-3 font-display text-xl font-bold text-white">
                  Votre dossier énergie, prêt à décision.
                </h3>

                <ul className="mt-6 space-y-4">
                  {[
                    {
                      icon: FileSearch,
                      title: "Audit de facture détaillé",
                      text: "PDL, CAR, taxes, options tarifaires : chaque ligne décryptée.",
                    },
                    {
                      icon: LineChart,
                      title: "Comparatif 8+ fournisseurs",
                      text: "Offres cadrées sur votre profil de consommation réel.",
                    },
                    {
                      icon: TrendingDown,
                      title: "Économie chiffrée 12 et 36 mois",
                      text: "Scénarios prudent, médian, optimiste — avec hypothèses.",
                    },
                    {
                      icon: ClipboardCheck,
                      title: "Clauses à négocier identifiées",
                      text: "Indexation, fenêtres de sortie, pénalités, garanties d’origine.",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3.5">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.06] border border-white/10 text-accent">
                        <item.icon className="w-4 h-4" />
                      </span>
                      <div>
                        <div className="font-semibold text-[0.95rem] text-white">
                          {item.title}
                        </div>
                        <div className="text-[0.82rem] text-white/55 leading-relaxed">
                          {item.text}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 pt-5 border-t border-white/10 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                    EA
                  </div>
                  <div className="text-[0.82rem] leading-tight">
                    <div className="text-white/80 font-medium">Remis par votre conseiller dédié</div>
                    <div className="text-white/45">Basé à {company.city} · équipe en propre</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
