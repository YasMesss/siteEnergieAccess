# Déploiement Energie Access (VPS + PM2) — adaptez les variables à votre infrastructure.
$VPS_IP = "VOTRE_IP_VPS"
$VPS_KEY = "$env:USERPROFILE\.ssh\id_rsa"
$VPS_PATH = "/var/www/dev.energieaccess.fr"
$VPS_PM2_APP = "energieaccess-dev"

function Invoke-Remote {
    param([string]$RemoteCommand)
    & ssh -i $VPS_KEY -o ConnectTimeout=15 "deploy@$VPS_IP" $RemoteCommand
    return $LASTEXITCODE
}

Write-Host ""
Write-Host "=== DEPLOIEMENT Energie Access ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] Dépôt Git local..." -ForegroundColor Yellow
git add -A
$status = git status --porcelain
if ($status) {
    $commitMsg = Read-Host "Message du commit (ou Entrée pour 'update')"
    if ([string]::IsNullOrWhiteSpace($commitMsg)) { $commitMsg = "update" }
    git commit -m $commitMsg
    if ($LASTEXITCODE -ne 0) { Write-Host "Erreur commit." -ForegroundColor Red; exit 1 }
    git push origin main
    if ($LASTEXITCODE -ne 0) { Write-Host "Erreur push." -ForegroundColor Red; exit 1 }
} else {
    Write-Host "Aucun changement local." -ForegroundColor DarkYellow
}

Write-Host "[2/4] Sync serveur..." -ForegroundColor Yellow
$code = Invoke-Remote "cd $VPS_PATH && git fetch origin main && git reset --hard origin/main"
if ($code -ne 0) { Write-Host "Erreur git sur VPS." -ForegroundColor Red; exit 1 }

Write-Host "[3/4] npm ci + build..." -ForegroundColor Yellow
$code = Invoke-Remote "cd $VPS_PATH && npm ci && set -a && . ./.env 2>/dev/null; set +a && npm run build"
if ($code -ne 0) { Write-Host "Erreur build." -ForegroundColor Red; exit 1 }

Write-Host "[4/4] PM2 restart..." -ForegroundColor Yellow
$code = Invoke-Remote "pm2 restart $VPS_PM2_APP --update-env && pm2 save"
if ($code -ne 0) { Write-Host "Erreur PM2." -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "=== TERMINÉ ===" -ForegroundColor Cyan
Write-Host "Staging : https://dev.energieaccess.fr" -ForegroundColor Green
Write-Host ""
