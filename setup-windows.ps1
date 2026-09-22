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

$envContent = Get-Content ".env.local" -Raw
if ($envContent -match "(?m)^DATABASE_URL=.+") {
  Write-Host "Applying the database schema to Supabase..." -ForegroundColor Cyan
  npm run db:migrate
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

  Write-Host "Adding the initial database settings..." -ForegroundColor Cyan
  npm run db:seed
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
} else {
  Write-Host ""
  Write-Host "Skipping database setup: DATABASE_URL is not set in .env.local." -ForegroundColor Yellow
  Write-Host "Create a Supabase project, copy its Postgres connection string into"
  Write-Host "DATABASE_URL in .env.local, then run: npm run db:migrate && npm run db:seed"
}

Write-Host ""
Write-Host "Setup completed successfully." -ForegroundColor Green
Write-Host "Run: npm run dev"
Write-Host "Then open the local URL shown in the terminal, normally http://localhost:3000"
