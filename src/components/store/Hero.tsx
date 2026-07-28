import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/generated/prisma/client";

export function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative min-h-[75vh] overflow-hidden">
      <Image
        src={settings.heroImageUrl}
        alt={settings.heroTitle}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative flex min-h-[75vh] flex-col items-center justify-center px-5 text-center text-white">
        <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/80">
          Fine Jewelry
        </p>
        <h1 className="mt-4 max-w-2xl font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
          {settings.heroTitle.replace(/\*([^*]+)\*/g, "$1")}
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
          {settings.heroSubtitle}
        </p>
        <Link
          href={settings.heroCtaLink}
          className="mt-8 border border-white px-8 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-[#111]"
        >
          {settings.heroCtaText}
        </Link>
      </div>
    </section>
  );
}
