import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

declare global {
  var __dbClient: ReturnType<typeof postgres> | undefined;
}

export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is unavailable. Set it to your Supabase Postgres connection string (Settings > Database > Connection string) before using the database."
    );
  }

  const client =
    globalThis.__dbClient ??
    (globalThis.__dbClient = postgres(connectionString, { prepare: false }));

  return drizzle(client, { schema });
}
