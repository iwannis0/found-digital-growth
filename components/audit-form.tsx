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

const goals = [
  "Get more enquiries / leads",
  "Improve my website",
  "Improve Google visibility",
  "Increase conversions",
  "Track website performance",
  "Launch a new website",
  "Not sure yet",
];

const budgets = [
  "Under €700",
  "€700-€1,000",
  "€1,000-€1,500",
  "€1,500-€3,000",
  "€3,000+",
  "Not sure",
];

export function AuditForm({
  locale,
  copy,
  formCopy,
}: {
  locale: Locale;
  copy: Dictionary["auditForm"];
  formCopy: Dictionary["forms"];
}) {
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [message, setMessage] = useState("");
  const [fields, setFields] = useState<Record<string, string[]>>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setMessage("");
    setFields({});

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name"),
      businessName: data.get("businessName"),
      email: data.get("email"),
      phone: data.get("phone"),
      website: data.get("website"),
      industry: data.get("industry"),
      city: data.get("city"),
      goal,
      problem: data.get("problem"),
      budget,
      message: data.get("message"),
      consent,
      companyWebsite: data.get("companyWebsite"),
      locale,
      ...getAttribution(),
    };

    try {
      const response = await fetch("/api/audit", {
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
      setGoal("");
      setBudget("");
      setConsent(false);
      setStatus("success");

      trackEvent("generate_lead", {
        lead_type: "free_audit",
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

        <p>
          {copy.successBody}
        </p>

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
      className="site-form audit-form"
      onSubmit={submit}
      noValidate
    >
      <p className="form-required-note">
        {formCopy.requiredBefore} <strong>*</strong> {formCopy.requiredAfter}
      </p>

      <fieldset className="form-step">
      <legend><span>1</span> {copy.stepAbout}</legend>

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
      </fieldset>

      <fieldset className="form-step">
      <legend><span>2</span> {copy.stepWebsite}</legend>

      <Field
        label={copy.website}
        name="website"
        type="url"
        placeholder="https://yourbusiness.com"
        required
        error={fields.website?.[0]}
      />

      <div className="form-row">
        <Field
          label={copy.industry}
          name="industry"
          placeholder={copy.industryPlaceholder}
          error={fields.industry?.[0]}
        />

        <Field
          label={copy.city}
          name="city"
          placeholder={copy.cityPlaceholder}
          error={fields.city?.[0]}
        />
      </div>
      </fieldset>

      <fieldset className="form-step">
      <legend><span>3</span> {copy.stepNeeds}</legend>

      <div className="form-row">
        <SelectField
          label={copy.goal}
          name="goal"
          value={goal}
          onChange={setGoal}
          options={goals}
          optionLabels={copy.optionLabels}
          placeholder={copy.chooseGoal}
          required
          error={fields.goal?.[0]}
        />

        <SelectField
          label={copy.budget}
          name="budget"
          value={budget}
          onChange={setBudget}
          options={budgets}
          optionLabels={copy.optionLabels}
          placeholder={copy.chooseBudget}
          error={fields.budget?.[0]}
        />
      </div>

      <div className="form-field">
        <Label htmlFor="problem">
          {copy.problem}
        </Label>

        <Textarea
          id="problem"
          name="problem"
          rows={4}
          placeholder={copy.problemPlaceholder}
          aria-invalid={Boolean(fields.problem)}
        />

        <FieldError value={fields.problem?.[0]} />
      </div>

      <div className="form-field">
        <Label htmlFor="audit-message">
          {copy.message}
        </Label>

        <Textarea
          id="audit-message"
          name="message"
          rows={4}
        />
      </div>
      </fieldset>

      <div className="consent-field">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          className="consent-checkbox"
          checked={consent}
          onChange={(event) =>
            setConsent(event.target.checked)
          }
          required
          aria-invalid={Boolean(fields.consent)}
        />

        <Label htmlFor="consent">
          {copy.consent}
        </Label>
      </div>

      <FieldError value={fields.consent?.[0]} />

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

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  optionLabels,
  placeholder,
  required,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  optionLabels: Record<string, string>;
  placeholder: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="form-field">
      <Label htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </Label>

      <select
        id={name}
        name={name}
        className="site-select"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        required={required}
        aria-invalid={Boolean(error)}
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

      <FieldError value={error} />
    </div>
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
