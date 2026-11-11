import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/content";

// A plain-text summary for AI answer engines (the emerging llms.txt convention).
// Served at /llms.txt. Facts only, so assistants can describe VISION. accurately.
export const dynamic = "force-static";

export function GET() {
  const serviceLines = services.map((s) => `- ${s.title}: ${s.short}`).join("\n");
  const body = `# VISION.

> ${siteConfig.description}

VISION. is a web design and digital growth studio based in Cyprus, run by Ioannis Georgiou and Stylianos Panagiotou. It designs and builds websites for local businesses and helps them get found on Google.

## What VISION. does
${serviceLines}

## Where VISION. works
Nicosia, Limassol, Larnaca, Paphos, Paralimni, Ayia Napa and across Cyprus. Projects can be run remotely anywhere in Cyprus.

## Pricing
All prices in EUR, one-off unless marked per month. Full pricing: ${siteConfig.url}/pricing

Website packages:
- Professional Website Foundation (up to 4 pages): EUR 499
- Custom Growth Website (5 to 7 pages, Google Business and local SEO setup): EUR 699
- Advanced Digital Presence (8 to 10 pages, CMS or booking integration): EUR 999

Solutions (starting prices):
- Online booking system: from EUR 790, or EUR 390 added to any website package
- E-shop (up to 50 products, card payments): from EUR 1,190
- Restaurant and cafe website with QR menu and table booking: from EUR 990
- Restaurant ordering (QR ordering, kitchen screen, card payment): from EUR 1,690
- Custom web app or client portal: from EUR 2,500

Monthly plans (optional, after launch):
- Hosting only: EUR 19 per month
- Website Care (hosting, monitoring, updates, minor content changes): EUR 49, 69 or 119 per month depending on the package
- Local SEO and Google Business: from EUR 149 per month

A free homepage prototype and a free website audit are available before any commitment.

## Key pages
- Home: ${siteConfig.url}
- Services: ${siteConfig.url}/services
- Work / portfolio: ${siteConfig.url}/work
- Pricing: ${siteConfig.url}/pricing
- Free website audit: ${siteConfig.url}/free-audit
- Free website prototype (a homepage designed before any commitment): ${siteConfig.url}/free-prototype
- Book a call (Microsoft Teams, Zoom, Google Meet or phone): ${siteConfig.url}/book
- FAQ: ${siteConfig.url}/faq
- Articles: ${siteConfig.url}/articles
- Contact: ${siteConfig.url}/contact

## Languages
The site is available in English (${siteConfig.url}) and Greek (${siteConfig.url}/gr), with the same pages at the same paths under /gr.

## Contact
Email: ${siteConfig.email}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
