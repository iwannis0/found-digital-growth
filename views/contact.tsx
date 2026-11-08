import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageMotion } from "@/components/page-motion";
import { StartOptions } from "@/components/start-options";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const en = {
  metaTitle: "Contact: Web Design & SEO in Cyprus",
  metaDescription: "Tell us what your business needs. Call, email or send an enquiry about website design, local SEO, Google Business Profile or Website Care in Cyprus.",
  absoluteTitle: false,
  eyebrow: "Contact VISION.",
  title: "Tell us what the business needs next",
  lead: "Share the current position, the service you are considering and what a successful result would look like.",
  location: "Cyprus",
  nextTitle: "What happens next?",
  nextBody: "We review the details and usually reply within two working days. If a call is useful, we will arrange one.",
  startTitle: "Or start another way",
};

const el: typeof en = {
  metaTitle: "Επικοινωνία | Κατασκευή Ιστοσελίδων | VISION.",
  metaDescription: "Επικοινωνήστε με τη VISION. για κατασκευή ιστοσελίδας, SEO ή άλλες ψηφιακές υπηρεσίες. Συζητήστε μαζί μας τις ανάγκες της επιχείρησής σας.",
  absoluteTitle: true,
  eyebrow: "Επικοινωνία με τη VISION.",
  title: "Πείτε μας τι χρειάζεται η επιχείρησή σας",
  lead: "Πείτε μας πού βρίσκεστε σήμερα, ποια υπηρεσία σκέφτεστε και πώς θα ήταν για εσάς ένα επιτυχημένο αποτέλεσμα.",
  location: "Κύπρος",
  nextTitle: "Τι ακολουθεί;",
  nextBody: "Εξετάζουμε τα στοιχεία σας και συνήθως απαντάμε μέσα σε δύο εργάσιμες ημέρες. Αν βοηθά μια κλήση, θα την κανονίσουμε.",
  startTitle: "Ή ξεκινήστε με άλλον τρόπο",
};

const copy = { en, el };

export function contactMetadata(locale: Locale) {
  const t = copy[locale];
  return pageMetadata({ locale, path: "/contact", title: t.metaTitle, description: t.metaDescription, absoluteTitle: t.absoluteTitle });
}

export type ContactSearchParams = Promise<{ package?: string | string[]; service?: string | string[] }>;

export async function ContactView({ locale, searchParams }: { locale: Locale; searchParams: ContactSearchParams }) {
  const t = copy[locale];
  const dictionary = getDictionary(locale);
  const params = await searchParams;
  const initialPackage = typeof params.package === "string" ? params.package : "";
  const initialService = typeof params.service === "string" ? params.service : "";

  return (
    <main className="contact-page motion-page">
      <PageMotion />

      <section className="contact-shell">
        <div className="site-container contact-grid">
          <div className="contact-intro">
            <p className="eyebrow">{t.eyebrow}</p>

            <h1>
              {t.title}
              <span>.</span>
            </h1>

            <p>{t.lead}</p>

            <div className="contact-details">
              <a
                href={`mailto:${siteConfig.email}`}
                data-track="email_click"
                data-track-location="contact_page"
              >
                <Mail />
                {siteConfig.email}
              </a>

              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                data-track="phone_click"
                data-track-location="contact_page"
              >
                <Phone />
                {siteConfig.phone}
              </a>

              <span>
                <MapPin />
                {t.location}
              </span>
            </div>

            <div className="contact-expectation">
              <strong>{t.nextTitle}</strong>

              <p>{t.nextBody}</p>
            </div>

            <div className="contact-start">
              <strong>{t.startTitle}</strong>

              <StartOptions locale={locale} copy={dictionary.header.start} />
            </div>
          </div>

          <div className="form-panel contact-form-panel">
            <ContactForm
              initialPackage={initialPackage}
              initialService={initialService}
              locale={locale}
              copy={dictionary.contactForm}
              formCopy={dictionary.forms}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
