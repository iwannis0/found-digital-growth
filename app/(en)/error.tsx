"use client";
import { ErrorContent } from "@/components/error-content";

const copy = { eyebrow: "Something went wrong", title: "We hit an unexpected problem", body: "Please try again. If the problem continues, return to the homepage and contact VISION.", retry: "Try again", home: "Return home" };

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorContent copy={copy} homeHref="/" reset={reset} />;
}
