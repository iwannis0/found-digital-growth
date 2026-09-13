import { sql } from "drizzle-orm";
import { index, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable(
  "leads",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
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
    estimatedValue: real("estimated_value"),
    notes: text("notes").notNull().default(""),
    utmSource: text("utm_source").notNull().default(""),
    utmMedium: text("utm_medium").notNull().default(""),
    utmCampaign: text("utm_campaign").notNull().default(""),
    utmContent: text("utm_content").notNull().default(""),
    utmTerm: text("utm_term").notNull().default(""),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("leads_status_idx").on(table.status),
    index("leads_email_idx").on(table.email),
    index("leads_created_at_idx").on(table.createdAt),
  ],
);

export const auditRequests = sqliteTable(
  "audit_requests",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
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
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("audits_status_idx").on(table.status),
    index("audits_email_idx").on(table.email),
    index("audits_created_at_idx").on(table.createdAt),
  ],
);

export const newsletterSubscribers = sqliteTable(
  "newsletter_subscribers",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull().unique(),
    active: integer("active", { mode: "boolean" }).notNull().default(true),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("newsletter_email_idx").on(table.email)],
);

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
