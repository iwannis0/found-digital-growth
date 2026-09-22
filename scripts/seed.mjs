import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set. Point it at your Supabase Postgres connection string first.");
  process.exit(1);
}

const seedPath = fileURLToPath(new URL("./seed.sql", import.meta.url));
const seedSql = readFileSync(seedPath, "utf8");

const sql = postgres(connectionString, { prepare: false });
try {
  await sql.unsafe(seedSql);
  console.log("Seed applied.");
} finally {
  await sql.end();
}
