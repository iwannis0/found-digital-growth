import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  cacheDir: ".sites-runtime/tests/audit-performance",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true, hmr: false, ws: false },
});

after(async () => vite.close());

test("schema and migration add a nullable performance_score column", async () => {
  const schema = await readFile(new URL("../db/schema.ts", import.meta.url), "utf8");
  const migration = await readFile(new URL("../drizzle/0001_secret_ares.sql", import.meta.url), "utf8");
  assert.match(schema, /performanceScore: integer\("performance_score"\)/);
  assert.match(migration, /ALTER TABLE `audit_requests` ADD `performance_score` integer/);
  assert.doesNotMatch(migration, /NOT NULL/);
});

test("Performance accepts integers from 0 to 10 and rejects invalid values", async () => {
  const { auditScoreFields } = await vite.ssrLoadModule("/lib/audit-scoring.ts");
  assert.equal(auditScoreFields.performanceScore.safeParse(0).success, true);
  assert.equal(auditScoreFields.performanceScore.safeParse(10).success, true);
  assert.equal(auditScoreFields.performanceScore.safeParse(null).success, true);
  assert.equal(auditScoreFields.performanceScore.safeParse(-1).success, false);
  assert.equal(auditScoreFields.performanceScore.safeParse(11).success, false);
  assert.equal(auditScoreFields.performanceScore.safeParse(5.5).success, false);
});

test("overall score includes all seven categories", async () => {
  const { auditTotal } = await vite.ssrLoadModule("/lib/audit-scoring.ts");
  assert.equal(auditTotal({ designScore: 20, mobileScore: 20, conversionScore: 20, seoScore: 15, googleScore: 15, performanceScore: 10, trustScore: 10 }), 110);
  assert.equal(auditTotal({ id: 1, name: "Test User", email: "test@example.com", designScore: 1, mobileScore: 2, conversionScore: 3, seoScore: 4, googleScore: 5, performanceScore: 6, trustScore: 7 }), 28);
  assert.equal(auditTotal({ designScore: null, mobileScore: null, conversionScore: null, seoScore: null, googleScore: null, performanceScore: null, trustScore: null }), null);
});

test("admin audit editor loads, displays and submits Performance", async () => {
  const ui = await readFile(new URL("../components/admin-audits-table.tsx", import.meta.url), "utf8");
  const route = await readFile(new URL("../app/api/admin/audits/[id]/route.ts", import.meta.url), "utf8");
  assert.match(ui, /performanceScore: row\.performanceScore/);
  assert.match(ui, /\["performanceScore", "Performance", 10\]/);
  assert.match(ui, /body: JSON\.stringify\(\{ status, notes, \.\.\.scores \}\)/);
  assert.match(ui, /auditTotal\(\{ \.\.\.row, \.\.\.scores \}\)/);
  assert.match(route, /\.\.\.auditScoreFields/);
});
