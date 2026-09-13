import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [table, auditRoute, exportRoute, auditsPage, dashboard] = await Promise.all([
  readFile(new URL("../components/admin-audits-table.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/api/admin/audits/[id]/route.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/api/admin/export/audits/route.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/admin/audits/page.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/admin/page.tsx", import.meta.url), "utf8"),
]);

test("audit search and status filtering share the existing lead status list", () => {
  assert.match(table, /filter === "ALL" \|\| row\.status === filter/);
  assert.match(table, /<option value="ALL">All statuses<\/option>/);
  assert.match(table, /leadStatuses\.map/);
});

test("audit deletion requires confirmation and uses the authorized record route", () => {
  assert.match(table, /Delete this audit request\?/);
  assert.match(table, /AlertDialogAction variant="destructive" onClick=\{\(\) => remove\(row\.id\)\}/);
  assert.match(table, /fetch\(`\/api\/admin\/audits\/\$\{id\}`.*method: "DELETE"/);
  assert.match(auditRoute, /export async function DELETE/);
  assert.match(auditRoute, /requireAdminApi\(\)/);
  assert.match(auditRoute, /where\(eq\(auditRequests\.id,numericId\)\)/);
});

test("audit export uses protected CSV cells and includes every score", () => {
  assert.match(exportRoute, /requireAdminApi\(\)/);
  assert.match(exportRoute, /\.map\(csvCell\)/);
  for (const heading of ["Design Score", "Mobile Score", "Conversion Score", "SEO Score", "Google Score", "Performance Score", "Trust Score", "Overall Score"]) assert.match(exportRoute, new RegExp(`"${heading}"`));
  assert.match(auditsPage, /href="\/api\/admin\/export\/audits"/);
});

test("dashboard audit links open the selected audit and detail shows phone and message", () => {
  assert.match(dashboard, /href=\{`\/admin\/audits\?audit=\$\{audit\.id\}`\}/);
  assert.match(auditsPage, /selectedAuditId/);
  assert.match(table, /defaultOpen=\{row\.id === selectedAuditId\}/);
  assert.match(table, /<span>Phone<\/span>/);
  assert.match(table, /<span>Message \/ request details<\/span><p>\{row\.message/);
});
