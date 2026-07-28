import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/generated/prisma/client";
import { LIFESTYLE_IMAGE } from "@/lib/images";

type EmotionSectionProps = {
  categories: Category[];
};

export function EmotionSection({ categories }: EmotionSectionProps) {
  return (
    <section className="overflow-hidden bg-black text-white">
      <div className="w-full">
        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[560px]">
            <Image
              src={LIFESTYLE_IMAGE}
              alt="Fine jewelry craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/80" />
          </div>

          {/* Copy */}
          <div className="store-x flex flex-col justify-center py-14 sm:py-16 lg:py-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
              Our Philosophy
            </p>
            <h2
              className="display-title mt-5"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
            >
              Emotion
              <br />
              <span className="text-white/50">embraces</span>
              <br />
              technique
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
              Fine jewelry is more than metal and stone. Each piece is shaped by
              hand, intended to mark the moments that words alone cannot hold.
            </p>

            {categories.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-8">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 transition hover:text-white"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href="/pages/about"
              className="mt-10 inline-flex w-fit items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:text-[var(--color-primary)]"
            >
              Discover our story
              <span className="block h-px w-8 bg-white/40" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
