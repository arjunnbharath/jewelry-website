"use client";

export function Newsletter() {
  return (
    <section className="border-y border-[#F0F0F0] bg-[#FAFAFA]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left lg:px-8">
        <div className="max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-primary)]">
            Stay Connected
          </p>
          <h2 className="mt-3 font-serif text-2xl text-[var(--color-text)] sm:text-3xl">
            Join our inner circle
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            Be the first to know about new arrivals, exclusive offers, and styling tips.
          </p>
        </div>
        <form
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 rounded-none border border-[#E5E5E5] bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[var(--color-primary)]"
          />
          <button type="submit" className="btn-primary shrink-0 px-8">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
