import { z } from "zod";

const optionalUrl = z.string().trim().max(300).refine((value) => !value || /^https?:\/\/.+/i.test(value), "Enter a full website address starting with http:// or https://");
const attribution = {
  utmSource: z.string().trim().max(120).optional().default(""),
  utmMedium: z.string().trim().max(120).optional().default(""),
  utmCampaign: z.string().trim().max(160).optional().default(""),
  utmContent: z.string().trim().max(160).optional().default(""),
  utmTerm: z.string().trim().max(160).optional().default(""),
};

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  businessName: z.string().trim().min(2, "Enter your business name").max(140),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z.string().trim().max(40).optional().default(""),
  website: optionalUrl.optional().default(""),
  service: z.string().trim().max(100).optional().default(""),
  packageName: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(10, "Tell us a little more about the project").max(3000),
  companyWebsite: z.string().max(0).optional().default(""),
  turnstileToken: z.string().optional().default(""),
  ...attribution,
});

export const auditSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  businessName: z.string().trim().min(2, "Enter your business name").max(140),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z.string().trim().max(40).optional().default(""),
  website: z.string().trim().min(1, "Enter your website address").max(300).refine((value) => /^https?:\/\/.+/i.test(value), "Enter a full website address starting with http:// or https://"),
  industry: z.string().trim().max(120).optional().default(""),
  city: z.string().trim().max(100).optional().default(""),
  goal: z.string().trim().min(2, "Choose a main goal").max(100),
  problem: z.string().trim().max(1200).optional().default(""),
  budget: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().max(3000).optional().default(""),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  companyWebsite: z.string().max(0).optional().default(""),
  turnstileToken: z.string().optional().default(""),
  ...attribution,
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(200),
  companyWebsite: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type AuditInput = z.infer<typeof auditSchema>;
