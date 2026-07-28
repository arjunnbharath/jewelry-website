import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/generated/prisma/client";

export function LuminaHero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-black sm:min-h-[75vh] lg:min-h-[90vh]">
      <Image
        src={settings.heroImageUrl}
        alt="New Collection"
        fill
        priority
        className="object-cover object-top opacity-90"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-5 sm:min-h-[75vh] lg:min-h-[90vh] lg:px-8">
        <div className="w-full max-w-lg">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/60 sm:hidden">
            New Collection
          </p>
          <div className="mt-2 flex items-end gap-3 sm:mt-0 sm:items-start sm:gap-2">
            <h1
              className="font-serif font-bold leading-[0.9] tracking-tight text-gradient-silver"
              style={{ fontSize: "clamp(3rem, 14vw, 9rem)" }}
            >
              NEW
            </h1>
            <p
              className="mb-2 hidden text-[11px] font-medium uppercase tracking-[0.4em] text-white/60 sm:mb-0 sm:mt-4 sm:block sm:[writing-mode:vertical-lr]"
              style={{ textOrientation: "mixed" }}
            >
              Collection
            </p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70 sm:mt-6">
            {settings.heroSubtitle}
          </p>
          <Link
            href={settings.heroCtaLink}
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 border border-white/40 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition active:bg-white active:text-black sm:mt-8 sm:text-[11px]"
          >
            {settings.heroCtaText}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
