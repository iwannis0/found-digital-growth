import { safeHtml } from "@/lib/security";
import { siteConfig } from "@/lib/site-config";

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

function shell(preheader: string, content: string) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="color-scheme" content="light" /><title>VISION.</title></head>
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
          <a href="${siteConfig.url}" style="color:#8a8a80;text-decoration:none">vision.cy</a> — website design and local SEO in Cyprus
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

/** Sent to the person who filled in the form. */
export function clientConfirmationEmail(kind: "contact" | "audit", payload: Payload): Email {
  const person = str(payload.name).trim().split(/\s+/)[0] || "there";
  const business = str(payload.businessName).trim();
  const isAudit = kind === "audit";

  const subject = isAudit
    ? "Your free website audit is on the way | VISION."
    : "Thanks for getting in touch | VISION.";
  const preheader = isAudit
    ? "We have your details and will send your written review within two working days."
    : "We have your message and will reply within two working days.";

  const nextSteps = isAudit
    ? [
        "We go through your website across design, mobile experience, speed, SEO, Google presence, conversion, trust and content.",
        "We pick out the changes that would make the biggest difference to enquiries, not a list of everything.",
        "You get the written review by email, with clear priorities and no obligation.",
      ]
    : [
        "We read your message and take a proper look at your current setup.",
        "We reply with honest next steps and what they would involve.",
        "If a short call would help, we suggest a time that suits you.",
      ];

  const details = summary([
    ["Business", business],
    ["Website", str(payload.website)],
    [isAudit ? "Main goal" : "Service", str(isAudit ? payload.goal : payload.service || payload.packageName)],
  ]);

  const html = shell(preheader, [
    heading(isAudit ? `Your audit is booked in,<br />${safeHtml(person)}.` : `Thanks for reaching out,<br />${safeHtml(person)}.`),
    paragraph(
      isAudit
        ? `We have everything we need to review ${business ? `<strong style="color:${INK}">${safeHtml(business)}</strong>` : "your website"}. You will have the written review by email <strong style="color:${INK}">within two working days</strong>.`
        : `We have your message${business ? ` about <strong style="color:${INK}">${safeHtml(business)}</strong>` : ""} and will get back to you <strong style="color:${INK}">within two working days</strong>.`,
      18,
    ),
    details,
    paragraph(`<strong style="color:${INK};font-size:12px;text-transform:uppercase;letter-spacing:1px">What happens next</strong>`, 28),
    steps(nextSteps),
    paragraph("No reply needed for now. If anything changes in the meantime, just reply to this email and it reaches us directly.", 10),
    button(isAudit ? "See the kind of work we do" : "Explore our work", `${siteConfig.url}/work`),
    spacer(),
  ].join(""));

  const text = [
    isAudit ? `Your audit is booked in, ${person}.` : `Thanks for reaching out, ${person}.`,
    "",
    isAudit
      ? `We have everything we need to review ${business || "your website"}. You will have the written review by email within two working days.`
      : `We have your message${business ? ` about ${business}` : ""} and will get back to you within two working days.`,
    "",
    "What happens next",
    ...nextSteps.map((item, index) => `${index + 1}. ${item.replace(/<[^>]+>/g, "")}`),
    "",
    "No reply needed for now. If anything changes, just reply to this email and it reaches us directly.",
    "",
    `${siteConfig.email} · ${siteConfig.phone}`,
    `${siteConfig.url} — website design and local SEO in Cyprus`,
  ].join("\n");

  return { subject, html, text };
}

/** Sent to the team, so a new lead can be judged at a glance. */
export function teamNotificationEmail(kind: "contact" | "audit", payload: Payload): Email {
  const business = str(payload.businessName).trim() || "New business";
  const isAudit = kind === "audit";
  const subject = `${isAudit ? "Audit request" : "Enquiry"}: ${business}`;

  // Readable labels first, then anything else the form happens to carry.
  const labels: Record<string, string> = {
    name: "Name", businessName: "Business", email: "Email", phone: "Phone", website: "Website",
    service: "Service", packageName: "Package", industry: "Industry", city: "City", goal: "Main goal",
    problem: "Current problem", budget: "Budget", message: "Message",
    utmSource: "UTM source", utmMedium: "UTM medium", utmCampaign: "UTM campaign",
    utmContent: "UTM content", utmTerm: "UTM term",
  };
  const skip = new Set(["companyWebsite", "consent"]);
  const order = Object.keys(labels);
  const entries = Object.entries(payload)
    .filter(([key, value]) => !skip.has(key) && str(value).trim())
    .sort(([a], [b]) => {
      const ia = order.indexOf(a); const ib = order.indexOf(b);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });

  const rows = entries.map(([key, value]) => {
    const label = labels[key] ?? key;
    const raw = str(value);
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

  const html = shell(`${isAudit ? "Audit request" : "Enquiry"} from ${business}`, [
    heading(`${isAudit ? "New audit request" : "New enquiry"}`),
    paragraph(`From <strong style="color:${INK}">${safeHtml(business)}</strong>. Full details below, and in the admin area.`, 14),
    `<tr><td style="padding:22px 32px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>`,
    button("Open the admin area", `${siteConfig.url}/admin`),
    spacer(),
  ].join(""));

  const text = [
    isAudit ? "New audit request" : "New enquiry",
    `From ${business}`,
    "",
    ...entries.map(([key, value]) => `${labels[key] ?? key}: ${str(value)}`),
    "",
    `Admin: ${siteConfig.url}/admin`,
  ].join("\n");

  return { subject, html, text };
}
