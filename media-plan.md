# Plan médias — Energie Access

Les visuels intégrés en **v1** utilisent principalement **Unsplash** (URLs `images.unsplash.com`, configurées dans `next.config.ts`).

## Hero & clés de page

| Section | Mot-clé Unsplash (recherche) | Usage |
|---------|------------------------------|--------|
| Accueil hero droite | `wind turbines landscape` | Image principale |
| À propos | `marseille coast` | Bannière |
| Services | `business meeting` | Bannière |
| Prix énergie | `stock chart` | Bannière |
| Contact | `mediterranean sea` | Bannière |
| Blog (par article) | Voir `src/lib/blog-data.ts` champ `image` | Couverture |

## Vidéos boucle (optionnel — v1.1)

Télécharger sur **Coverr** ou **Mixkit** : `wind turbines aerial`, `solar farm drone`. Compresser (ffmpeg) & placer dans `public/videos/`, puis ajouter une balise `<video>` dans le hero.

## Check-list avant production

- [ ] Remplacer les URLs distantes par des fichiers locaux optimisés (WebP/AVIF) si politique de déploiement sans CDN externe.
- [ ] Ajouter photos réelles équipe / bureaux si disponibles.
- [ ] Valider l’usage des logos fournisseurs avec le service juridique.
