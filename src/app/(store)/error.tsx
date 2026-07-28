"use client";

import Link from "next/link";

export default function StoreError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDatabaseError =
    error.message.includes("Database") ||
    error.message.includes("SQLite") ||
    error.message.includes("Turso") ||
    error.message.includes("DATABASE_URL");

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="max-w-lg text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
          Something went wrong
        </p>
        <h1 className="mt-4 font-serif text-3xl text-[var(--color-text)]">
          {isDatabaseError ? "Database not connected" : "Unable to load page"}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
          {isDatabaseError
            ? "This site needs a cloud database on Vercel. Add Turso from your Vercel project Storage tab, then set DATABASE_URL and DATABASE_AUTH_TOKEN in Environment Variables and redeploy."
            : "Please try again. If the problem continues, refresh the page."}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[44px] items-center bg-black px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center border border-[var(--color-border)] px-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text)]"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
