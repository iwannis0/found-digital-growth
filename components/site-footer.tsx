"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const columns = [
  {
    title: "Navigate",
    links: [["Services", "/services"], ["Work", "/work"], ["Pricing", "/pricing"], ["Free Audit", "/free-audit"], ["Contact", "/contact"]],
  },
  {
    title: "Services",
    links: [["Website Design & Development", "/services/web-design"], ["Local SEO", "/services/local-seo"], ["Google Business", "/services/google-business"], ["Website Care", "/services/website-care"], ["Analytics & Tracking", "/services/analytics"], ["Conversion Design", "/services/conversion-design"]],
  },
  {
    title: "Legal",
    links: [["Privacy", "/privacy"], ["Terms", "/terms"], ["Cookie Settings", "#cookie-settings"]],
  },
] as const;

export function SiteFooter() {
  function openCookieSettings(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.currentTarget.getAttribute("href") === "#cookie-settings") {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("found:cookie-settings"));
    }
  }

  return (
    <footer className="site-footer">
      <div className="site-container footer-top">
        <div className="footer-statement">
          <Link className="wordmark wordmark-light" href="/">FOUND<span>.</span></Link>
          <p>{siteConfig.tagline}</p>
          <Link href="/free-audit" className="footer-big-link">
            Start with a free audit <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="footer-columns">
          {columns.map((column) => (
            <div key={column.title}>
              <h2>{column.title}</h2>
              {column.links.map(([label, href]) => (
                <Link key={href} href={href} onClick={openCookieSettings}>{label}</Link>
              ))}
            </div>
          ))}
          <div className="footer-contact">
            <h2>Contact</h2>
            <a href={`mailto:${siteConfig.email}`}><Mail aria-hidden="true" />{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" />{siteConfig.phone}</a>
          </div>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <p>© {new Date().getFullYear()} FOUND. Cyprus.</p>
        <p>Websites are only the beginning.</p>
      </div>
    </footer>
  );
}
