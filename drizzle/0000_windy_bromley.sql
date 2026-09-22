CREATE TABLE "audit_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"business_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"website" text DEFAULT '' NOT NULL,
	"industry" text DEFAULT '' NOT NULL,
	"city" text DEFAULT '' NOT NULL,
	"goal" text NOT NULL,
	"problem" text DEFAULT '' NOT NULL,
	"budget" text NOT NULL,
	"message" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'NEW' NOT NULL,
	"design_score" integer,
	"mobile_score" integer,
	"conversion_score" integer,
	"seo_score" integer,
	"google_score" integer,
	"performance_score" integer,
	"trust_score" integer,
	"notes" text DEFAULT '' NOT NULL,
	"utm_source" text DEFAULT '' NOT NULL,
	"utm_medium" text DEFAULT '' NOT NULL,
	"utm_campaign" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"business_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"website" text DEFAULT '' NOT NULL,
	"service" text DEFAULT '' NOT NULL,
	"package_name" text DEFAULT '' NOT NULL,
	"message" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'NEW' NOT NULL,
	"source" text DEFAULT 'website' NOT NULL,
	"priority" text DEFAULT 'WARM' NOT NULL,
	"estimated_value" double precision,
	"notes" text DEFAULT '' NOT NULL,
	"utm_source" text DEFAULT '' NOT NULL,
	"utm_medium" text DEFAULT '' NOT NULL,
	"utm_campaign" text DEFAULT '' NOT NULL,
	"utm_content" text DEFAULT '' NOT NULL,
	"utm_term" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "audits_status_idx" ON "audit_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "audits_email_idx" ON "audit_requests" USING btree ("email");--> statement-breakpoint
CREATE INDEX "audits_created_at_idx" ON "audit_requests" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status");--> statement-breakpoint
CREATE INDEX "leads_email_idx" ON "leads" USING btree ("email");--> statement-breakpoint
CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "newsletter_email_idx" ON "newsletter_subscribers" USING btree ("email");