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
Website projects start at EUR 550 setup. Optional Website Care (hosting, updates, monitoring) starts at EUR 49 per month. Full pricing: ${siteConfig.url}/pricing

## Key pages
- Home: ${siteConfig.url}
- Services: ${siteConfig.url}/services
- Work / portfolio: ${siteConfig.url}/work
- Pricing: ${siteConfig.url}/pricing
- Free website audit: ${siteConfig.url}/free-audit
- FAQ: ${siteConfig.url}/faq
- Contact: ${siteConfig.url}/contact

## Contact
Email: ${siteConfig.email}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
