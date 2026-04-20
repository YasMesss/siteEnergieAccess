import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, FileText, PhoneCall, MessageSquare } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactMessageForm from "@/components/ContactMessageForm";
import CallbackForm from "@/components/CallbackForm";
import DevisForm from "@/components/DevisForm";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez ${company.name} pour une étude gratuite sur vos contrats d'électricité et de gaz.`,
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre budget énergie."
        subtitle="Étude gratuite, rappel téléphonique ou message libre — choisissez le canal qui vous convient. Réponse sous 24 h ouvrées."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-10 lg:gap-14 items-start">
            {/* Left : coordonnées */}
            <aside className="lg:sticky lg:top-28 space-y-6">
              <div className="card-elevated p-6 lg:p-7">
                <span className="chip bg-primary/8 text-primary border border-primary/15 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Coordonnées
                </span>
                <h2 className="font-display font-bold text-ink text-xl mb-5">
                  {company.name}
                </h2>
                <ul className="space-y-5">
                  <li className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span className="text-[0.92rem] text-text-light leading-relaxed">
                      {company.street}
                      <br />
                      {company.postalCode} {company.city}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Phone className="w-4 h-4" />
                    </span>
                    <a
                      href={company.phoneTel}
                      className="text-[0.95rem] font-semibold text-ink hover:text-primary transition-colors"
                    >
                      {company.phoneDisplay}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Mail className="w-4 h-4" />
                    </span>
                    <a
                      href={`mailto:${company.emailContact}`}
                      className="text-[0.92rem] text-ink hover:text-primary transition-colors break-all"
                    >
                      {company.emailContact}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-alt text-text-light">
                      <Clock className="w-4 h-4" />
                    </span>
                    <span className="text-[0.92rem] text-text-light leading-relaxed">
                      {company.hours}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-ink text-white p-6 grain">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/25 blur-3xl" />
                <div className="relative z-10">
                  <p className="font-display font-bold text-[0.95rem] leading-snug">
                    Besoin urgent ?
                  </p>
                  <p className="mt-1 text-white/65 text-sm leading-relaxed">
                    Appelez-nous directement, un conseiller répond immédiatement aux
                    horaires ouvrés.
                  </p>
                  <a
                    href={company.phoneTel}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white text-ink px-4 py-2.5 text-sm font-semibold hover:bg-bg-alt transition-colors"
                  >
                    <Phone className="w-4 h-4 text-accent" />
                    {company.phoneDisplay}
                  </a>
                </div>
              </div>
            </aside>

            {/* Right : forms */}
            <div className="space-y-10 lg:space-y-14">
              <div className="card-elevated p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                    <FileText className="w-4 h-4" />
                  </span>
                  <h2 className="font-display font-extrabold text-ink text-2xl lg:text-[1.6rem] tracking-tight">
                    Demande d’étude / devis
                  </h2>
                </div>
                <p className="text-text-light text-[0.95rem] mb-7 max-w-xl">
                  Joignez vos dernières factures (optionnel) pour une analyse plus précise.
                  PDF, JPEG, PNG ou WebP — jusqu’à 10 Mo.
                </p>
                <DevisForm />
              </div>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                <div className="card-elevated p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <PhoneCall className="w-4 h-4" />
                    </span>
                    <h2 className="font-display font-bold text-ink text-lg">Être rappelé</h2>
                  </div>
                  <p className="text-text-light text-sm mb-5">
                    Indiquez un créneau, un conseiller vous rappelle.
                  </p>
                  <CallbackForm />
                </div>
                <div className="card-elevated p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/8 text-primary">
                      <MessageSquare className="w-4 h-4" />
                    </span>
                    <h2 className="font-display font-bold text-ink text-lg">Message libre</h2>
                  </div>
                  <p className="text-text-light text-sm mb-5">
                    Pour toute autre question.
                  </p>
                  <ContactMessageForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
