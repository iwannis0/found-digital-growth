import { notFound } from "next/navigation";

// Any /gr/... path without a page renders the Greek 404 (app/(el)/gr/not-found.tsx).
export default function GreekMissingPage() {
  notFound();
}
