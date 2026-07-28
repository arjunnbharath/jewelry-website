import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/generated/prisma/client";
import { FALLBACK_PRODUCT_IMAGE } from "@/lib/images";
import { formatPrice, parseImages } from "@/lib/utils";
import type { SiteSettings } from "@/generated/prisma/client";

type CraftSectionProps = {
  products: Product[];
  settings: SiteSettings;
};

export function CraftSection({ products, settings }: CraftSectionProps) {
  const highlights = products.slice(0, 3);

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-16 lg:px-12 lg:py-24">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--color-muted)]">
            Our Story
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-[var(--color-text)] sm:text-4xl lg:text-[2.75rem]">
            Crafting Moments
            <br />
            Into Gold
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--color-muted)]">
            {settings.footerAbout}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/pages/about"
              className="inline-flex min-h-[44px] items-center gap-2 border border-[var(--color-text)] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition active:bg-[var(--color-text)] active:text-white sm:text-[11px] sm:hover:bg-[var(--color-text)] sm:hover:text-white"
            >
              Discover Our Story
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/pages/contact"
              className="inline-flex min-h-[44px] items-center gap-2 border border-[var(--color-border)] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-muted)] transition active:border-[var(--color-text)] active:text-[var(--color-text)] sm:text-[11px] sm:hover:border-[var(--color-text)] sm:hover:text-[var(--color-text)]"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] lg:border-l lg:border-t-0">
          {highlights.map((product, i) => {
            const images = parseImages(product.images);
            const image = images[0] ?? FALLBACK_PRODUCT_IMAGE;
            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex flex-col gap-4 border-b border-[var(--color-border)] px-5 py-6 transition hover:bg-[#FAFAFA] sm:flex-row sm:items-center sm:gap-6 sm:py-8 lg:px-10"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="font-serif text-2xl text-[var(--color-border)] transition group-hover:text-[var(--color-primary)] sm:text-3xl">
                    0{i + 1}
                  </span>
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#F5F5F5] sm:h-20 sm:w-20">
                    <Image src={image} alt={product.name} fill className="object-cover" sizes="80px" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    {product.name.split(" ")[0]}
                  </p>
                  <h3 className="mt-1 truncate font-serif text-lg text-[var(--color-text)] group-hover:text-[var(--color-primary)]">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {formatPrice(product.salePrice ?? product.price, settings.currencySymbol)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
