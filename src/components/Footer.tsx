import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import Logo from "@/components/Logo";
import { company, navLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-white overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/10 blur-[120px]"
        aria-hidden
      />

      {/* Newsletter strip */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-[1fr,auto] items-center gap-8">
            <div className="max-w-xl">
              <span className="chip bg-white/10 border border-white/15 text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Newsletter mensuelle
              </span>
              <h3 className="mt-4 font-display font-extrabold text-2xl lg:text-[1.7rem] tracking-tight leading-tight">
                Recevez notre veille prix &amp; réglementation.
              </h3>
              <p className="mt-2 text-white/60 text-sm leading-relaxed">
                Un email par mois — marché de l’énergie, TRV, ARENH, décryptages pour les
                décideurs.
              </p>
            </div>
            <div className="w-full md:w-[360px]">
              <NewsletterForm />
              <p className="mt-2 text-[0.68rem] text-white/40">
                Désabonnement en un clic. RGPD-compatible.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          <div className="md:col-span-4">
            <Logo inverted />
            <p className="mt-5 text-white/60 text-sm leading-relaxed max-w-xs">
              Courtier en énergie indépendant pour les professionnels &amp; entreprises.
              Étude gratuite, sans engagement, de l’analyse jusqu’à la bascule contrat.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { href: company.social.facebook, icon: Facebook, label: "Facebook" },
                { href: company.social.instagram, icon: Instagram, label: "Instagram" },
                { href: company.social.linkedin ?? "#", icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-accent/15 hover:border-accent/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/50 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-white/75 hover:text-white transition-colors text-[0.92rem]"
                  >
                    {l.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/50 mb-5">
              Informations
            </h4>
            <ul className="space-y-3 text-[0.92rem]">
              {[
                { href: "/mentions-legales", label: "Mentions légales" },
                { href: "/cgv", label: "CGV" },
                { href: "/politique-confidentialite", label: "Politique de confidentialité" },
                { href: "/accessibilite", label: "Accessibilité" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/50 mb-5">
              Contact
            </h4>
            <ul className="space-y-4 text-[0.92rem]">
              <li className="flex gap-3 text-white/80">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                <span className="leading-relaxed">
                  {company.street}
                  <br />
                  {company.postalCode} {company.city}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href={company.phoneTel}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {company.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${company.emailContact}`}
                  className="text-white/80 hover:text-white transition-colors break-all"
                >
                  {company.emailContact}
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs text-white/45">{company.hours}</p>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <span>
            © {new Date().getFullYear()} {company.name}. Tous droits réservés.
          </span>
          <span>Courtier en énergie indépendant · SIRET disponible sur demande</span>
        </div>
      </div>
    </footer>
  );
}
