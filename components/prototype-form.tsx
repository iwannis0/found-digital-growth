"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAttribution } from "@/lib/client-attribution";
import { trackEvent } from "@/components/analytics";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

const cityOptions = ["Nicosia", "Limassol", "Larnaca", "Paphos", "Paralimni / Ayia Napa", "Elsewhere in Cyprus"];

const goalOptions = ["Call the business", "Book an appointment", "Send an enquiry", "Visit the shop or office", "Buy online"];

const styleOptions = ["Clean and minimal", "Bold and modern", "Warm and friendly", "Elegant and premium", "Not sure yet"];

// Sent through the contact endpoint, so prototype requests land in the same leads table,
// notification emails and integrations as every other enquiry.
export const prototypeService = "Free Prototype";

function localizeFields(fields: Record<string, string[]>, messages: Record<string, string>) {
  return Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, messages[key] ? [messages[key]] : value]));
}

export function PrototypeForm({ locale, copy, formCopy }: { locale: Locale; copy: Dictionary["prototypeForm"]; formCopy: Dictionary["forms"] }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fields, setFields] = useState<Record<string, string[]>>({});
  const [style, setStyle] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setFields({});
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    if (!text("businessType")) {
      setFields({ businessType: [copy.businessTypeRequired] });
      setStatus("error");
      setMessage(copy.checkFields);
      return;
    }

    // Visitors often type a bare domain or social link; the endpoint needs a full address.
    const website = text("website");

    const summary = [
      "Free prototype request",
      `Business type: ${text("businessType")}`,
      `Area: ${text("city") || "Not given"}`,
      `Main action customers should take: ${text("goal") || "Not given"}`,
      `Current website or social page: ${website || "None"}`,
      `Preferred style: ${style || "Not given"}`,
      text("notes") ? `\nNotes:\n${text("notes")}` : "",
    ].filter(Boolean).join("\n");

    const payload = {
      name: text("name"),
      businessName: text("businessName"),
      email: text("email"),
      phone: text("phone"),
      website: website && !/^https?:\/\//i.test(website) ? `https://${website}` : website,
      service: prototypeService,
      packageName: "",
      message: summary,
      companyWebsite: data.get("companyWebsite"),
      locale,
      ...getAttribution(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string; message?: string; fields?: Record<string, string[]> };

      if (!response.ok) {
        setFields(localizeFields(result.fields ?? {}, formCopy.fieldErrors));
        throw new Error((result.error && formCopy.errors[result.error]) ?? result.message ?? copy.failed);
      }

      form.reset();
      setStyle("");
      setStatus("success");

      trackEvent("generate_lead", { lead_type: "free_prototype" });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : formCopy.retry);
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 />
        <p className="eyebrow">{copy.successEyebrow}</p>
        <h2>{copy.successTitle}</h2>
        <button className="text-link" onClick={() => setStatus("idle")}>
          {copy.again}
        </button>
      </div>
    );
  }

  return (
    <form className="site-form" onSubmit={submit} noValidate>
      <p className="form-required-note">
        {formCopy.requiredBefore} <strong>*</strong> {formCopy.requiredAfter}
      </p>

      <fieldset className="form-step">
        <legend><span>01</span> {copy.stepAbout}</legend>
        <div className="form-row">
          <Field label={copy.name} name="name" required autoComplete="name" error={fields.name?.[0]} />
          <Field label={copy.business} name="businessName" required autoComplete="organization" error={fields.businessName?.[0]} />
        </div>
        <div className="form-row">
          <Field label={copy.email} name="email" type="email" required autoComplete="email" error={fields.email?.[0]} />
          <Field label={copy.phone} name="phone" type="tel" autoComplete="tel" error={fields.phone?.[0]} />
        </div>
      </fieldset>

      <fieldset className="form-step">
        <legend><span>02</span> {copy.stepBusiness}</legend>
        <Field
          label={copy.businessType}
          name="businessType"
          required
          placeholder={copy.businessTypePlaceholder}
          error={fields.businessType?.[0]}
        />
        <div className="form-row">
          <SelectField label={copy.area} name="city" options={cityOptions} optionLabels={copy.optionLabels} placeholder={copy.chooseArea} />
          <SelectField label={copy.goal} name="goal" options={goalOptions} optionLabels={copy.optionLabels} placeholder={copy.chooseGoal} />
        </div>
        <Field
          label={copy.website}
          name="website"
          type="url"
          placeholder={copy.websitePlaceholder}
          error={fields.website?.[0]}
        />
      </fieldset>

      <fieldset className="form-step">
        <legend><span>03</span> {copy.stepTaste}</legend>
        <p className="form-step-hint">{copy.tasteHint}</p>
        <div className="style-chips" role="group" aria-label={copy.styleLabel}>
          {styleOptions.map((option) => (
            <button type="button" key={option} className="booking-chip" aria-pressed={style === option} onClick={() => setStyle(style === option ? "" : option)}>
              {copy.optionLabels[option] ?? option}
            </button>
          ))}
        </div>
        <div className="form-field">
          <Label htmlFor="prototype-notes">{copy.notes}</Label>
          <Textarea
            id="prototype-notes"
            name="notes"
            rows={4}
            placeholder={copy.notesPlaceholder}
          />
        </div>
      </fieldset>

      <div className="honeypot" aria-hidden="true">
        <label>
          Company website
          <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p className="form-error-banner" role="alert">
          {message}
        </p>
      )}

      <button className="button button-accent button-large form-submit" type="submit" disabled={status === "loading"}>
        {status === "loading" ? copy.sending : <>{copy.submit} <ArrowRight /></>}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div className="form-field">
      <Label htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
      />
      <FieldError value={error} />
    </div>
  );
}

function SelectField({ label, name, options, optionLabels, placeholder }: { label: string; name: string; options: readonly string[]; optionLabels: Record<string, string>; placeholder: string }) {
  return (
    <div className="form-field">
      <Label htmlFor={name}>{label}</Label>
      <select id={name} name={name} className="site-select" defaultValue="">
        <option value="">{placeholder}</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {optionLabels[item] ?? item}
          </option>
        ))}
      </select>
    </div>
  );
}

function FieldError({ value }: { value?: string }) {
  return value ? (
    <p className="field-error" role="alert">
      {value}
    </p>
  ) : null;
}
