"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { navigation, siteConfig } from "@/lib/site-config";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link className="wordmark" href="/" aria-label={`${siteConfig.name} home`}>
          FOUND<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="button button-dark header-cta" href="/free-audit">
          Get a Free Audit
        </Link>
        <Sheet>
          <SheetTrigger className="mobile-menu-trigger" aria-label="Open navigation">
            <Menu aria-hidden="true" />
          </SheetTrigger>
          <SheetContent className="mobile-sheet" side="right">
            <SheetHeader className="mobile-sheet-header">
              <SheetTitle className="wordmark">FOUND<span>.</span></SheetTitle>
              <SheetDescription>Premium digital growth for Cyprus businesses.</SheetDescription>
            </SheetHeader>
            <nav className="mobile-nav" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link className="button button-accent" href="/free-audit">
                  Get a Free Audit
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
