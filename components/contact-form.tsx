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

const serviceOptions = [
  "Website Design & Development",
  "Website Redesign",
  "Local SEO",
  "Google Business",
  "Website Care",
  "Analytics & Tracking",
  "Conversion-Focused Design",
  "Lead & Booking Automation",
  "Other",
];

const packageOptions = [
  "Professional Website Foundation",
  "Custom Growth Website",
  "Advanced Digital Presence",
  "Not sure",
  "Custom",
];

export function ContactForm({
  initialPackage = "",
  initialService = "",
  locale,
  copy,
  formCopy,
}: {
  initialPackage?: string;
  initialService?: string;
  locale: Locale;
  copy: Dictionary["contactForm"];
  formCopy: Dictionary["forms"];
}) {
  const selectedPackage = packageOptions.includes(initialPackage)
    ? initialPackage
    : "";

  const selectedService = serviceOptions.includes(initialService)
    ? initialService
    : "";

  const [service, setService] = useState(selectedService);
  const [packageName, setPackageName] = useState(selectedPackage);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [message, setMessage] = useState("");
  const [fields, setFields] = useState<Record<string, string[]>>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setFields({});
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name"),
      businessName: data.get("businessName"),
      email: data.get("email"),
      phone: data.get("phone"),
      website: data.get("website"),
      service,
      packageName,
      message: data.get("message"),
      companyWebsite: data.get("companyWebsite"),
      locale,
      ...getAttribution(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        error?: string;
        message?: string;
        fields?: Record<string, string[]>;
      };

      if (!response.ok) {
        setFields(localizeFields(result.fields ?? {}, formCopy.fieldErrors));

        throw new Error(
          (result.error && formCopy.errors[result.error]) ?? result.message ?? copy.failed
        );
      }

      form.reset();
      setService("");
      setPackageName("");
      setStatus("success");

      trackEvent("generate_lead", {
        lead_type: "contact",
      });
    } catch (error) {
      setStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : formCopy.retry
      );
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 />

        <p className="eyebrow">
          {copy.successEyebrow}
        </p>

        <h2>
          {copy.successTitle}
        </h2>

        <button
          className="text-link"
          onClick={() => setStatus("idle")}
        >
          {copy.again}
        </button>
      </div>
    );
  }

  return (
    <form
      className="site-form"
      onSubmit={submit}
      noValidate
    >
      <p className="form-required-note">
        {formCopy.requiredBefore} <strong>*</strong> {formCopy.requiredAfter}
      </p>

      <div className="form-row">
        <Field
          label={copy.name}
          name="name"
          required
          error={fields.name?.[0]}
        />

        <Field
          label={copy.business}
          name="businessName"
          required
          error={fields.businessName?.[0]}
        />
      </div>

      <div className="form-row">
        <Field
          label={copy.email}
          name="email"
          type="email"
          required
          error={fields.email?.[0]}
        />

        <Field
          label={copy.phone}
          name="phone"
          type="tel"
          error={fields.phone?.[0]}
        />
      </div>

      <Field
        label={copy.website}
        name="website"
        type="url"
        placeholder="https://"
        error={fields.website?.[0]}
      />

      <div className="form-row">
        <SelectField
          label={copy.service}
          name="service"
          value={service}
          onChange={setService}
          options={serviceOptions}
          optionLabels={copy.optionLabels}
          placeholder={copy.chooseService}
        />

        <SelectField
          label={copy.package}
          name="package"
          value={packageName}
          onChange={setPackageName}
          options={packageOptions}
          optionLabels={copy.optionLabels}
          placeholder={copy.choosePackage}
        />
      </div>

      <div className="form-field">
        <Label htmlFor="message">
          {copy.message} *
        </Label>

        <Textarea
          id="message"
          name="message"
          rows={7}
          required
          aria-invalid={Boolean(fields.message)}
        />

        <FieldError value={fields.message?.[0]} />
      </div>

      <div
        className="honeypot"
        aria-hidden="true"
      >
        <label>
          Company website

          <input
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {status === "error" && (
        <p
          className="form-error-banner"
          role="alert"
        >
          {message}
        </p>
      )}

      <button
        className="button button-accent button-large form-submit"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          copy.sending
        ) : (
          <>
            {copy.submit} <ArrowRight />
          </>
        )}
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
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
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
        aria-invalid={Boolean(error)}
      />

      <FieldError value={error} />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  optionLabels,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  optionLabels: Record<string, string>;
  placeholder: string;
}) {
  return (
    <div className="form-field">
      <Label htmlFor={name}>
        {label}
      </Label>

      <select
        id={name}
        name={name}
        className="site-select"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((item) => (
          <option
            key={item}
            value={item}
          >
            {optionLabels[item] ?? item}
          </option>
        ))}
      </select>
    </div>
  );
}

function FieldError({
  value,
}: {
  value?: string;
}) {
  return value ? (
    <p
      className="field-error"
      role="alert"
    >
      {value}
    </p>
  ) : null;
}

/** In Greek, server messages (written in English) are swapped for the field's or error code's translation. */
function localizeFields(fields: Record<string, string[]>, translations: Record<string, string>) {
  return Object.fromEntries(Object.entries(fields).map(([field, messages]) => [field, translations[field] ? [translations[field]] : messages]));
}
