import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/generated/prisma/client";
import { PROCESS_IMAGE } from "@/lib/images";

export function ProcessSection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="bg-white">
      <div className="grid w-full lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-auto sm:min-h-[500px] lg:min-h-[600px]">
          <Image
            src={PROCESS_IMAGE}
            alt="Our process"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="store-x flex flex-col justify-center py-16 lg:py-24">
          <h2
            className="display-title text-[var(--color-text)]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            We believe
            <br />
            in our process
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--color-muted)]">
            {settings.footerAbout}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--color-muted)]">
            From sketch to final polish, every step is guided by artisans who
            understand that true luxury lies in the details you feel, not just
            the ones you see.
          </p>
          <Link
            href="/pages/about"
            className="mt-8 inline-flex w-fit border border-[var(--color-text)] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text)] transition hover:bg-[var(--color-text)] hover:text-white"
          >
            Discover our story
          </Link>
        </div>
      </div>
    </section>
  );
}
