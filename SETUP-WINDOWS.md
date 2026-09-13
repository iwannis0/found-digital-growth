# Run FOUND. in Visual Studio Code on Windows

## 1. Install the requirements

Install the following programs if they are not already available:

- Visual Studio Code: https://code.visualstudio.com/
- Node.js 22.13 or later: https://nodejs.org/

Restart Visual Studio Code after installing Node.js.

## 2. Open the project

1. Extract the ZIP file.
2. Open Visual Studio Code.
3. Select **File > Open Folder**.
4. Select the extracted `found-digital-growth-source` folder.
5. Select **Terminal > New Terminal**.

## 3. Prepare the project

Run this command in the PowerShell terminal:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup-windows.ps1
```

The setup script will:

- verify the installed Node.js version;
- create `.env.local` from `.env.example`;
- install the required packages;
- create the local D1 database;
- apply the database schema from `drizzle` and initial settings.

## 4. Start the website

```powershell
npm run dev
```

Open the local address shown in the terminal. It is normally:

```text
http://localhost:5173
```

Press `Ctrl+C` in the terminal to stop the website.

## Important folders

- `app/page.tsx`: home page
- `app/globals.css`: global design and styling
- `app/services`: service pages
- `app/work`: portfolio pages
- `app/pricing`: pricing page
- `app/contact`: contact page
- `app/api`: backend API routes
- `app/admin`: admin dashboard
- `components`: reusable interface components
- `db`: database schema and connection
- `drizzle`: database migrations
- `public`: images and public assets

## Local admin area

Open `http://localhost:5173/admin`. Local development uses the
`LOCAL_ADMIN_EMAIL` value in `.env.local`. This local shortcut works only while
`NODE_ENV` is `development` and does not replace production authentication.
Set it explicitly to one of the emails listed in `ADMIN_EMAILS`. A blank
`ADMIN_EMAILS` denies access to everyone. Do not expose the development server
to untrusted users while the local shortcut is enabled.

## Environment settings

Edit `.env.local` to change the contact details or connect optional services.
The website works locally without Resend, Turnstile, GA4 or a CRM webhook.

## Useful commands

```powershell
npm run dev
npm run typecheck
npm run lint
npm run build
npm run db:migrate
npm run db:seed
```

If PowerShell reports that `npm` is not recognized, close and reopen Visual
Studio Code after installing Node.js.
