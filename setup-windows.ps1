$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js was not found. Install Node.js 22.13 or later from https://nodejs.org/ and run this script again." -ForegroundColor Red
  exit 1
}

$nodeVersion = [version](node -p "process.versions.node")
$minimumVersion = [version]"22.13.0"
if ($nodeVersion -lt $minimumVersion) {
  Write-Host "Node.js $nodeVersion is installed, but this project requires version 22.13 or later." -ForegroundColor Red
  exit 1
}

if (-not (Test-Path ".env.local")) {
  Copy-Item ".env.example" ".env.local"
  Write-Host "Created .env.local from .env.example."
}

Write-Host "Installing project dependencies..." -ForegroundColor Cyan
npm ci
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Creating the local database..." -ForegroundColor Cyan
npm run db:migrate
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Adding the initial database settings..." -ForegroundColor Cyan
npm run db:seed
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Setup completed successfully." -ForegroundColor Green
Write-Host "Run: npm run dev"
Write-Host "Then open the local URL shown in the terminal, normally http://localhost:5173"
