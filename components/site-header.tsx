"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/dictionaries";
import { localeSettings, localizePath, locales, type Locale } from "@/lib/i18n";
import { switchLocaleHref } from "@/lib/routes";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/** EN | ΕΛ: real links to the same page in each language, with the current one marked. */
function LanguageSwitcher({ locale, pathname, label, className }: { locale: Locale; pathname: string; label: string; className: string }) {
  return (
    <nav className={className} aria-label={label}>
      {locales.map((item, index) => (
        <span key={item} className="lang-switch-item">
          {index > 0 && <span className="lang-switch-divider" aria-hidden="true">|</span>}
          <Link
            href={switchLocaleHref(pathname, item)}
            hrefLang={localeSettings[item].htmlLang}
            lang={localeSettings[item].htmlLang}
            aria-label={localeSettings[item].name}
            aria-current={item === locale ? "true" : undefined}
            className={item === locale ? "is-active" : undefined}
            prefetch={false}
          >
            {localeSettings[item].label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

export function SiteHeader({ locale, copy }: { locale: Locale; copy: Dictionary["header"] }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const navigation = copy.nav.map((item) => ({ ...item, href: localizePath(locale, item.href) }));

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link className="wordmark" href={localizePath(locale, "/")} aria-label={copy.home}>
          VISION<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label={copy.primaryNav}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.href) ? "is-active" : undefined} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher locale={locale} pathname={pathname} label={copy.language} className="lang-switch lang-switch-header" />
        <Link className="button button-dark header-cta" href={localizePath(locale, "/free-audit")}>
          {copy.cta}
        </Link>
        <Sheet>
          <SheetTrigger className="mobile-menu-trigger" aria-label={copy.openMenu}>
            <Menu aria-hidden="true" />
          </SheetTrigger>
          <SheetContent className="mobile-sheet" side="right">
            <SheetHeader className="mobile-sheet-header">
              <SheetTitle className="wordmark">VISION<span>.</span></SheetTitle>
              <SheetDescription>{copy.mobileDescription}</SheetDescription>
            </SheetHeader>
            <nav className="mobile-nav" aria-label={copy.mobileNav}>
              {navigation.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href} className={isActive(item.href) ? "is-active" : undefined} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>
                </SheetClose>
              ))}
              <LanguageSwitcher locale={locale} pathname={pathname} label={copy.language} className="lang-switch lang-switch-mobile" />
              <SheetClose asChild>
                <Link className="button button-accent" href={localizePath(locale, "/free-audit")}>
                  {copy.mobileCta}
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
