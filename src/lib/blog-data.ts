export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  image: string;
  tags: string[];
}

const articles: BlogArticle[] = [
  {
    slug: "fin-tarifs-reglementes-professionnels",
    title: "Fin des tarifs réglementés pour les pros : ce qui change vraiment",
    excerpt:
      "TRV, profils C5, offres de marché : décryptage pour les TPE et PME qui veulent sécuriser leur budget énergie.",
    category: "Réglementation",
    author: "Équipe Energie Access",
    publishedAt: "2026-04-18T09:00:00Z",
    readingTime: 7,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=80",
    tags: ["TRV", "électricité", "professionnels", "CRE"],
    content: `
      <h2>Comprendre le calendrier</h2>
      <p>Les tarifs réglementés de vente (TRV) concernent une partie des sites professionnels au profil dit « petit professionnel ». Leur évolution est pilotée par la Commission de régulation de l’énergie (CRE) et publiée sur <strong>data.gouv.fr</strong>. Pour les autres profils, vous êtes déjà en offre de marché : la bonne question est moins « TRV oui/non » que « quelle formule d’indexation pour mon usage ».</p>
      <h2>Ce qui impacte votre facture au-delà du « prix kWh »</h2>
      <ul>
        <li>La <strong>puissance souscrite</strong> et votre dépassement éventuel.</li>
        <li>La <strong>structure HP/HC</strong> et la courbe de charge.</li>
        <li>Les <strong>composantes non négociables</strong> (taxes, acheminement, comptage…).</li>
        <li>Les <strong>options vertes</strong> ou services (maintenance, data…).</li>
      </ul>
      <h2>Notre rôle de courtier</h2>
      <p>Nous comparons des offres sur la base de <strong>vos factures réelles</strong>, pas d’un comparateur grand public qui ignore votre profil C4/C5 ou vos multi-sites. L’objectif : une vision sur 12 à 36 mois, avec scénarios fixe / indexé.</p>
    `,
  },
  {
    slug: "arenh-apres-2026-impact-facture",
    title: "ARENH après 2026 : quel impact concret sur votre facture ?",
    excerpt:
      "Volume plafonné, prix de référence, offres indexées : ce que les entreprises doivent surveiller dans leurs contrats.",
    category: "Marché",
    author: "Équipe Energie Access",
    publishedAt: "2026-04-12T09:00:00Z",
    readingTime: 8,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
    tags: ["ARENH", "EDF OA", "électricité", "marché"],
    content: `
      <h2>L’ARENH en deux phrases</h2>
      <p>L’Accès Régulé à l’Électricité Nucléaire Historique (ARENH) permet aux fournisseurs alternatifs d’acheter un volume d’électricité nucléaire historique à un prix régulé. Ce mécanisme structure une partie des offres « indexées » sur le marché de détail.</p>
      <h2>Pourquoi votre contrat peut bouger même « à prix fixe »</h2>
      <p>Selon les clauses, une offre dite fixe peut intégrer des <strong>révisions</strong> liées à des événements réglementaires, au spread, ou à des composantes acheminement. La lecture des conditions générales — et des annexes tarifaires — est essentielle.</p>
      <h2>Ce que nous recommandons</h2>
      <ul>
        <li>Demander une <strong>grille de prix décomposée</strong> (énergie, capacité, services).</li>
        <li>Comparer sur <strong>12 / 24 / 36 mois</strong> avec hypothèses de conso stables.</li>
        <li>Anticiper les <strong>échéances de reconduction tacite</strong> pour renégocier à temps.</li>
      </ul>
    `,
  },
  {
    slug: "decret-tertiaire-obligations-economies",
    title: "Décret tertiaire : obligations d’économies pour les bâtiments professionnels",
    excerpt:
      "Référencement OPERAT, trajectoire −40 % / −50 % / −60 % : où en sont les sièges, bureaux et commerces ?",
    category: "Réglementation",
    author: "Équipe Energie Access",
    publishedAt: "2026-04-05T09:00:00Z",
    readingTime: 6,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    tags: ["décret tertiaire", "OPERAT", "bâtiments"],
    content: `
      <h2>Qui est concerné ?</h2>
      <p>Le décret tertiaire vise les bâtiments à usage principal de bureaux, d’enseignement, de commerce, d’hôtellerie… au-delà de certains seuils de surface. L’obligation porte sur la <strong>réduction de la consommation d’énergie finale</strong> à horizon 2050, avec des jalons intermédiaires.</p>
      <h2>Énergie ≠ carbone</h2>
      <p>Les actions sur le <strong>contrat d’achat</strong> (électricité verte, biométhane…) ne remplacent pas toujours les obligations de réduction de kWh. Il faut distinguer <strong>efficacité énergétique</strong> et <strong>approvisionnement</strong>.</p>
      <h2>Liens avec votre stratégie fournisseur</h2>
      <p>Un profil mieux maîtrisé (pic, flexibilité) peut ouvrir des options tarifaires intéressantes : nous croisons souvent décret tertiaire et <strong>optimisation contractuelle</strong>.</p>
    `,
  },
  {
    slug: "lire-facture-electricite-b2b",
    title: "Comment lire et décoder votre facture d’électricité B2B",
    excerpt:
      "Cadran tarifaire, CSPE / CTA, TVA, terme fixe : la check-list pour relancer votre fournisseur avec des arguments solides.",
    category: "Conseil",
    author: "Équipe Energie Access",
    publishedAt: "2026-03-28T09:00:00Z",
    readingTime: 7,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    tags: ["facture", "électricité", "B2B"],
    content: `
      <h2>Les blocs indispensables</h2>
      <ul>
        <li><strong>Point de livraison (PDL)</strong> et puissance souscrite.</li>
        <li><strong>Historique de conso</strong> (kWh) et profil de charge si disponible.</li>
        <li><strong>Option tarifaire</strong> (Base, HP/HC, etc.).</li>
        <li><strong>Abonnement / terme fixe</strong> vs prix de l’énergie.</li>
      </ul>
      <h2>Les pièges fréquents</h2>
      <p>Confondre <strong>prix moyen affiché</strong> et prix réel après taxes, ou ignorer les <strong>dépassements de puissance</strong>. Une facture « stable » peut masquer une hausse du volume ou l’inverse.</p>
      <h2>Ce que nous faisons pour vous</h2>
      <p>Nous reconstituons un <strong>tableau de bord</strong> lisible par votre direction financière : budget prévisionnel, sensibilité aux hausses de marché, pistes d’économies court terme / moyen terme.</p>
    `,
  },
  {
    slug: "cee-primes-travaux-elegibles",
    title: "CEE : primes et travaux éligibles pour les professionnels",
    excerpt:
      "Fiches standardisées, cumac, délégataires : comment ne pas passer à côté d’un financement sur vos travaux d’efficacité.",
    category: "Efficacité",
    author: "Équipe Energie Access",
    publishedAt: "2026-03-20T09:00:00Z",
    readingTime: 6,
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
    tags: ["CEE", "primes", "rénovation"],
    content: `
      <h2>Rappel utile</h2>
      <p>Les Certificats d’économies d’énergie (CEE) financent une partie des travaux réalisés par des professionnels qualifiés (RGE ou équivalents selon fiches). Le montant dépend des <strong>fiches CEE</strong>, de la zone climatique, et des produits installés.</p>
      <h2>Pour les entreprises</h2>
      <p>Éclairage LED, isolation, VMC double flux, chaudières performantes… : la clé est la <strong>faisabilité technique + administratif</strong>. Nous orientons nos clients vers des partenaires sérieux lorsque le projet est mature.</p>
    `,
  },
  {
    slug: "electricite-verte-b2b-greenwashing",
    title: "Électricité verte B2B : vrai engagement ou greenwashing ?",
    excerpt:
      "Garanties d’origine, additionnalité, contrats long terme : les critères pour choisir une offre crédible.",
    category: "RSE",
    author: "Équipe Energie Access",
    publishedAt: "2026-03-12T09:00:00Z",
    readingTime: 7,
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80",
    tags: ["GO", "renouvelable", "RSE"],
    content: `
      <h2>Comprendre la garantie d’origine</h2>
      <p>Les GO (Garanties d’Origine) traquent l’énergie renouvelable produite. S’approvisionner en GO est un mécanisme reconnu — mais il ne dit pas seul si votre offre est « additionnelle » ou alignée sur un projet neuf.</p>
      <h2>Questions à poser à un fournisseur</h2>
      <ul>
        <li>Mix réel et <strong>traçabilité</strong> des GO.</li>
        <li>Part de <strong>PPA</strong> ou contrats long terme.</li>
        <li>Reporting carbone (scope 2) compatible avec vos exigences extra-financières.</li>
      </ul>
    `,
  },
  {
    slug: "negocier-contrat-gaz-cinq-leviers",
    title: "Négocier son contrat de gaz naturel : les 5 leviers à connaître",
    excerpt:
      "Indexation TTF, prix fixes, capacité journalière, flexibilité : le lexique pour renégocier sans perdre le fil.",
    category: "Conseil",
    author: "Équipe Energie Access",
    publishedAt: "2026-03-02T09:00:00Z",
    readingTime: 6,
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80",
    tags: ["gaz", "TTF", "contrat"],
    content: `
      <h2>1. Le niveau de prix de départ</h2>
      <p>Le « fixe » ou le coefficient d’indexation doit être comparé sur une base <strong>identique</strong> (durée, services, calendrier de conso).</p>
      <h2>2. La courbe de conso</h2>
      <p>Écart-type saisonnier, pointe hivernale : votre profil PCE influence fortement le risque prix.</p>
      <h2>3. Les services inclus</h2>
      <p>Data, alertes, accompagnement facturation : utile pour les équipes opérationnelles.</p>
      <h2>4. Les clauses de révision</h2>
      <p>Force majeure, événements réglementaires : à relire avec attention.</p>
      <h2>5. La qualité du suivi</h2>
      <p>Un bon prix sans SAV facture n’est pas un bon contrat. Nous tenons compte de la <strong>notation opérationnelle</strong> des fournisseurs dans nos recommandations.</p>
    `,
  },
  {
    slug: "autoconsommation-solaire-paca-rentabilite",
    title: "Auto-consommation photovoltaïque : rentabilité en PACA",
    excerpt:
      "Ensoleillement, toitures, autoconsommation avec vente surplus : ordres de grandeur pour les toits d’entreprise.",
    category: "Projets",
    author: "Équipe Energie Access",
    publishedAt: "2026-02-22T09:00:00Z",
    readingTime: 7,
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
    tags: ["photovoltaïque", "PACA", "autoconsommation"],
    content: `
      <h2>Pourquoi la PACA est favorable</h2>
      <p>Le potentiel solaire dépend de l’ensoleillement, de l’orientation, des ombrages et de la <strong>courbe de charge simultanée</strong> (clim, process…).</p>
      <h2>Économie vs investissement</h2>
      <p>L’autoconsommation réduit la facture d’achat réseau ; le surplus peut être valorisé. La rentabilité se calcule <strong>projet par projet</strong> (CAPEX, subventions, fiscalité).</p>
      <h2>Complément avec le courtage</h2>
      <p>Nous intégrons le solaire dans une <strong>stratégie globale</strong> : taille de compteur, green PPAs, clauses contractuelles adaptées.</p>
    `,
  },
  {
    slug: "pourquoi-courtier-fournisseur-direct",
    title: "Pourquoi passer par un courtier plutôt que directement chez le fournisseur ?",
    excerpt:
      "Volumes de négociation, neutralité, gain de temps : ce que vous achetez vraiment avec un intermédiaire spécialisé B2B.",
    category: "Conseil",
    author: "Équipe Energie Access",
    publishedAt: "2026-02-10T09:00:00Z",
    readingTime: 5,
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    tags: ["courtier", "B2B", "négociation"],
    content: `
      <h2>Neutralité et benchmarking</h2>
      <p>Un commercial mono-marque optimise son offre, pas votre portefeuille multi-sites. Un courtier compare <strong>plusieurs enveloppes</strong> avec les mêmes hypothèses de conso.</p>
      <h2>Accès aux grilles « volume »</h2>
      <p>Les courtiers agrègent des volumes : certaines remises ou options ne sont proposées que dans ce canal.</p>
      <h2>Gain de temps direction / achats</h2>
      <p>Nous structurons les données, gérons les allers-retours documents, et clarifions les clauses pour votre juriste ou votre DAF.</p>
    `,
  },
  {
    slug: "prix-spot-contrat-fixe-indexe-hybride",
    title: "Prix SPOT : contrat fixe, indexé ou hybride ? Comment choisir",
    excerpt:
      "Courbes forward, prime de risque, couverture partielle : le guide express pour décideurs non traders.",
    category: "Marché",
    author: "Équipe Energie Access",
    publishedAt: "2026-01-30T09:00:00Z",
    readingTime: 8,
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    tags: ["SPOT", "hedging", "électricité"],
    content: `
      <h2>Comprendre le SPOT</h2>
      <p>Le prix spot (jour / heure) est volatile. Peu d’entreprises achètent 100 % spot « nus » : on observe plutôt des <strong>formules indexées</strong> avec coefficients et parfois des caps / floors.</p>
      <h2>Fixe</h2>
      <p>Visibilité budgétaire maximale ; prime de risque plus élevée selon les périodes.</p>
      <h2>Indexé</h2>
      <p>Suivi du marché ; nécessite une <strong>surveillance</strong> et souvent des outils de budget internes.</p>
      <h2>Hybride</h2>
      <p>Part fixe / part indexée pour lisser le risque — les bonnes proportions dépendent de votre exposition et de votre politique de trésorerie.</p>
      <p><em>La page « Prix de l’énergie » de notre site propose une vision indicative ; votre décision doit reposer sur une analyse de factures.</em></p>
    `,
  },
];

export function getAllArticles(): BlogArticle[] {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}
