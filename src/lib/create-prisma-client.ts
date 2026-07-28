import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/generated/prisma/client";

export function createPrismaClient() {
  const url = process.env.DATABASE_URL || "file:./dev.db";

  const adapter = url.startsWith("libsql://")
    ? new PrismaLibSql({
        url,
        authToken: process.env.DATABASE_AUTH_TOKEN,
      })
    : new PrismaBetterSqlite3({ url });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}
