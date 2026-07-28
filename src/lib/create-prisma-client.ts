import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/generated/prisma/client";

function getDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ||
    process.env.TURSO_DATABASE_URL ||
    (process.env.VERCEL ? undefined : "file:./dev.db")
  );
}

function getAuthToken(): string | undefined {
  return process.env.DATABASE_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;
}

function isRemoteDatabase(url: string) {
  return (
    url.startsWith("libsql://") ||
    url.startsWith("https://") ||
    url.startsWith("http://")
  );
}

export function createPrismaClient() {
  const url = getDatabaseUrl();

  if (!url) {
    throw new Error(
      "Database is not configured. On Vercel, add Turso from the Storage tab and set DATABASE_URL (or TURSO_DATABASE_URL) plus DATABASE_AUTH_TOKEN (or TURSO_AUTH_TOKEN).",
    );
  }

  if (isRemoteDatabase(url)) {
    const adapter = new PrismaLibSql({
      url,
      authToken: getAuthToken(),
    });

    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Local SQLite cannot run on Vercel. Connect Turso and set DATABASE_URL to a libsql:// connection string.",
    );
  }

  // Local development only — keep native SQLite out of the production bundle.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

  return new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url }),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}
