import type { ReactNode } from "react";
import Link from "next/link";

export type Article = {
  slug: string;
  title: string;
  // Shorter title for the browser tab and search result; the site template appends "| VISION.".
  seoTitle: string;
  description: string;
  eyebrow: string;
  published: string;
  updated: string;
  readingMinutes: number;
  body: ReactNode;
  faqs: readonly (readonly [string, string])[];
};

// Newest first. To add an article, add an entry here: the index, sitemap and article page pick it up.
export const articles: Article[] = [
  {
    slug: "website-cost-cyprus",
    title: "How much does a website cost in Cyprus in 2026?",
    seoTitle: "How Much Does a Website Cost in Cyprus? (2026 Guide)",
    description: "What a small business website costs in Cyprus in 2026, what changes the price, the running costs after launch, and how to see your design before you pay.",
    eyebrow: "Website costs",
    published: "2026-10-13",
    updated: "2026-10-13",
    readingMinutes: 6,
    body: (
      <>
        <p className="article-lead">
          For most small businesses in Cyprus, a professionally built website costs somewhere between a few hundred and a few thousand euros to set up, plus a monthly amount for hosting and care. Where you land depends far more on what the website has to do than on how many pages it has.
        </p>
        <p>
          This guide explains what drives the price, what you keep paying after launch, and the questions worth asking before you sign anything. We use our own packages as a reference point, because published prices are rare and it is easier to compare against real numbers.
        </p>

        <h2>The short answer</h2>
        <ul>
          <li><strong>A simple, professional site</strong> (up to four pages, contact form, map, click-to-call): from around €600.</li>
          <li><strong>A custom site built to bring enquiries</strong> (five to seven pages, Google Business setup, local SEO, tracking): around €900 to €1,500.</li>
          <li><strong>Larger sites</strong> with booking, several languages or online sales: usually €1,500 and up, quoted on scope.</li>
          <li><strong>Running costs</strong>: a domain each year, plus hosting and maintenance, often €30 to €120 a month if someone manages it for you.</li>
        </ul>

        <h2>What changes the price</h2>
        <h3>1. Custom design or a template</h3>
        <p>
          A template with your logo dropped in is quick and cheap, and it looks like it. A design built around your services, your customers and the one action you want them to take costs more, but it is the part that decides whether visitors call you or the next result on Google.
        </p>
        <h3>2. Number of pages</h3>
        <p>
          Each service, location or product that deserves its own page adds design and content work. It also helps search: a page per service gives Google something specific to rank for each search.
        </p>
        <h3>3. Content and photos</h3>
        <p>
          Writing clear text and finding good photos is often the slowest part of a project. If you supply them, the price stays lower. If the agency writes copy or arranges a photo shoot, expect that to be quoted separately.
        </p>
        <h3>4. Features</h3>
        <p>
          Online booking, a second language, e-commerce, CRM connections and automation are where prices rise fastest. Ask for each one to be priced on its own so you can decide what is worth it now and what can wait.
        </p>
        <h3>5. Search and tracking setup</h3>
        <p>
          A site nobody finds does not bring customers. Good builds include the basics: page titles, a sitemap, structured data, a Google Business Profile that matches the site, and analytics that show calls and enquiries, not just visits.
        </p>

        <h2>Our prices, as a reference</h2>
        <div className="article-table-wrap">
          <table className="article-table">
            <thead>
              <tr><th scope="col">Package</th><th scope="col">Setup</th><th scope="col">Care / month</th><th scope="col">Good for</th></tr>
            </thead>
            <tbody>
              <tr><th scope="row">Professional Website Foundation</th><td>€599</td><td>€49</td><td>Up to 4 pages, a credible online presence</td></tr>
              <tr><th scope="row">Custom Growth Website</th><td>€899</td><td>€69</td><td>5 to 7 pages, local SEO, Google Business, tracking</td></tr>
              <tr><th scope="row">Advanced Digital Presence</th><td>€1,399</td><td>€119</td><td>Larger sites, more functionality, priority care</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Website Care is optional. Payment is 50% to begin and 50% before launch. The full breakdown of what each package includes is on our <Link href="/pricing">pricing page</Link>.
        </p>

        <h2>What you keep paying after launch</h2>
        <ul>
          <li><strong>Domain</strong>: renewed every year. Make sure it is registered in your name, not the agency&apos;s.</li>
          <li><strong>Hosting and SSL</strong>: where the site lives and the padlock in the browser.</li>
          <li><strong>Maintenance</strong>: updates, backups, monitoring and small text or photo changes.</li>
        </ul>
        <p>
          You can manage these yourself, but most business owners would rather not be the person who notices the site is down on a Saturday.
        </p>

        <h2>What about free website builders?</h2>
        <p>
          Wix, Squarespace and Google&apos;s own tools are fine if you have time, an eye for design and a simple need. The monthly plan is not free once you want your own domain and no adverts, and the time it takes to get a good result is the real cost. If the website is meant to bring in customers, a professional build usually pays for itself faster.
        </p>

        <h2>Questions to ask before you pay</h2>
        <ol>
          <li>Who owns the website and the domain once it is paid for?</li>
          <li>How many design revision rounds are included?</li>
          <li>What exactly is included in the monthly fee, and can I cancel it?</li>
          <li>Will the site be set up for Google search and for tracking calls and enquiries?</li>
          <li>Can I see the design before I commit?</li>
        </ol>

        <h2>See your website before you pay</h2>
        <p>
          The last question is the one most agencies cannot answer with a yes. We can: through our <Link href="/free-website-preview">free website preview</Link>, we design the homepage of your new website at no cost, on desktop and mobile. If you like it, we quote the full site. If not, you owe nothing.
        </p>
      </>
    ),
    faqs: [
      ["How much does a small business website cost in Cyprus?", "Most professionally built small business websites in Cyprus cost from around €600 to €1,500 to set up, with larger or more complex sites costing more. Hosting and maintenance are usually charged monthly. VISION. packages start at €599 setup, with optional Website Care from €49 a month."],
      ["Are there monthly costs after the website is built?", "Yes. You will renew the domain every year and pay for hosting. Many businesses also pay a monthly fee for maintenance, backups, security and small updates. At VISION. this is optional Website Care, from €49 a month."],
      ["Can I see the website design before paying?", "With VISION., yes. Our free website preview gives you a designed homepage for your business on desktop and mobile, with no obligation to continue."],
      ["Who owns the website once it is built?", "You should. Once the project is paid in full, the client owns the website content and agreed deliverables, and the domain should be registered in the client's name."],
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function formatArticleDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
