"use client";
import Link from "next/link";

export function ErrorContent({ copy, homeHref, reset }: { copy: { eyebrow: string; title: string; body: string; retry: string; home: string }; homeHref: string; reset: () => void }) {
  return <main className="state-page"><div><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}<span>.</span></h1><p>{copy.body}</p><div className="state-actions"><button className="button button-accent button-large" onClick={reset}>{copy.retry}</button><Link className="button button-outline button-large" href={homeHref}>{copy.home}</Link></div></div></main>;
}
