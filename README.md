# Energie Access — site vitrine (Next.js 15)

Courtier en énergie B2B : électricité, gaz, blog, page prix marché (indicatif), formulaires contact / devis / rappel.

## Prérequis

- Node.js 20+
- `msmtp` configuré sur le VPS pour l’envoi des mails (voir `src/lib/mailer.ts`), ou logs en local si absent.

## Développement

```bash
npm install
cp .env.example .env.local
# Éditer .env.local (NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_GA_ID, etc.)
npm run dev
```

## Build production

```bash
npm run build
npm start
```

## Déploiement staging (`dev.energieaccess.fr`)

1. Configurer Nginx : copier [nginx/dev.energieaccess.fr.conf](nginx/dev.energieaccess.fr.conf) vers le VPS, ajuster le port `proxy_pass` (PM2).
2. PM2 : `pm2 start npm --name energieaccess-dev -- start` (depuis le répertoire du projet, après `npm run build`).
3. Adapter et exécuter [deploy.ps1](deploy.ps1) (IP, clé SSH, chemin, nom d’app PM2).

### Bascule DNS production (`energieaccess.fr`)

1. Reprendre la même conf Nginx en changeant `server_name` et le certificat Let’s Encrypt.
2. Mettre à jour `NEXT_PUBLIC_SITE_URL` et redéployer.
3. Vérifier les redirections depuis l’ancien site (Wix / WordPress) si besoin.

## Données « prix énergie »

Fichier [data/energy-prices.json](data/energy-prices.json) : séries indicatives. À brancher ultérieurement sur des flux open data (CRE, RTE, ENTSO-E) si vous disposez d’une clé API.

## Médias

Voir [public/MEDIA_CREDITS.md](public/MEDIA_CREDITS.md) et [media-plan.md](media-plan.md) pour le sourcing Unsplash / illustrations.
