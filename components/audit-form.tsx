"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile } from "@/components/turnstile";
import { getAttribution } from "@/lib/client-attribution";
import { trackEvent } from "@/components/analytics";

const goals = ["Get more enquiries / leads", "Improve my website", "Improve Google visibility", "Increase conversions", "Track website performance", "Launch a new website", "Not sure yet"];
const budgets = ["Under €700", "€700-€1,000", "€1,000-€1,500", "€1,500-€3,000", "€3,000+", "Not sure"];

export function AuditForm() {
  const [goal, setGoal] = useState(""); const [budget, setBudget] = useState(""); const [consent, setConsent] = useState(false); const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle"); const [message, setMessage] = useState(""); const [fields, setFields] = useState<Record<string, string[]>>({});
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("loading"); setMessage(""); setFields({}); const form = event.currentTarget; const data = new FormData(form);
    const payload = { name: data.get("name"), businessName: data.get("businessName"), email: data.get("email"), phone: data.get("phone"), website: data.get("website"), industry: data.get("industry"), city: data.get("city"), goal, problem: data.get("problem"), budget, message: data.get("message"), consent, companyWebsite: data.get("companyWebsite"), turnstileToken: data.get("cf-turnstile-response") ?? "", ...getAttribution() };
    try { const response = await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const result = await response.json() as { message?: string; fields?: Record<string, string[]> }; if (!response.ok) { setFields(result.fields ?? {}); throw new Error(result.message ?? "We could not submit your request."); } form.reset(); setGoal(""); setBudget(""); setConsent(false); setStatus("success"); trackEvent("audit_submit"); } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Please try again."); }
  }
  if (status === "success") return <div className="form-success" role="status"><CheckCircle2 /><p className="eyebrow">Audit request received</p><h2>Your audit request is in.</h2><p>We&apos;ll review your website and get back to you with the clearest opportunities we find.</p><button className="text-link" onClick={() => setStatus("idle")}>Submit another website</button></div>;
  return <form className="found-form audit-form" onSubmit={submit} noValidate>
    <div className="form-row"><Field label="Name" name="name" required error={fields.name?.[0]} /><Field label="Business Name" name="businessName" required error={fields.businessName?.[0]} /></div>
    <div className="form-row"><Field label="Email" name="email" type="email" required error={fields.email?.[0]} /><Field label="Phone" name="phone" type="tel" error={fields.phone?.[0]} /></div>
    <Field label="Website" name="website" type="url" placeholder="https://" required error={fields.website?.[0]} />
    <div className="form-row"><Field label="Industry" name="industry" error={fields.industry?.[0]} /><Field label="City" name="city" error={fields.city?.[0]} /></div>
    <div className="form-row"><SelectField label="Main Goal" value={goal} onChange={setGoal} options={goals} placeholder="Choose your main goal" required error={fields.goal?.[0]} /><SelectField label="Approximate Budget" value={budget} onChange={setBudget} options={budgets} placeholder="Choose a range" error={fields.budget?.[0]} /></div>
    <div className="form-field"><Label htmlFor="problem">Current Problem</Label><Textarea id="problem" name="problem" rows={5} aria-invalid={Boolean(fields.problem)} /><FieldError value={fields.problem?.[0]} /></div>
    <div className="form-field"><Label htmlFor="audit-message">Anything else we should know?</Label><Textarea id="audit-message" name="message" rows={5} /></div>
    <div className="consent-field"><Checkbox id="consent" checked={consent} onCheckedChange={(value) => setConsent(value === true)} aria-invalid={Boolean(fields.consent)} /><Label htmlFor="consent">I agree that FOUND. may use these details to review my request and contact me.</Label></div><FieldError value={fields.consent?.[0]} />
    <div className="honeypot" aria-hidden="true"><label>Company website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label></div><Turnstile />
    {status === "error" && <p className="form-error-banner" role="alert">{message}</p>}
    <button className="button button-accent button-large form-submit" type="submit" disabled={status === "loading"}>{status === "loading" ? "Submitting..." : <>Get My Free Audit <ArrowRight /></>}</button>
  </form>;
}

function SelectField({ label, value, onChange, options, placeholder, required, error }: { label: string; value: string; onChange: (value: string) => void; options: string[]; placeholder: string; required?: boolean; error?: string }) { return <div className="form-field"><Label>{label}{required ? " *" : ""}</Label><Select value={value} onValueChange={(next) => onChange(next ?? "")}><SelectTrigger className="found-select" aria-invalid={Boolean(error)}><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent>{options.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select><FieldError value={error} /></div>; }
function Field({ label, name, type = "text", required, placeholder, error }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; error?: string }) { return <div className="form-field"><Label htmlFor={name}>{label}{required ? " *" : ""}</Label><Input id={name} name={name} type={type} required={required} placeholder={placeholder} aria-invalid={Boolean(error)} /><FieldError value={error} /></div>; }
function FieldError({ value }: { value?: string }) { return value ? <p className="field-error">{value}</p> : null; }
