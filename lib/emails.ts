import { safeHtml } from "@/lib/security";
import { siteConfig } from "@/lib/site-config";
import { callRequestService } from "@/lib/validation";

// Email clients ignore most modern CSS, so these templates use tables and inline
// styles only, no external fonts and no images: a blocked image must never hide
// anything that matters. Every template also ships a plain-text version, which
// helps deliverability and readers who prefer text.
type Payload = Record<string, unknown>;
type Email = { subject: string; html: string; text: string };

const INK = "#11110f";
const INK_SOFT = "#56564f";
const PAPER = "#f3f1eb";
const ACID = "#3F35B5";
const ACID_LIGHT = "#A29BF6";
const LINE = "#e2ded3";
const FONT = "Arial, Helvetica, sans-serif";

function shell(preheader: string, content: string, lang: "en" | "el" = "en") {
  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="color-scheme" content="light" /><title>VISION.</title></head>
<body style="margin:0;padding:0;background:${PAPER};font-family:${FONT};-webkit-font-smoothing:antialiased">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};padding:28px 14px">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fffef9;border:1px solid ${LINE};border-radius:14px;overflow:hidden">
      <tr><td style="background:${INK};padding:26px 32px">
        <span style="color:#fffef9;font-size:22px;font-weight:bold;letter-spacing:-0.5px">VISION<span style="color:${ACID_LIGHT}">.</span></span>
      </td></tr>
      ${content}
      <tr><td style="border-top:1px solid ${LINE};padding:24px 32px;background:#fcfbf7">
        <p style="margin:0 0 6px;font-size:13px;color:${INK_SOFT};line-height:1.6">
          <a href="mailto:${siteConfig.email}" style="color:${ACID};text-decoration:none">${siteConfig.email}</a>
          &nbsp;·&nbsp; <a href="tel:${siteConfig.phone.replace(/\s/g, "")}" style="color:${ACID};text-decoration:none">${siteConfig.phone}</a>
        </p>
        <p style="margin:0;font-size:12px;color:#8a8a80;line-height:1.6">
          <a href="${siteConfig.url}" style="color:#8a8a80;text-decoration:none">vision.cy</a> — ${lang === "el" ? "κατασκευή ιστοσελίδων στην Κύπρο" : "website development services in Cyprus"}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function heading(text: string) {
  return `<tr><td style="padding:34px 32px 0"><h1 style="margin:0;font-size:25px;line-height:1.25;font-weight:bold;color:${INK};letter-spacing:-0.4px">${text}</h1></td></tr>`;
}

function paragraph(text: string, top = 14) {
  return `<tr><td style="padding:${top}px 32px 0"><p style="margin:0;font-size:15px;line-height:1.65;color:${INK_SOFT}">${text}</p></td></tr>`;
}

/** A numbered list of what happens next, so expectations are set in the email itself. */
function steps(items: string[]) {
  const rows = items.map((item, index) => `
    <tr>
      <td width="30" valign="top" style="padding:0 0 14px"><span style="display:inline-block;font-size:12px;font-weight:bold;color:${ACID}">0${index + 1}</span></td>
      <td valign="top" style="padding:0 0 14px"><p style="margin:0;font-size:14px;line-height:1.55;color:${INK}">${item}</p></td>
    </tr>`).join("");
  return `<tr><td style="padding:26px 32px 0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
  </td></tr>`;
}

/** The details the sender gave us, echoed back so they can see it arrived correctly. */
function summary(pairs: [string, string][]) {
  const rows = pairs.filter(([, value]) => value).map(([label, value]) => `
    <tr>
      <td style="padding:7px 0;font-size:12px;color:#8a8a80;text-transform:uppercase;letter-spacing:1px;width:132px" valign="top">${safeHtml(label)}</td>
      <td style="padding:7px 0;font-size:14px;color:${INK};line-height:1.5" valign="top">${safeHtml(value)}</td>
    </tr>`).join("");
  if (!rows) return "";
  return `<tr><td style="padding:24px 32px 0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};border-radius:10px;padding:6px 18px">${rows}</table>
  </td></tr>`;
}

function button(label: string, href: string) {
  return `<tr><td style="padding:28px 32px 0">
    <a href="${href}" style="display:inline-block;background:${ACID};color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;padding:13px 24px;border-radius:999px">${label}</a>
  </td></tr>`;
}

function spacer(height = 34) {
  return `<tr><td style="height:${height}px;line-height:${height}px">&nbsp;</td></tr>`;
}

const str = (value: unknown) => (value == null ? "" : String(value));

// The confirmation email follows the language of the form the person used.
const confirmationCopy = {
  en: {
    there: "there",
    yourWebsite: "your website",
    businessWebsite: (business: string) => business,
    auditSubject: "Your free website audit is on the way | VISION.",
    contactSubject: "Thanks for getting in touch | VISION.",
    auditPreheader: "We have your details and will send your written review within two working days.",
    contactPreheader: "We have your message and will reply within two working days.",
    auditSteps: [
      "We go through your website across design, mobile experience, speed, SEO, Google presence, conversion, trust and content.",
      "We pick out the changes that would make the biggest difference to enquiries, not a list of everything.",
      "You get the written review by email, with clear priorities and no obligation.",
    ],
    contactSteps: [
      "We read your message and take a proper look at your current setup.",
      "We reply with honest next steps and what they would involve.",
      "If a short call would help, we suggest a time that suits you.",
    ],
    business: "Business",
    website: "Website",
    goal: "Main goal",
    service: "Service",
    auditHeading: (person: string) => `Your audit is booked in,<br />${person}.`,
    contactHeading: (person: string) => `Thanks for reaching out,<br />${person}.`,
    auditTextHeading: (person: string) => `Your audit is booked in, ${person}.`,
    contactTextHeading: (person: string) => `Thanks for reaching out, ${person}.`,
    auditBody: (subject: string, deadline: (text: string) => string) => `We have everything we need to review ${subject}. You will have the written review by email ${deadline("within two working days")}.`,
    contactBody: (about: string, deadline: (text: string) => string) => `We have your message${about ? ` about ${about}` : ""} and will get back to you ${deadline("within two working days")}.`,
    nextLabel: "What happens next",
    noReply: "No reply needed for now. If anything changes in the meantime, just reply to this email and it reaches us directly.",
    noReplyText: "No reply needed for now. If anything changes, just reply to this email and it reaches us directly.",
    auditButton: "See the kind of work we do",
    contactButton: "Explore our work",
    workPath: "/work",
    footer: "website development services in Cyprus",
  },
  el: {
    there: "",
    yourWebsite: "την ιστοσελίδα σας",
    businessWebsite: (business: string) => `την ιστοσελίδα της επιχείρησης ${business}`,
    auditSubject: "Η δωρεάν αξιολόγηση της ιστοσελίδας σας ξεκινά | VISION.",
    contactSubject: "Σας ευχαριστούμε για το μήνυμά σας | VISION.",
    auditPreheader: "Λάβαμε τα στοιχεία σας και θα σας στείλουμε τη γραπτή αξιολόγηση μέσα σε δύο εργάσιμες ημέρες.",
    contactPreheader: "Λάβαμε το μήνυμά σας και θα σας απαντήσουμε μέσα σε δύο εργάσιμες ημέρες.",
    auditSteps: [
      "Εξετάζουμε την ιστοσελίδα σας ως προς τον σχεδιασμό, την εμπειρία στο κινητό, την ταχύτητα, το SEO, την παρουσία στο Google, τις μετατροπές, την αξιοπιστία και το περιεχόμενο.",
      "Ξεχωρίζουμε τις αλλαγές που θα κάνουν τη μεγαλύτερη διαφορά στα αιτήματα πελατών, όχι μια λίστα με τα πάντα.",
      "Λαμβάνετε τη γραπτή αξιολόγηση με email, με ξεκάθαρες προτεραιότητες και χωρίς καμία δέσμευση.",
    ],
    contactSteps: [
      "Διαβάζουμε το μήνυμά σας και εξετάζουμε προσεκτικά τι έχετε σήμερα.",
      "Σας απαντάμε με ειλικρινή επόμενα βήματα και τι θα περιλάμβαναν.",
      "Αν βοηθά μια σύντομη κλήση, σας προτείνουμε μια ώρα που σας εξυπηρετεί.",
    ],
    business: "Επιχείρηση",
    website: "Ιστοσελίδα",
    goal: "Κύριος στόχος",
    service: "Υπηρεσία",
    auditHeading: (person: string) => (person ? `Η αξιολόγησή σας προγραμματίστηκε,<br />${person}.` : "Η αξιολόγησή σας προγραμματίστηκε."),
    contactHeading: (person: string) => (person ? `Ευχαριστούμε που επικοινωνήσατε,<br />${person}.` : "Ευχαριστούμε που επικοινωνήσατε."),
    auditTextHeading: (person: string) => (person ? `Η αξιολόγησή σας προγραμματίστηκε, ${person}.` : "Η αξιολόγησή σας προγραμματίστηκε."),
    contactTextHeading: (person: string) => (person ? `Ευχαριστούμε που επικοινωνήσατε, ${person}.` : "Ευχαριστούμε που επικοινωνήσατε."),
    auditBody: (subject: string, deadline: (text: string) => string) => `Έχουμε ό,τι χρειαζόμαστε για να εξετάσουμε ${subject}. Θα λάβετε τη γραπτή αξιολόγηση με email ${deadline("μέσα σε δύο εργάσιμες ημέρες")}.`,
    contactBody: (about: string, deadline: (text: string) => string) => `Λάβαμε το μήνυμά σας${about ? ` σχετικά με την επιχείρηση ${about}` : ""} και θα σας απαντήσουμε ${deadline("μέσα σε δύο εργάσιμες ημέρες")}.`,
    nextLabel: "Τι ακολουθεί",
    noReply: "Δεν χρειάζεται να απαντήσετε προς το παρόν. Αν αλλάξει κάτι στο μεταξύ, απλώς απαντήστε σε αυτό το email και θα το λάβουμε απευθείας.",
    noReplyText: "Δεν χρειάζεται να απαντήσετε προς το παρόν. Αν αλλάξει κάτι, απλώς απαντήστε σε αυτό το email και θα το λάβουμε απευθείας.",
    auditButton: "Δείτε τη δουλειά μας",
    contactButton: "Δείτε τη δουλειά μας",
    workPath: "/gr/work",
    footer: "κατασκευή ιστοσελίδων στην Κύπρο",
  },
};

/** Sent to the person who filled in the form. */
export function clientConfirmationEmail(kind: "contact" | "audit", payload: Payload): Email {
  if (kind === "contact" && payload.service === callRequestService) return callRequestConfirmationEmail(payload);
  const t = confirmationCopy[payload.locale === "el" ? "el" : "en"];
  const person = str(payload.name).trim().split(/\s+/)[0] || t.there;
  const business = str(payload.businessName).trim();
  const isAudit = kind === "audit";

  const subject = isAudit ? t.auditSubject : t.contactSubject;
  const preheader = isAudit ? t.auditPreheader : t.contactPreheader;
  const nextSteps = isAudit ? t.auditSteps : t.contactSteps;

  const details = summary([
    [t.business, business],
    [t.website, str(payload.website)],
    [isAudit ? t.goal : t.service, str(isAudit ? payload.goal : payload.service || payload.packageName)],
  ]);

  const strong = (text: string) => `<strong style="color:${INK}">${text}</strong>`;
  const plain = (text: string) => text;

  const html = shell(preheader, [
    heading(isAudit ? t.auditHeading(safeHtml(person)) : t.contactHeading(safeHtml(person))),
    paragraph(
      isAudit
        ? t.auditBody(business ? t.businessWebsite(strong(safeHtml(business))) : t.yourWebsite, strong)
        : t.contactBody(business ? strong(safeHtml(business)) : "", strong),
      18,
    ),
    details,
    paragraph(`<strong style="color:${INK};font-size:12px;text-transform:uppercase;letter-spacing:1px">${t.nextLabel}</strong>`, 28),
    steps(nextSteps),
    paragraph(t.noReply, 10),
    button(isAudit ? t.auditButton : t.contactButton, `${siteConfig.url}${t.workPath}`),
    spacer(),
  ].join(""), payload.locale === "el" ? "el" : "en");

  const text = [
    isAudit ? t.auditTextHeading(person) : t.contactTextHeading(person),
    "",
    isAudit ? t.auditBody(business ? t.businessWebsite(business) : t.yourWebsite, plain) : t.contactBody(business, plain),
    "",
    t.nextLabel,
    ...nextSteps.map((item, index) => `${index + 1}. ${item.replace(/<[^>]+>/g, "")}`),
    "",
    t.noReplyText,
    "",
    `${siteConfig.email} · ${siteConfig.phone}`,
    `${siteConfig.url} — ${t.footer}`,
  ].join("\n");

  return { subject, html, text };
}

// The call request confirmation follows the language of the booking form, like the others.
const callRequestCopy = {
  en: {
    subject: "We have your call request | VISION.",
    preheader: "We will check the time and confirm it with you.",
    steps: [
      "We check the time you picked against our calendar.",
      "We confirm by email or phone, with the meeting link or the number we will call. If the slot is taken, we suggest the nearest free one.",
      "We talk through the business and the sensible first step. No obligation.",
    ],
    heading: (person: string, br: string) => `Your call request is in,${br}${person}.`,
    body: (strong: (text: string) => string) => `We will check the time and ${strong("confirm it with you")} before the call.`,
    requestedTime: "Requested time",
    meetingType: "Meeting type",
    meetingLabels: {} as Record<string, string>,
    different: "Need a different time? Just reply to this email and it reaches us directly.",
  },
  el: {
    subject: "Λάβαμε το αίτημά σας για κλήση | VISION.",
    preheader: "Θα ελέγξουμε την ώρα και θα την επιβεβαιώσουμε μαζί σας.",
    steps: [
      "Ελέγχουμε την ώρα που διαλέξατε στο ημερολόγιό μας.",
      "Επιβεβαιώνουμε με email ή τηλέφωνο, με τον σύνδεσμο της συνάντησης ή τον αριθμό που θα καλέσουμε. Αν η ώρα δεν είναι διαθέσιμη, σας προτείνουμε την πιο κοντινή ελεύθερη.",
      "Συζητάμε για την επιχείρησή σας και για το πιο λογικό πρώτο βήμα. Χωρίς καμία δέσμευση.",
    ],
    heading: (person: string, br: string) => (person ? `Λάβαμε το αίτημά σας για κλήση,${br}${person}.` : "Λάβαμε το αίτημά σας για κλήση."),
    body: (strong: (text: string) => string) => `Θα ελέγξουμε την ώρα και θα ${strong("την επιβεβαιώσουμε μαζί σας")} πριν από την κλήση.`,
    requestedTime: "Ώρα που ζητήσατε",
    meetingType: "Τρόπος επικοινωνίας",
    meetingLabels: { "Phone call": "Τηλεφωνική κλήση" } as Record<string, string>,
    different: "Χρειάζεστε άλλη ώρα; Απλώς απαντήστε σε αυτό το email και θα το λάβουμε απευθείας.",
  },
};

/** Sent to someone who asked for a call: the time is a request until we confirm it. */
function callRequestConfirmationEmail(payload: Payload): Email {
  const locale = payload.locale === "el" ? "el" : "en";
  const t = callRequestCopy[locale];
  const common = confirmationCopy[locale];
  const person = str(payload.name).trim().split(/\s+/)[0] || common.there;
  const requestedTime = str(payload.requestedTime);
  const meetingType = t.meetingLabels[str(payload.meetingType)] ?? str(payload.meetingType);
  const { subject, preheader, steps: nextSteps } = t;

  const html = shell(preheader, [
    heading(t.heading(safeHtml(person), "<br />")),
    paragraph(t.body((text) => `<strong style="color:${INK}">${text}</strong>`), 18),
    summary([
      [common.business, str(payload.businessName).trim()],
      [t.requestedTime, requestedTime],
      [t.meetingType, meetingType],
    ]),
    paragraph(`<strong style="color:${INK};font-size:12px;text-transform:uppercase;letter-spacing:1px">${common.nextLabel}</strong>`, 28),
    steps(nextSteps),
    paragraph(t.different, 10),
    button(common.contactButton, `${siteConfig.url}${common.workPath}`),
    spacer(),
  ].join(""), locale);

  const text = [
    t.heading(person, " "),
    "",
    t.body((value) => value),
    "",
    requestedTime ? `${t.requestedTime}: ${requestedTime}` : "",
    meetingType ? `${t.meetingType}: ${meetingType}` : "",
    "",
    common.nextLabel,
    ...nextSteps.map((item, index) => `${index + 1}. ${item}`),
    "",
    t.different,
    "",
    `${siteConfig.email} · ${siteConfig.phone}`,
    `${siteConfig.url} — ${common.footer}`,
  ].join("\n");

  return { subject, html, text };
}

/** Sent to the team, so a new lead can be judged at a glance. */
export function teamNotificationEmail(kind: "contact" | "audit", payload: Payload): Email {
  const business = str(payload.businessName).trim() || "New business";
  const isAudit = kind === "audit";
  const isCall = !isAudit && payload.service === callRequestService;
  const title = isAudit ? "Audit request" : isCall ? "Call request" : "Enquiry";
  const subject = `${title}: ${business}${isCall && payload.requestedTime ? `, ${str(payload.requestedTime)}` : ""}`;

  // Readable labels first, then anything else the form happens to carry.
  const labels: Record<string, string> = {
    name: "Name", businessName: "Business", email: "Email", phone: "Phone", website: "Website",
    service: "Service", requestedTime: "Requested time", meetingType: "Meeting type", packageName: "Package", industry: "Industry", city: "City", goal: "Main goal",
    problem: "Current problem", budget: "Budget", message: "Message",
    utmSource: "UTM source", utmMedium: "UTM medium", utmCampaign: "UTM campaign",
    utmContent: "UTM content", utmTerm: "UTM term", locale: "Site language",
  };
  const skip = new Set(["companyWebsite", "consent"]);
  const order = Object.keys(labels);
  const entries = Object.entries(payload)
    .filter(([key, value]) => !skip.has(key) && str(value).trim())
    .sort(([a], [b]) => {
      const ia = order.indexOf(a); const ib = order.indexOf(b);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });

  const languageNames: Record<string, string> = { en: "English", el: "Greek" };
  const rows = entries.map(([key, value]) => {
    const label = labels[key] ?? key;
    const raw = key === "locale" ? languageNames[str(value)] ?? str(value) : str(value);
    const cell = /^https?:\/\//i.test(raw)
      ? `<a href="${safeHtml(raw)}" style="color:${ACID}">${safeHtml(raw)}</a>`
      : key === "email"
        ? `<a href="mailto:${safeHtml(raw)}" style="color:${ACID}">${safeHtml(raw)}</a>`
        : safeHtml(raw).replace(/\n/g, "<br />");
    return `<tr>
      <td style="padding:9px 0;border-bottom:1px solid ${LINE};font-size:12px;color:#8a8a80;text-transform:uppercase;letter-spacing:1px;width:140px" valign="top">${safeHtml(label)}</td>
      <td style="padding:9px 0;border-bottom:1px solid ${LINE};font-size:14px;color:${INK};line-height:1.55" valign="top">${cell}</td>
    </tr>`;
  }).join("");

  const html = shell(`${title} from ${business}`, [
    heading(`New ${title.toLowerCase()}`),
    paragraph(`From <strong style="color:${INK}">${safeHtml(business)}</strong>. ${isCall ? "Confirm the time with them, or suggest another. " : ""}Full details below, and in the admin area.`, 14),
    `<tr><td style="padding:22px 32px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>`,
    button("Open the admin area", `${siteConfig.url}/admin`),
    spacer(),
  ].join(""));

  const text = [
    `New ${title.toLowerCase()}`,
    `From ${business}`,
    "",
    ...entries.map(([key, value]) => `${labels[key] ?? key}: ${key === "locale" ? languageNames[str(value)] ?? str(value) : str(value)}`),
    "",
    `Admin: ${siteConfig.url}/admin`,
  ].join("\n");

  return { subject, html, text };
}
