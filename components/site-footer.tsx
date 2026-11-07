"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

import type { Dictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";


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

export function SiteFooter({ locale, copy, tagline }: { locale: Locale; copy: Dictionary["footer"]; tagline: string }) {
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
            href={localizePath(locale, "/")}
          >
            VISION<span>.</span>
          </Link>

          <p>{tagline}</p>

          <Link
            href={localizePath(locale, "/free-audit")}
            className="footer-big-link"
          >
            {copy.startAudit}
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="footer-columns">
          {copy.columns.map((column) => (
            <div key={column.title}>
              <h2>{column.title}</h2>

              {column.links.map(([label, href]) => (
                <Link
                  key={href}
                  href={localizePath(locale, href)}
                  onClick={openCookieSettings}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}

          <div className="footer-contact">
            <h2>{copy.contact}</h2>

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
                  aria-label={copy.instagram}
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
                  aria-label={copy.facebook}
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
          © {new Date().getFullYear()} {copy.copyright}
        </p>

        <div className="footer-bottom-end">
          <p>
            {copy.strapline}
          </p>
        </div>
      </div>
    </footer>
  );
}