import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
};

export default function CGVPage() {
  return (
    <main>
      <PageHero eyebrow="Légal" title="Conditions générales de vente" />
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="blog-content">
            <p>
              Les présentes CGV encadrent les relations contractuelles entre{" "}
              <strong>Energie Access</strong> et ses clients professionnels dans le cadre
              de ses prestations de courtage en énergie.
            </p>
            <p>
              <em>
                Document juridique à finaliser avec le conseil de la société (mandat de
                courtage, honoraires / rémunération par commission fournisseur,
                responsabilité, résiliation, litiges, médiation).
              </em>
            </p>

            <h2>1. Objet</h2>
            <p>
              Energie Access accompagne le client dans la mise en concurrence et la
              contractualisation avec un ou plusieurs fournisseurs d’énergie, dans le
              respect de la réglementation en vigueur.
            </p>

            <h2>2. Mandat</h2>
            <p>
              La prestation s’appuie sur un mandat de collecte de données et, le cas
              échéant, un mandat de négociation. Ce mandat précise le périmètre, la durée
              et les modalités de révocation.
            </p>

            <h2>3. Rémunération</h2>
            <p>
              La rémunération du courtier est portée par le fournisseur retenu sous forme
              de commission contractuelle. Aucun frais n’est facturé au client sauf
              mention explicite et acceptée par écrit.
            </p>

            <h2>4. Données personnelles</h2>
            <p>
              Le traitement des données est décrit dans la{" "}
              <a href="/politique-confidentialite">politique de confidentialité</a>.
            </p>

            <h2>5. Litiges & médiation</h2>
            <p>
              <em>
                Clause de médiation et juridiction compétente à préciser avec le conseil
                juridique.
              </em>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
