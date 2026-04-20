import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Accessibilité",
};

export default function AccessibilitePage() {
  return (
    <main>
      <PageHero eyebrow="Légal" title="Déclaration d’accessibilité" />
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="blog-content">
            <p>
              {company.name} s’engage à rendre son site web accessible conformément à
              l’article 47 de la loi n° 2005-102 du 11 février 2005.
            </p>

            <h2>État de conformité</h2>
            <p>
              <strong>Partiellement conforme.</strong> Des ajustements peuvent encore
              être nécessaires sur certains composants tiers (widgets cartographiques,
              lecteurs intégrés, contrastes ponctuels). Une revue RGAA complète est
              prévue dans le cycle de maintenance.
            </p>

            <h2>Technologies utilisées</h2>
            <ul>
              <li>HTML5, CSS3 (TailwindCSS), JavaScript (React / Next.js)</li>
              <li>Polices web optimisées avec fallback système</li>
              <li>Images servies en WebP / AVIF via Next Image</li>
            </ul>

            <h2>Signaler un problème</h2>
            <p>
              Si vous rencontrez un défaut d’accessibilité qui vous empêche d’accéder à
              un contenu, écrivez-nous à{" "}
              <strong>{company.emailContact}</strong> ou appelez le{" "}
              <strong>{company.phoneDisplay}</strong>. Nous revenons vers vous sous 10
              jours ouvrés.
            </p>

            <h2>Voie de recours</h2>
            <p>
              En cas d’absence de réponse satisfaisante, vous pouvez saisir le Défenseur
              des droits (www.defenseurdesdroits.fr).
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
