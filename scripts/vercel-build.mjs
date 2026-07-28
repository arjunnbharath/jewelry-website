import { execSync } from "node:child_process";

const url = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL;

if (
  url &&
  (url.startsWith("libsql://") ||
    url.startsWith("https://") ||
    url.startsWith("http://"))
) {
  console.log("Setting up remote database schema and seed data...");
  execSync("npx prisma db push", { stdio: "inherit" });
  execSync("npx tsx prisma/seed.ts", { stdio: "inherit" });
} else if (process.env.VERCEL) {
  console.warn(
    "Skipping database setup: add Turso in Vercel Storage and set DATABASE_URL + DATABASE_AUTH_TOKEN.",
  );
}
