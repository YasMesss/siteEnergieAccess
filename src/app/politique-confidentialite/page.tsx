import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function PolitiquePage() {
  return (
    <main>
      <PageHero eyebrow="Légal" title="Politique de confidentialité" />
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="blog-content">
            <p>
              {company.name} accorde une importance particulière à la protection des
              données personnelles collectées via le site energieaccess.fr (et
              sous-domaines de recette) et les formulaires associés.
            </p>

            <h2>Responsable du traitement</h2>
            <p>
              <em>
                À compléter : identité du responsable du traitement et coordonnées du DPO
                si applicable.
              </em>
            </p>

            <h2>Finalités</h2>
            <ul>
              <li>Répondre aux demandes de contact, de rappel et de devis.</li>
              <li>Envoyer la newsletter si vous y avez souscrit.</li>
              <li>
                Mesurer l’audience du site (sous réserve de votre consentement via le
                bandeau cookies).
              </li>
            </ul>

            <h2>Base légale</h2>
            <ul>
              <li>Exécution de mesures précontractuelles pour les demandes de devis.</li>
              <li>Consentement pour la newsletter et les cookies de mesure.</li>
              <li>Intérêt légitime pour la sécurité et la prévention de la fraude.</li>
            </ul>

            <h2>Durée de conservation</h2>
            <p>
              Les messages et demandes de devis sont conservés 3 ans à compter du dernier
              contact. Les inscriptions à la newsletter sont conservées jusqu’au
              désabonnement.
            </p>

            <h2>Cookies</h2>
            <p>
              Des cookies peuvent être déposés pour la mesure d’audience (Google
              Analytics) après acceptation via le bandeau. Vous pouvez retirer votre
              consentement en supprimant les cookies du navigateur ou en modifiant vos
              choix depuis le lien dédié.
            </p>

            <h2>Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits d’accès, de rectification,
              d’effacement, de limitation, de portabilité et d’opposition. Pour exercer
              ces droits : <strong>{company.emailContact}</strong>.
            </p>
            <p>
              En cas de désaccord, vous pouvez déposer une réclamation auprès de la CNIL
              (www.cnil.fr).
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
