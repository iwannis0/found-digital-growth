import assert from "node:assert/strict";
import test, { after } from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", cacheDir: ".sites-runtime/tests/csv", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true, hmr: false, ws: false } });
after(async () => vite.close());
const { csvCell } = await vite.ssrLoadModule("/lib/csv.ts");

test("CSV cells escape quotes and neutralize spreadsheet formulas", () => {
  assert.equal(csvCell('FOUND "Growth"'), '"FOUND ""Growth"""');
  for (const value of ["=1+1", "+SUM(A1:A2)", "-2+3", "@IMPORTXML(A1)", "  =HYPERLINK(A1)"]) {
    assert.equal(csvCell(value), `"'${value}"`);
  }
});

test("ordinary values and numbers remain unchanged", () => {
  assert.equal(csvCell("FOUND Studio"), '"FOUND Studio"');
  assert.equal(csvCell(1250), '"1250"');
  assert.equal(csvCell(null), '""');
});
