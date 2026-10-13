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
  // Every factual claim in an article should trace back to one of these.
  sources: readonly (readonly [string, string])[];
  // The call to action after the article. Defaults to the free website audit.
  cta?: ArticleCta;
};

export type ArticleCta = { eyebrow: string; title: string; body: string; label: string; href: string };

export const defaultArticleCta: ArticleCta = {
  eyebrow: "Free website audit",
  title: "Find out what your website needs next.",
  body: "We review your website's design, mobile experience, speed, SEO and Google presence, and send clear priorities by email within two working days. Free, with no obligation.",
  label: "Get a Free Website Audit",
  href: "/free-audit",
};

const contactCta: ArticleCta = {
  eyebrow: "Starting from nothing?",
  title: "Tell us about the business.",
  body: "We help Cyprus businesses go from a social page, or nothing at all, to a website that brings enquiries. Tell us what you do and we will suggest the right starting point.",
  label: "Talk to us",
  href: "/contact",
};

// Newest first. To add an article, add an entry here: the index, sitemap and article page pick it up.
export const articles: Article[] = [
  {
    slug: "website-vs-social-media",
    title: "8 in 10 Cypriot businesses use social media. Fewer than 7 in 10 have a website.",
    seoTitle: "Website or Social Media? What the Data Says for Cyprus Businesses",
    description: "Cyprus businesses lead the EU on social media use but lag on websites. What the Eurostat and DataReportal figures say, and why the gap costs customers.",
    eyebrow: "Data & trends",
    published: "2026-10-13",
    updated: "2026-10-13",
    readingMinutes: 5,
    body: (
      <>
        <p className="article-lead">
          Cypriot businesses are among the most active on social media in Europe. According to Eurostat, 79.9% of enterprises in Cyprus used social media in 2023, against an EU average of 60.9%. In the same year, only 68.8% had a website, down from 74.7% in 2016.
        </p>
        <p>
          In other words, a growing share of Cypriot businesses relies on Facebook and Instagram as their main presence online. That works up to a point. The figures suggest where it stops working.
        </p>

        <h2>The audience is online, but not all on social media</h2>
        <p>
          DataReportal&apos;s Digital 2026 report puts internet use in Cyprus at 94.7% of the population at the end of 2025, about 1.3 million people. Social media is far less universal: Meta&apos;s own advertising tools reached about 746,000 people on Facebook and 760,000 on Instagram, a little over half the population.
        </p>
        <p>
          Put simply, close to everyone in Cyprus is online, but a business that only exists on Meta&apos;s platforms is invisible to a large part of that audience, and to everyone who starts with a search instead of a feed.
        </p>

        <h2>Social reach is falling, and it is not yours</h2>
        <p>
          The same report shows Facebook&apos;s advertising reach in Cyprus fell by about 78,000 people, or 9.5%, between October 2024 and October 2025, while Instagram&apos;s fell by 2.1%. DataReportal warns that these platform figures are estimates that are regularly revised, so the exact numbers matter less than the principle: the audience on a platform is rented. The platform decides how many of your own followers see a post, and it can change that, or your account&apos;s status, without notice.
        </p>
        <p>
          LinkedIn moved the other way, with membership in Cyprus growing 12.7% to about 620,000. For businesses that sell to other businesses, that is where professional buyers increasingly check a supplier, and the first thing they click from a company page is usually its website.
        </p>

        <h2>Search and social do different jobs</h2>
        <p>
          Social media is good at being seen by people who already follow you, and at showing your work. It is weak at being found by someone who does not know you yet and has a specific need right now. That person types into Google: a service and a town. Google answers mainly with websites and Google Business Profiles, which is why a page per service on your own site, and a <Link href="/services/google-business">well-kept Google Business Profile</Link>, reach customers that a feed never will.
        </p>
        <p>
          The two work best together. Social builds familiarity; the website is where someone checks prices, services, opening hours and reviews before they call. Without it, the trail from a post to an enquiry often ends in a direct message that never gets answered in time.
        </p>

        <h2>Why the drop in websites is a chance</h2>
        <p>
          The share of Cypriot enterprises with a website fell between 2016 and 2023 while social media use rose. For a business that does invest in a clear, fast website, that means less competition in local search than in many other EU markets. In sectors where most competitors only have an Instagram account, a solid website is still a real differentiator.
        </p>
        <p>
          If you are weighing the cost, see <Link href="/articles/website-cost-cyprus">what a website costs in Cyprus</Link>.
        </p>
      </>
    ),
    faqs: [
      ["How many businesses in Cyprus have a website?", "According to Eurostat data for 2023, 68.8% of enterprises in Cyprus had a website, down from 74.7% in 2016, while 79.9% used social media."],
      ["How many people in Cyprus use the internet?", "DataReportal's Digital 2026 report estimates 1.3 million internet users in Cyprus at the end of 2025, or 94.7% of the population."],
      ["Is a Facebook page enough for a business in Cyprus?", "It reaches people who already follow you, but it rarely brings in people searching Google for a service. A website and a Google Business Profile reach those customers, and give you a presence you own rather than rent from a platform."],
    ],
    sources: [
      ["80% of enterprises in Cyprus use social media, Eurostat study finds (Cyprus Business Now, January 2025)", "https://www.cbn.com.cy/article/106539/80-of-enterprises-in-cyprus-use-social-media-eurostat-study-finds"],
      ["Digital 2026: Cyprus (DataReportal)", "https://datareportal.com/reports/digital-2026-cyprus"],
      ["Digital 2025: Cyprus (DataReportal)", "https://datareportal.com/reports/digital-2025-cyprus"],
    ],
    cta: contactCta,
  },
  {
    slug: "website-cost-cyprus",
    title: "How much does a website cost in Cyprus in 2026?",
    seoTitle: "How Much Does a Website Cost in Cyprus? (2026 Guide)",
    description: "What a small business website costs in Cyprus in 2026, what moves the price, the running costs most quotes leave out, and what you really need for a domain.",
    eyebrow: "Website costs",
    published: "2026-10-13",
    updated: "2026-10-13",
    readingMinutes: 6,
    body: (
      <>
        <p className="article-lead">
          Ask five web designers in Cyprus for a price and you can get five answers between a few hundred and several thousand euros. The spread is not random. It reflects what is actually being built, and what is left out of the quote.
        </p>

        <h2>The rough ranges</h2>
        <ul>
          <li><strong>A simple, professional site</strong> with a handful of pages, a contact form, a map and click-to-call: usually from around €500 to €1,000.</li>
          <li><strong>A custom site built to bring enquiries</strong>, with a page per service, local search set up and tracking of calls and forms: usually around €900 to €2,500.</li>
          <li><strong>Larger projects</strong> with online booking, several languages, online payments or integrations: from about €2,000, and quoted on scope.</li>
        </ul>
        <p>
          These are typical ranges for small businesses, not fixed market prices. Our own packages are on the <Link href="/pricing">pricing page</Link>.
        </p>

        <h2>What moves the price</h2>
        <h3>Who the design is for</h3>
        <p>
          A template with your logo dropped in is quick. A design planned around your customers and the one action you want them to take costs more, and is usually what decides whether visitors call you or the next result.
        </p>
        <h3>Languages</h3>
        <p>
          In Cyprus, most businesses need Greek, English or both. Other languages are possible on request for specific markets. A second language is not just translation: every page, form, email and search setting needs a version, so it typically adds a meaningful share to the build.
        </p>
        <h3>Content</h3>
        <p>
          Writing clear text and getting good photos is the slowest part of most projects. If you supply them, the price stays lower. Copywriting and photography are usually quoted separately.
        </p>
        <h3>Booking, payments and integrations</h3>
        <p>
          Connecting an existing booking platform is modest. Building a custom booking or payment flow, or connecting to a CRM or accounting system, is where prices rise fastest. Ask for each feature to be priced on its own, so you can decide what is worth it now and what can wait.
        </p>
        <h3>Platform</h3>
        <p>
          A site built on a website builder is cheaper to start but ties you to that platform&apos;s monthly plan, and some builders make it hard to leave. We compare the options in <Link href="/articles/wix-vs-professional-website">Wix or a professional website</Link>.
        </p>

        <h2>The running costs</h2>
        <h3>The domain</h3>
        <p>
          You do not need a .cy domain. A .com, .eu or any other extension works just as well, so choose the name that is easiest for customers to remember. If you already own a domain, the new website can simply be connected to it, with no need to change the address customers know. A new .com typically costs from around €10 to €20 a year. If you do want a .cy address, it is registered through the official registry at nic.cy, whose published fees, including VAT, are <strong>€20 for one year, €30 for two years and €50 for five years</strong>. Whichever you choose, it should be registered in your business&apos;s name, not your designer&apos;s.
        </p>
        <h3>Hosting and care</h3>
        <p>
          Hosting, security certificates, backups, software updates and small edits are an ongoing cost, either paid to a host and done yourself or bundled into a monthly care plan, commonly around €30 to €120 a month for a small business site.
        </p>

        <h2>The costs that are easy to miss</h2>
        <ul>
          <li><strong>Revisions</strong> beyond what is included.</li>
          <li><strong>Stock photos and fonts</strong> with commercial licences.</li>
          <li><strong>Email accounts</strong> on your domain, often a separate monthly subscription.</li>
          <li><strong>Moving away later</strong>: some platforms and some agencies make it hard to take the website elsewhere.</li>
        </ul>

        <h2>Questions worth asking before you pay</h2>
        <ol>
          <li>Who owns the website, the content and the domain once it is paid for?</li>
          <li>How many revision rounds are included?</li>
          <li>What exactly does the monthly fee cover, and can I cancel it?</li>
          <li>Is the site set up for Google search and for tracking calls and enquiries?</li>
          <li>Are the privacy policy and cookie consent included and working?</li>
        </ol>
        <p>
          Already have a website and wondering whether to replace it? Read <Link href="/articles/signs-website-losing-customers">eight signs your website is losing you customers</Link> first. Sometimes a few targeted fixes are enough.
        </p>
      </>
    ),
    faqs: [
      ["How much does a small business website cost in Cyprus?", "Typically from around €500 to €1,000 for a simple professional site, and around €900 to €2,500 for a custom site built to bring enquiries. Larger sites with booking, payments or several languages cost more and are quoted on scope."],
      ["Do I need a .cy domain for a business in Cyprus?", "No. A .com, .eu or any other extension works just as well. If you already have a domain, the new website can be connected to it, so customers keep using the same address."],
      ["How much does a .cy domain cost?", "If you choose a .cy address, the official registry at nic.cy lists fees of €20 for one year, €30 for two years and €50 for five years, including VAT."],
      ["Are there monthly costs after the website is built?", "Yes: the yearly domain renewal and hosting at minimum, and usually maintenance such as backups, updates and small edits, often bundled into a monthly care plan."],
    ],
    sources: [
      ["Fees (nic.cy, the official .cy registry)", "https://nic.cy/fees/"],
      ["Frequently asked questions (nic.cy)", "https://nic.cy/faqs/"],
    ],
  },
  {
    slug: "wix-vs-professional-website",
    title: "Wix or a professional website: which is right for your Cyprus business?",
    seoTitle: "Wix vs a Professional Website for a Cyprus Business",
    description: "An honest comparison of website builders like Wix and Squarespace against a professionally built website: cost, time, design, speed and what happens when you want to leave.",
    eyebrow: "Choosing a website",
    published: "2026-10-13",
    updated: "2026-10-13",
    readingMinutes: 5,
    body: (
      <>
        <p className="article-lead">
          Website builders such as Wix and Squarespace promise a website in an afternoon, and for some businesses that is the right choice. For others, the money saved at the start is lost in time, enquiries and a site that has to be rebuilt later. The difference usually comes down to what the website is for.
        </p>

        <h2>When a website builder makes sense</h2>
        <ul>
          <li>You need something simple online quickly, and a template is close to what you want.</li>
          <li>You enjoy design and have time to learn the tool and keep the site updated.</li>
          <li>The website is not a main source of customers yet.</li>
        </ul>

        <h2>When a professional website is worth it</h2>
        <ul>
          <li>You want the website to bring in calls, enquiries or bookings from people who do not know you yet.</li>
          <li>You compete with other local businesses on Google.</li>
          <li>Your time is worth more running the business than learning web design.</li>
          <li>You need booking, two languages or integrations to work properly.</li>
        </ul>

        <h2>The cost is not only the monthly plan</h2>
        <p>
          Builders are not free once you want your own domain and no adverts: you pay a monthly plan, and often paid apps on top for booking, forms or extra languages. A professional site costs more up front, but over a few years the gap is often smaller than it looks, especially when maintenance is included.
        </p>
        <p>
          The bigger cost is usually time. Choosing a template is quick; writing the text, sorting photos, fixing the mobile layout and setting up search basics is not. Many owner-built sites end up half finished, or finished once and never updated.
        </p>

        <h2>The template you choose is the one you keep</h2>
        <p>
          This catches many people out. Wix&apos;s own help centre states that &ldquo;it&apos;s not possible to switch to a different template for a site you already created.&rdquo; To change the design, you create a new site with a new template and move your content across. If the business grows or the brand changes, the redesign is effectively a rebuild.
        </p>

        <h2>Leaving is harder than joining</h2>
        <p>
          With a builder, the website lives on the builder&apos;s platform. You can keep your domain and copy your text and images, but the site itself does not come with you. Some content is locked in too: Wix states that &ldquo;it is not possible to export blog posts to other platforms.&rdquo; A business that has spent years writing posts on a builder would have to move them by hand.
        </p>
        <p>
          A professionally built site on standard technology can be moved to another host or developer. Whichever route you take, ask this before you start: if we part ways, what exactly do I take with me?
        </p>

        <h2>Speed and search</h2>
        <p>
          Builders cover the basics of search, and they are much better than they used to be. The difference is in the details. Google&apos;s own guidance for a good experience is that the main content of a page should load within 2.5 seconds for most visitors, and builder sites loaded with apps and effects often struggle on mobile. Content planned around what people in your area actually search for matters even more, and that is planning a builder leaves to you.
        </p>

        <h2>A sensible middle path</h2>
        <p>
          If budget is the issue, start small but professional: a few well-planned pages on a platform you own, built to grow. That avoids paying twice, once for a builder site and again to replace it. See <Link href="/articles/website-cost-cyprus">what a website costs in Cyprus</Link> for realistic numbers.
        </p>
      </>
    ),
    faqs: [
      ["Is Wix good for a small business website?", "It can be, for a simple site where you have time to build and maintain it yourself. If the website needs to bring in customers from Google, a professionally planned and built site usually performs better."],
      ["Can I change my Wix template later?", "Not on an existing site. Wix states that it is not possible to switch to a different template for a site you already created. You need to create a new site with the new template and move your content."],
      ["Can I move a Wix website to another platform?", "Not as a whole. You can keep your domain and copy your content, but the site generally has to be rebuilt elsewhere, and Wix states that blog posts cannot currently be exported to other platforms."],
    ],
    sources: [
      ["Switching your site template (Wix Help Center)", "https://support.wix.com/en/article/switching-your-site-template"],
      ["Exporting blog posts to other platforms (Wix Help Center)", "https://support.wix.com/en/article/wix-blog-request-exporting-blog-posts-to-other-platforms"],
      ["Web Vitals (web.dev, Google)", "https://web.dev/articles/vitals"],
    ],
  },
  {
    slug: "signs-website-losing-customers",
    title: "8 signs your website is losing you customers",
    seoTitle: "8 Signs Your Website Is Losing You Customers",
    description: "Eight common problems that quietly cost Cyprus businesses calls and bookings, how to spot each one, and which to fix first.",
    eyebrow: "Website health",
    published: "2026-10-13",
    updated: "2026-10-13",
    readingMinutes: 6,
    body: (
      <>
        <p className="article-lead">
          A website rarely fails loudly. It just sends fewer calls than it should, and nobody notices. These are the problems we see most often on small business websites in Cyprus, and how you can spot each one yourself in a few minutes.
        </p>

        <h2>1. It is slow on a phone</h2>
        <p>
          Most visitors arrive on a phone, often on mobile data. Google&apos;s guidance is that the main content of a page should appear within 2.5 seconds, that the page should respond to a tap within 200 milliseconds, and that the layout should not jump around while it loads. Open your site on your phone away from Wi-Fi: if you find yourself waiting, so are your customers. Google&apos;s free PageSpeed Insights shows how real visitors experience it.
        </p>

        <h2>2. Visitors cannot tell what you do in five seconds</h2>
        <p>
          The first screen should answer three questions: what you offer, where, and what to do next. A slogan or a large stock photo with no clear message makes people work too hard, and on a phone, most never scroll to find out.
        </p>

        <h2>3. There is no obvious next step</h2>
        <p>
          Every page should make the main action easy: call, book, WhatsApp or send an enquiry. On a phone, the number should be tappable. If people have to hunt for the contact page, some will not bother.
        </p>

        <h2>4. It is hard to use on mobile</h2>
        <p>
          Text that needs zooming, buttons too close together, menus that do not open and pop-ups that cover the page all push people away. Try filling in your own contact form on your phone, start to finish.
        </p>

        <h2>5. The information is out of date</h2>
        <p>
          Old prices, last year&apos;s opening hours, a phone number that no longer works or a &ldquo;latest news&rdquo; post from years ago make a business look closed or careless.
        </p>

        <h2>6. Nothing builds trust</h2>
        <p>
          Reviews, real photos of you and your work, qualifications, years in business and clear contact details all reassure a stranger. Without them, people move on to a business that feels more established.
        </p>

        <h2>7. You do not show up when people search</h2>
        <p>
          Search for your main service and your town, the way a customer would. If competitors appear and you do not, the usual causes are that services are lumped onto one page, page titles do not say what the page is about, or the website and Google profile do not match.
        </p>

        <h2>8. You cannot tell what is working</h2>
        <p>
          If you do not know how many calls, form enquiries or bookings the website brings each month, you cannot tell whether it is improving or failing. Analytics should count those actions, not just visits.
        </p>

        <h2>What to fix first</h2>
        <p>
          Start with whatever stops people contacting you: speed, a clear first screen and an easy next step. Those usually make the biggest difference for the least effort. Trust signals, content and search come next.
        </p>
        <p>
          If several of these sound familiar, you may not need a new site; often a handful of targeted fixes is enough. If you are weighing up a rebuild, see <Link href="/articles/website-cost-cyprus">what a website costs in Cyprus</Link>.
        </p>
      </>
    ),
    faqs: [
      ["How do I know if my website is losing customers?", "Common signs are slow loading on phones, an unclear first screen, no obvious way to call or book, outdated information, few trust signals, poor visibility in search and no tracking of calls or enquiries."],
      ["How fast should a business website load?", "Google's guidance is that the main content should load within 2.5 seconds for most visitors, the page should respond to interactions within 200 milliseconds, and the layout should stay stable while loading. PageSpeed Insights is a free way to check."],
      ["Do I need a new website or can my current one be fixed?", "Often the current site can be improved with targeted fixes to speed, layout, calls to action and search. A website audit shows which problems matter most and whether a rebuild is worth it."],
    ],
    sources: [
      ["Web Vitals (web.dev, Google)", "https://web.dev/articles/vitals"],
      ["PageSpeed Insights (Google)", "https://pagespeed.web.dev/"],
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function formatArticleDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
