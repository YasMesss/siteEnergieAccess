import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <main>
      <PageHero eyebrow="Légal" title="Mentions légales" />
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="blog-content">
            <h2>Éditeur du site</h2>
            <p>
              <strong>{company.name}</strong>
              <br />
              {company.street}
              <br />
              {company.postalCode} {company.city} — France
              <br />
              Tél. : {company.phoneDisplay}
              <br />
              Email : {company.emailContact}
            </p>
            <p>
              <em>
                Les informations juridiques complètes (forme sociale, SIREN/SIRET, capital
                social, RCS, TVA) seront intégrées dès validation par le client.
              </em>
            </p>

            <h2>Hébergement</h2>
            <p>
              <em>
                À compléter : raison sociale, adresse et téléphone de l’hébergeur du site
                (VPS / prestataire).
              </em>
            </p>

            <h2>Directeur de la publication</h2>
            <p>
              <em>À compléter : nom du représentant légal ou responsable éditorial.</em>
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L’ensemble des contenus (textes, images, logos, structure) est protégé par
              le droit de la propriété intellectuelle. Toute reproduction ou
              représentation sans autorisation écrite préalable est interdite.
            </p>

            <h2>Crédits</h2>
            <p>
              Photographies : Unsplash (licence libre), illustrations internes. Site conçu
              et développé sur-mesure.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
