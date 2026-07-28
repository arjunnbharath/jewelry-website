"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteSettings } from "@/generated/prisma/client";
import { FALLBACK_PRODUCT_IMAGE, HERO_FALLBACK } from "@/lib/images";

const slides = [
  HERO_FALLBACK,
  FALLBACK_PRODUCT_IMAGE,
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1800&q=80",
];

type HeroSliderProps = {
  settings: SiteSettings;
};

function renderTitle(title: string) {
  const parts = title.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <span
          key={i}
          className="italic text-[var(--color-primary)]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {part.slice(1, -1)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function HeroSlider({ settings }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const image = settings.heroImageUrl || slides[0];

  return (
    <section className="relative overflow-hidden bg-[#F8F8F8]">
      <div className="relative min-h-[560px] lg:min-h-[680px]">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={index === 0 ? image : slide}
              alt={settings.heroTitle}
              fill
              priority={index === 0}
              className={`object-cover object-[center_20%] ${
                index === current ? "animate-ken-burns" : ""
              }`}
              sizes="100vw"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-4 sm:px-6 lg:min-h-[680px] lg:px-8">
          <div className="max-w-xl">
            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-primary)]">
              Timeless Beauty
            </p>
            <h1 className="animate-fade-up delay-100 mt-5 font-serif text-[2.5rem] leading-[1.1] text-[var(--color-text)] sm:text-5xl lg:text-[3.75rem]">
              {renderTitle(
                settings.heroTitle.includes("*")
                  ? settings.heroTitle
                  : "Jewelry That Tells *Your* Story",
              )}
            </h1>
            <p className="animate-fade-up delay-200 mt-6 max-w-md text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
              {settings.heroSubtitle}
            </p>
            <div className="animate-fade-up delay-300 mt-9 flex flex-wrap gap-4">
              <Link href={settings.heroCtaLink} className="btn-primary">
                {settings.heroCtaText}
                <span aria-hidden>→</span>
              </Link>
              <Link href="/pages/about" className="btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 text-lg text-[var(--color-text)] shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-white lg:flex"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 text-lg text-[var(--color-text)] shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-white lg:flex"
          aria-label="Next slide"
        >
          ›
        </button>

        <div className="absolute bottom-8 left-4 flex gap-2 sm:left-8 lg:left-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-8 bg-[var(--color-primary)]"
                  : "w-4 bg-black/20 hover:bg-black/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
