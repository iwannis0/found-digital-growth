import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";

export function NotFoundContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).notFound;
  return <main className="state-page"><div><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}<span>.</span></h1><p>{t.body}</p><Link className="button button-dark button-large" href={localizePath(locale, "/")}><ArrowLeft />{t.back}</Link></div></main>;
}

export function LoadingContent({ locale }: { locale: Locale }) {
  return <main className="loading-page" aria-live="polite"><div><span /><p>{getDictionary(locale).loading}</p></div></main>;
}
