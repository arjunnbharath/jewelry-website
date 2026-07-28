import Image from "next/image";
import Link from "next/link";
import type { Product, SiteSettings } from "@/generated/prisma/client";
import { FALLBACK_PRODUCT_IMAGE } from "@/lib/images";
import { formatPrice, parseImages } from "@/lib/utils";

type CreatingSectionProps = {
  products: Product[];
  settings: SiteSettings;
};

export function CreatingSection({ products, settings }: CreatingSectionProps) {
  const items = products.slice(0, 4);

  return (
    <section id="collections" className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="store-x w-full">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 lg:pt-4">
            <h2
              className="display-title text-[var(--color-text)]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
            >
              Creating,
              <br />
              Crafting
              <br />
              &amp; Wearing
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
              Each piece is thoughtfully designed to become part of your story —
              worn, cherished, and passed on.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-block text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text)] underline-offset-4 hover:underline"
            >
              View all pieces →
            </Link>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {items.map((product) => {
                const images = parseImages(product.images);
                const image = images[0] ?? FALLBACK_PRODUCT_IMAGE;
                const price = product.salePrice ?? product.price;

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[var(--color-cream)]">
                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        className="object-cover p-2 transition duration-500 group-hover:scale-105 sm:p-3"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted)]">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-[var(--color-text)]">
                        {formatPrice(price, settings.currencySymbol)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
