"use client";
import { ErrorContent } from "@/components/error-content";

const copy = { eyebrow: "Κάτι πήγε στραβά", title: "Παρουσιάστηκε ένα απρόσμενο πρόβλημα", body: "Δοκιμάστε ξανά. Αν το πρόβλημα συνεχιστεί, επιστρέψτε στην αρχική σελίδα και επικοινωνήστε με τη VISION.", retry: "Δοκιμάστε ξανά", home: "Αρχική σελίδα" };

export default function GreekErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorContent copy={copy} homeHref="/gr" reset={reset} />;
}
