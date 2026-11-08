import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const devEval = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${devEval} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

// Search engines should see one address for the site. Preview deployments use their own
// hostnames, so matching these two exact hosts leaves previews untouched.
const duplicateHosts = [
  "www.vision.cy",
  "found-digital-growth.vercel.app",
];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },

  experimental: {
    // English (app/(en)) and Greek (app/(el)) have separate root layouts, so URLs that match
    // no route at all are answered by app/global-not-found.tsx.
    globalNotFound: true,
  },

  async redirects() {
    // The free website preview page was briefly live; its offer now lives in the free audit.
    const retiredPages = [{ source: "/free-website-preview", destination: "/free-audit", permanent: true }];
    // Earlier service URLs. They used to render a duplicate page with a canonical; a redirect is cleaner.
    const renamedServices = [
      { source: "/services/maintenance", destination: "/services/website-care", permanent: true },
      { source: "/services/conversion-optimisation", destination: "/services/conversion-design", permanent: true },
    ];

    return [...retiredPages, ...renamedServices, ...duplicateHosts.map((host) => ({
      source: "/:path*",
      has: [
        {
          type: "host" as const,
          value: host,
        },
      ],
      destination: "https://vision.cy/:path*",
      permanent: true,
    }))];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000",
          },
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
};

export default withBotId(nextConfig);