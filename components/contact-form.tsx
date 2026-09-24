"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAttribution } from "@/lib/client-attribution";
import { trackEvent } from "@/components/analytics";

const serviceOptions = ["Website Design & Development", "Website Redesign", "Local SEO", "Google Business", "Website Care", "Analytics & Tracking", "Conversion-Focused Design", "Lead & Booking Automation", "Other"];
const packageOptions = ["Professional Website Foundation", "Custom Growth Website", "Advanced Digital Presence", "Not sure", "Custom"];

export function ContactForm({ initialPackage = "", initialService = "" }: { initialPackage?: string; initialService?: string }) {
  const selectedPackage = packageOptions.includes(initialPackage) ? initialPackage : "";
  const selectedService = serviceOptions.includes(initialService) ? initialService : "";
  const [service, setService] = useState(selectedService); const [packageName, setPackageName] = useState(selectedPackage); const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle"); const [message, setMessage] = useState(""); const [fields, setFields] = useState<Record<string, string[]>>({});
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("loading"); setFields({}); setMessage("");
    const form = event.currentTarget; const data = new FormData(form);
    const payload = { name: data.get("name"), businessName: data.get("businessName"), email: data.get("email"), phone: data.get("phone"), website: data.get("website"), service, packageName, message: data.get("message"), companyWebsite: data.get("companyWebsite"), ...getAttribution() };
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const result = await response.json() as { message?: string; fields?: Record<string, string[]> };
      if (!response.ok) { setFields(result.fields ?? {}); throw new Error(result.message ?? "We could not send your enquiry."); }
      form.reset(); setService(""); setPackageName(""); setStatus("success"); trackEvent("contact_submit", { service: service || "unspecified" });
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Please try again."); }
  }

  if (status === "success") return <div className="form-success" role="status"><CheckCircle2 /><p className="eyebrow">Enquiry received</p><h2>Thank you. We usually reply within two working days.</h2><button className="text-link" onClick={() => setStatus("idle")}>Send another enquiry</button></div>;

  return <form className="found-form" onSubmit={submit} noValidate>
    <p className="form-required-note">Fields marked <strong>*</strong> are required.</p>
    <div className="form-row"><Field label="Name" name="name" required error={fields.name?.[0]} /><Field label="Business" name="businessName" required error={fields.businessName?.[0]} /></div>
    <div className="form-row"><Field label="Email" name="email" type="email" required error={fields.email?.[0]} /><Field label="Phone" name="phone" type="tel" error={fields.phone?.[0]} /></div>
    <Field label="Website" name="website" type="url" placeholder="https://" error={fields.website?.[0]} />
    <div className="form-row">
      <SelectField label="Service" name="service" value={service} onChange={setService} options={serviceOptions} placeholder="Choose a service" />
      <SelectField label="Package" name="package" value={packageName} onChange={setPackageName} options={packageOptions} placeholder="Choose a package" />
    </div>
    <div className="form-field"><Label htmlFor="message">Message *</Label><Textarea id="message" name="message" rows={7} required aria-invalid={Boolean(fields.message)} /><FieldError value={fields.message?.[0]} /></div>
    <div className="honeypot" aria-hidden="true"><label>Company website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label></div>
    {status === "error" && <p className="form-error-banner" role="alert">{message}</p>}
    <button className="button button-accent button-large form-submit" type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending..." : <>Send Enquiry <ArrowRight /></>}</button>
  </form>;
}

function Field({ label, name, type = "text", required, placeholder, error }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; error?: string }) { return <div className="form-field"><Label htmlFor={name}>{label}{required ? " *" : ""}</Label><Input id={name} name={name} type={type} required={required} placeholder={placeholder} aria-invalid={Boolean(error)} /><FieldError value={error} /></div>; }
function SelectField({ label, name, value, onChange, options, placeholder }: { label: string; name: string; value: string; onChange: (value: string) => void; options: readonly string[]; placeholder: string }) { return <div className="form-field"><Label htmlFor={name}>{label}</Label><select id={name} name={name} className="found-select" value={value} onChange={(event) => onChange(event.target.value)}><option value="">{placeholder}</option>{options.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>; }
function FieldError({ value }: { value?: string }) { return value ? <p className="field-error" role="alert">{value}</p> : null; }
