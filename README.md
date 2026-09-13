# FOUND. Local Digital Growth Company

Production website and lead-management application for FOUND., a Cyprus-based local digital growth company. It includes the public marketing site, website-audit and contact conversion flows, persistent lead records, a protected admin area, email and webhook integrations, consent-aware analytics, SEO routes and structured data.

## Stack

- Next.js App Router through the Sites Vinext runtime
- React 19, TypeScript and Tailwind CSS
- Cloudflare D1 with Drizzle ORM and versioned migrations
- Zod validation on every public and admin write route
- Resend REST API for notification and confirmation email
- Cloudflare Turnstile, honeypot and server-side rate limiting
- ChatGPT sign-in for protected admin routes
- Google Analytics 4 after explicit analytics consent

## Local setup

Requirements: Node.js 22.13 or later and npm.

For Windows and Visual Studio Code, follow `SETUP-WINDOWS.md`. The included
`setup-windows.ps1` script installs dependencies, creates the local environment
file, applies the local database migration and inserts the initial settings.

1. Copy `.env.example` to `.env.local` and fill the values needed for local testing.
2. Run `npm ci`.
3. Run `npm run db:generate` after schema changes.
4. Run `npm run db:migrate` to apply D1 migrations locally.
5. Run `npm run dev` and open the local address printed by Vite.

## Commands

- `npm run dev`: local development server
- `npm run build`: production Sites build
- `npm run start`: run a built Vinext application
- `npm run lint`: ESLint
- `npm run typecheck`: strict TypeScript checking
- `npm test`: production build plus automated tests
- `npm run db:generate`: generate a migration from `db/schema.ts`
- `npm run db:migrate`: apply migrations to the local D1 database
- `npm run db:seed`: apply the optional local seed file when present
- `npm run db:studio`: open Drizzle Studio when the environment supports it

## Environment configuration

Public settings use `NEXT_PUBLIC_` only when the browser needs them. Secrets stay server-side.

- `NEXT_PUBLIC_SITE_URL`: canonical production origin
- `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_WHATSAPP_NUMBER`: central contact details
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: GA4 measurement ID
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile
- `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`: Resend email delivery
- `LEAD_WEBHOOK_URL`: optional n8n, Make, Zapier, HubSpot or custom CRM endpoint
- `ADMIN_EMAILS`: comma-separated ChatGPT account emails allowed into `/admin`
- optional Instagram and LinkedIn URLs

Set `ADMIN_EMAILS` to the two administrators' sign-in emails, separated by a comma. An empty list denies everyone, including local development users. Both administrators have the same permissions. Email matching ignores case and surrounding spaces.

Production authentication currently requires the Sites authentication gateway to supply trusted identity headers and strip client-supplied identity headers. Do not expose this application directly on another host without replacing that authentication boundary. The email allowlist authorizes an authenticated identity; it does not verify the identity itself.

## Database and admin

The Sites platform provisions the production D1 database through the logical `DB` binding in `.openai/hosting.json`. The schema stores leads, audit requests, newsletter subscribers and settings. Generated SQL in `drizzle/` is applied during publication.

The admin area uses ChatGPT sign-in and a server-side email allowlist. It includes dashboard metrics, local search and status filters, lead details, pipeline status, HOT/WARM/COLD priority, estimated value, notes, deletion, CSV export and manual audit scoring out of 100.

## Email, webhooks and spam protection

Create and verify a sending domain in Resend, then configure `RESEND_API_KEY`, `EMAIL_FROM` and `EMAIL_TO`. A successful public submission is written to D1 first. Email or webhook failure is isolated so a saved enquiry is not lost.

Create a Turnstile widget for the production hostname and configure both keys. Without keys, verification is intentionally bypassed for local development. The hidden honeypot and rate limiter remain active.

## Analytics and consent

GA4 loads only after the visitor accepts analytics. The central event utility supports contact, audit, service, project, phone, WhatsApp, booking and pricing events. UTM source, medium, campaign, content and term values are retained for the session and saved with enquiries.

## Production checklist

1. Replace placeholder phone and email details.
2. Set the final canonical domain.
3. Configure `ADMIN_EMAILS`.
4. Verify the Resend sending domain.
5. Create production Turnstile keys.
6. Add the GA4 measurement ID if analytics is required.
7. Add an optional CRM webhook.
8. Have the Privacy Policy, Terms and client agreement reviewed by a Cyprus-qualified legal professional.
9. Confirm real social URLs before setting them.
10. Test a contact enquiry, audit request, confirmation email, admin update and CSV export after launch.

The three portfolio items are intentionally labelled Concept Project and do not claim paid client work, testimonials, results or commercial relationships.
