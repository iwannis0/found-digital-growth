"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

const columns = [
  {
    title: "Navigate",
    links: [
      ["Services", "/services"],
      ["Work", "/work"],
      ["Pricing", "/pricing"],
      ["Free Audit", "/free-audit"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Services",
    links: [
      ["Website Design & Development", "/services/web-design"],
      ["Local SEO", "/services/local-seo"],
      ["Google Business", "/services/google-business"],
      ["Website Care", "/services/website-care"],
      ["Analytics & Tracking", "/services/analytics"],
      ["Conversion Design", "/services/conversion-design"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Cookie Settings", "#cookie-settings"],
    ],
  },
] as const;

// lucide-react no longer ships brand icons, so these two are inline.
function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V11H5.5v4H8v6h4v-6h3l.5-4H12V7.5A1.5 1.5 0 0 1 13.5 6H15V3Z" />
    </svg>
  );
}

export function SiteFooter() {
  function openCookieSettings(
    event: React.MouseEvent<HTMLAnchorElement>
  ) {
    if (
      event.currentTarget.getAttribute("href") ===
      "#cookie-settings"
    ) {
      event.preventDefault();
      window.dispatchEvent(
        new CustomEvent("site:cookie-settings")
      );
    }
  }

  return (
    <footer className="site-footer">
      <div className="site-container footer-top">
        <div className="footer-statement">
          <Link
            className="wordmark wordmark-light"
            href="/"
          >
            VISION<span>.</span>
          </Link>

          <p>{siteConfig.tagline}</p>

          <Link
            href="/free-audit"
            className="footer-big-link"
          >
            Start with a free audit
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="footer-columns">
          {columns.map((column) => (
            <div key={column.title}>
              <h2>{column.title}</h2>

              {column.links.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={openCookieSettings}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}

          <div className="footer-contact">
            <h2>Contact</h2>

            <a
              href={`mailto:${siteConfig.email}`}
              data-track="email_click"
              data-track-location="footer"
            >
              <Mail aria-hidden="true" />
              {siteConfig.email}
            </a>

            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              data-track="phone_click"
              data-track-location="footer"
            >
              <Phone aria-hidden="true" />
              {siteConfig.phone}
            </a>

            <div className="footer-socials">
              {siteConfig.socials.instagram && (
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VISION. on Instagram"
                  data-track="social_click"
                  data-track-label="instagram"
                >
                  <InstagramMark />
                </a>
              )}

              {siteConfig.socials.facebook && (
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VISION. on Facebook"
                  data-track="social_click"
                  data-track-label="facebook"
                >
                  <FacebookMark />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="site-container footer-bottom">
        <p>
          © {new Date().getFullYear()} VISION. Cyprus.
        </p>

        <div className="footer-bottom-end">
          <p>
            Websites and digital growth for Cyprus businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}