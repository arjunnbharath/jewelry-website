import Image from "next/image";
import Link from "next/link";
import type { Product, SiteSettings } from "@/generated/prisma/client";
import { FALLBACK_PRODUCT_IMAGE } from "@/lib/images";
import { formatPrice, getEffectivePrice, parseImages } from "@/lib/utils";

type BestsellersScrollProps = {
  products: Product[];
  settings: SiteSettings;
};

export function BestsellersScroll({ products, settings }: BestsellersScrollProps) {
  const items = products.slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="bg-silk border-t border-[var(--color-border)] py-10 sm:py-12">
      <div className="store-x w-full">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text)]">
            Bestsellers
          </h2>
          <Link
            href="/products"
            className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted)] hover:text-[var(--color-text)]"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-5">
          {items.map((product) => {
            const images = parseImages(product.images);
            const image = images[0] ?? FALLBACK_PRODUCT_IMAGE;
            const price = getEffectivePrice(product.price, product.salePrice);

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden bg-white/60 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    className="object-cover p-1.5 transition duration-300 group-hover:opacity-90 sm:p-2"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <p className="mt-2.5 truncate text-[11px] text-[var(--color-text)]">
                  {product.name}
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--color-muted)]">
                  {formatPrice(price, settings.currencySymbol)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
