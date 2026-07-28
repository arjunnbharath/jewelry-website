import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/generated/prisma/client";
import { HERO_BACKGROUND } from "@/lib/images";

const DEFAULT_BADGES = [
  "Fine Craftsmanship",
  "Ethically Sourced",
  "Lifetime Guarantee",
];

function renderHeroTitle(title: string) {
  const parts = title.split(/(\*[^*]+\*)/g).filter(Boolean);

  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic text-[var(--color-primary)]">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function SimHero({ settings }: { settings: SiteSettings }) {
  const image = HERO_BACKGROUND;
  const title = settings.heroTitle || settings.siteName;

  return (
    <section className="relative -mt-[73px] overflow-hidden bg-black">
      <div className="relative h-screen min-h-[600px] w-full">
        {/* Background — slight zoom-out via oversized frame, no black edges */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2">
            <Image
              src={image}
              alt={settings.siteName}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
        </div>

        <div className="store-x relative flex h-full flex-col justify-end pb-10 pt-[calc(73px+1.5rem)] sm:pb-12 sm:pt-[calc(73px+2rem)]">
          <div className="max-w-xl">
            <p className="section-label text-white/55">{settings.tagline}</p>
            <h1 className="hero-title mt-4 max-w-lg text-white">{renderHeroTitle(title)}</h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:mt-5 sm:text-base">
              {settings.heroSubtitle}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <Link
                href={settings.heroCtaLink}
                className="inline-flex min-h-[44px] items-center bg-white px-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-[var(--color-primary)] sm:min-h-[48px] sm:px-8"
              >
                {settings.heroCtaText}
              </Link>
              <Link
                href="/pages/about"
                className="inline-flex min-h-[44px] items-center border border-white/30 px-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white hover:bg-white/10 sm:min-h-[48px] sm:px-8"
              >
                Our Story
              </Link>
            </div>
          </div>

          <div className="mt-8 hidden items-end justify-between border-t border-white/10 pt-5 sm:flex">
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.18em] text-white/40 lg:gap-10">
              {DEFAULT_BADGES.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
            <a
              href="#collections"
              className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/40 transition hover:text-white"
            >
              <span>Scroll</span>
              <span className="block h-7 w-px animate-pulse bg-white/40" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
