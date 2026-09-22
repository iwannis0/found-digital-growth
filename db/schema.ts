import { boolean, doublePrecision, index, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    businessName: text("business_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull().default(""),
    website: text("website").notNull().default(""),
    service: text("service").notNull().default(""),
    packageName: text("package_name").notNull().default(""),
    message: text("message").notNull().default(""),
    status: text("status").notNull().default("NEW"),
    source: text("source").notNull().default("website"),
    priority: text("priority").notNull().default("WARM"),
    estimatedValue: doublePrecision("estimated_value"),
    notes: text("notes").notNull().default(""),
    utmSource: text("utm_source").notNull().default(""),
    utmMedium: text("utm_medium").notNull().default(""),
    utmCampaign: text("utm_campaign").notNull().default(""),
    utmContent: text("utm_content").notNull().default(""),
    utmTerm: text("utm_term").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("leads_status_idx").on(table.status),
    index("leads_email_idx").on(table.email),
    index("leads_created_at_idx").on(table.createdAt),
  ],
);

export const auditRequests = pgTable(
  "audit_requests",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    businessName: text("business_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull().default(""),
    website: text("website").notNull().default(""),
    industry: text("industry").notNull().default(""),
    city: text("city").notNull().default(""),
    goal: text("goal").notNull(),
    problem: text("problem").notNull().default(""),
    budget: text("budget").notNull(),
    message: text("message").notNull().default(""),
    status: text("status").notNull().default("NEW"),
    designScore: integer("design_score"),
    mobileScore: integer("mobile_score"),
    conversionScore: integer("conversion_score"),
    seoScore: integer("seo_score"),
    googleScore: integer("google_score"),
    performanceScore: integer("performance_score"),
    trustScore: integer("trust_score"),
    notes: text("notes").notNull().default(""),
    utmSource: text("utm_source").notNull().default(""),
    utmMedium: text("utm_medium").notNull().default(""),
    utmCampaign: text("utm_campaign").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("audits_status_idx").on(table.status),
    index("audits_email_idx").on(table.email),
    index("audits_created_at_idx").on(table.createdAt),
  ],
);

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("newsletter_email_idx").on(table.email)],
);

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
