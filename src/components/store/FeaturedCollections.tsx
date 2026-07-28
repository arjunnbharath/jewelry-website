import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/generated/prisma/client";
import { FALLBACK_PRODUCT_IMAGE } from "@/lib/images";

const collectionLabels = [
  "Classic Elegance",
  "Modern Muse",
  "Bridal Dreams",
  "Everyday Luxe",
];

export function FeaturedCollections({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-[#0a0a0a] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-2xl text-white sm:text-3xl">Featured Collections</h2>
          <Link
            href="/products"
            className="text-[11px] uppercase tracking-[0.15em] text-white/50 hover:text-white"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((category, i) => {
            const image = category.imageUrl ?? FALLBACK_PRODUCT_IMAGE;
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-[#141414]"
              >
                <Image
                  src={image}
                  alt={category.name}
                  fill
                  className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {collectionLabels[i] ?? "Collection"}
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-white">{category.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[var(--color-primary)] opacity-100 lg:opacity-0 lg:transition lg:group-hover:opacity-100">
                    Explore <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
