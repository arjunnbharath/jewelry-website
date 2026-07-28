import Image from "next/image";
import Link from "next/link";
import { LIFESTYLE_IMAGE } from "@/lib/images";

export function BrandStory() {
  return (
    <section className="overflow-hidden bg-[#0A0A0A] text-white">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="relative min-h-[400px] lg:min-h-[520px]">
          <Image
            src={LIFESTYLE_IMAGE}
            alt="Craftsmanship"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0A0A]/40 lg:to-[#0A0A0A]" />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-primary)]">
            Our Craft
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
            Designed for moments that matter
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            Every piece in our collection is thoughtfully designed and carefully
            finished — from ethically sourced stones to the final polish. We
            believe fine jewelry should feel personal, lasting, and effortlessly
            beautiful.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/55">
            <li className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-[var(--color-primary)]" />
              Hand-finished by expert artisans
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-[var(--color-primary)]" />
              Conflict-free certified stones
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-[var(--color-primary)]" />
              Complimentary gift packaging
            </li>
          </ul>
          <Link href="/pages/about" className="btn-outline mt-10 w-fit border-white/20 text-white hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
