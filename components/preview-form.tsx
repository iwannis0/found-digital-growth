"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAttribution } from "@/lib/client-attribution";
import { trackEvent } from "@/components/analytics";

const cityOptions = ["Nicosia", "Limassol", "Larnaca", "Paphos", "Paralimni / Ayia Napa", "Elsewhere in Cyprus"];

const goalOptions = ["Call the business", "Book an appointment", "Send an enquiry", "Visit the shop or office", "Buy online"];

// Sent through the contact endpoint, so preview requests land in the same leads table,
// notification emails and integrations as every other enquiry.
export const previewService = "Free Website Preview";

export function PreviewForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fields, setFields] = useState<Record<string, string[]>>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setFields({});
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    if (!text("businessType")) {
      setFields({ businessType: ["Tell us what the business does"] });
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      return;
    }

    // Visitors often type a bare domain or social link; the endpoint needs a full address.
    const website = text("website");

    const summary = [
      "Free website preview request",
      `Business type: ${text("businessType")}`,
      `Area: ${text("city") || "Not given"}`,
      `Main action customers should take: ${text("goal") || "Not given"}`,
      `Current website or social page: ${website || "None"}`,
      text("notes") ? `\nNotes:\n${text("notes")}` : "",
    ].filter(Boolean).join("\n");

    const payload = {
      name: text("name"),
      businessName: text("businessName"),
      email: text("email"),
      phone: text("phone"),
      website: website && !/^https?:\/\//i.test(website) ? `https://${website}` : website,
      service: previewService,
      packageName: "",
      message: summary,
      companyWebsite: data.get("companyWebsite"),
      ...getAttribution(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string; fields?: Record<string, string[]> };

      if (!response.ok) {
        setFields(result.fields ?? {});
        throw new Error(result.message ?? "We could not send your request.");
      }

      form.reset();
      setStatus("success");

      trackEvent("generate_lead", { lead_type: "website_preview" });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 />
        <p className="eyebrow">Request received</p>
        <h2>Thank you. We will be in touch within two working days to confirm your preview.</h2>
        <button className="text-link" onClick={() => setStatus("idle")}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className="site-form" onSubmit={submit} noValidate>
      <p className="form-required-note">
        Fields marked <strong>*</strong> are required.
      </p>

      <div className="form-row">
        <Field label="Name" name="name" required autoComplete="name" error={fields.name?.[0]} />
        <Field label="Business name" name="businessName" required autoComplete="organization" error={fields.businessName?.[0]} />
      </div>

      <div className="form-row">
        <Field label="Email" name="email" type="email" required autoComplete="email" error={fields.email?.[0]} />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" error={fields.phone?.[0]} />
      </div>

      <Field
        label="What does the business do?"
        name="businessType"
        required
        placeholder="e.g. dental clinic, restaurant, electrician"
        error={fields.businessType?.[0]}
      />

      <div className="form-row">
        <SelectField label="Area" name="city" options={cityOptions} placeholder="Choose an area" />
        <SelectField label="What should visitors do?" name="goal" options={goalOptions} placeholder="Choose the main action" />
      </div>

      <Field
        label="Current website or social page"
        name="website"
        type="url"
        placeholder="Leave empty if you do not have one yet"
        error={fields.website?.[0]}
      />

      <div className="form-field">
        <Label htmlFor="preview-notes">Anything we should know?</Label>
        <Textarea
          id="preview-notes"
          name="notes"
          rows={5}
          placeholder="Websites you like, colours, services you want to highlight..."
        />
      </div>

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
        {status === "loading" ? "Sending..." : <>Request My Free Preview <ArrowRight /></>}
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

function SelectField({ label, name, options, placeholder }: { label: string; name: string; options: readonly string[]; placeholder: string }) {
  return (
    <div className="form-field">
      <Label htmlFor={name}>{label}</Label>
      <select id={name} name={name} className="site-select" defaultValue="">
        <option value="">{placeholder}</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
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
