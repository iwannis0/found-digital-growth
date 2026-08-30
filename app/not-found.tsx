import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() { return <main className="state-page"><div><p className="eyebrow">404 / Not found</p><h1>This page has not been found<span>.</span></h1><p>The address may have changed, or the page may no longer exist.</p><Link className="button button-dark button-large" href="/"><ArrowLeft />Back to FOUND.</Link></div></main>; }
