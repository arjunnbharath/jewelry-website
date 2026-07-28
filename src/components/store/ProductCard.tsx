import Image from "next/image";
import Link from "next/link";
import type { Product, SiteSettings } from "@/generated/prisma/client";
import { FALLBACK_PRODUCT_IMAGE } from "@/lib/images";
import {
  formatPrice,
  getEffectivePrice,
  isInStock,
  parseImages,
} from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  settings: SiteSettings;
  categoryName?: string | null;
  priority?: boolean;
  minimal?: boolean;
};

export function ProductCard({
  product,
  settings,
  categoryName,
  priority = false,
  minimal = false,
}: ProductCardProps) {
  const images = parseImages(product.images);
  const image = images[0] ?? FALLBACK_PRODUCT_IMAGE;
  const effectivePrice = getEffectivePrice(product.price, product.salePrice);
  const onSale = product.salePrice != null && product.salePrice < product.price;
  const inStock = isInStock(product.stock);

  if (minimal) {
    return (
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative aspect-square overflow-hidden bg-white/70 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover p-1.5 transition duration-300 group-hover:opacity-90 sm:p-2"
            sizes="(max-width: 640px) 50vw, 25vw"
            priority={priority}
          />
          {!inStock && (
            <span className="absolute inset-0 flex items-center justify-center bg-white/80 text-[9px] uppercase tracking-[0.15em] text-[var(--color-muted)]">
              Sold Out
            </span>
          )}
        </div>
        <div className="mt-3">
          {categoryName && (
            <p className="text-[9px] uppercase tracking-[0.15em] text-[var(--color-muted)]">
              {categoryName}
            </p>
          )}
          <h3 className="mt-0.5 truncate text-[11px] text-[var(--color-text)]">
            {product.name}
          </h3>
          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="text-[11px] text-[var(--color-text)]">
              {formatPrice(effectivePrice, settings.currencySymbol)}
            </span>
            {onSale && (
              <span className="text-[10px] text-[var(--color-muted)] line-through">
                {formatPrice(product.price, settings.currencySymbol)}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-[var(--color-cream)]">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover p-2 transition duration-700 group-hover:scale-[1.04] sm:p-3"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
        />
        {onSale && (
          <span className="absolute left-3 top-3 bg-black px-2 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-white">
            Sale
          </span>
        )}
        {!inStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/70 text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Sold Out
          </span>
        )}
      </div>
      <div className="mt-4 text-center">
        {categoryName && (
          <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {categoryName}
          </p>
        )}
        <h3 className="mt-1 text-[11px] uppercase tracking-[0.1em] text-[var(--color-text)]">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="text-xs text-[var(--color-text)]">
            {formatPrice(effectivePrice, settings.currencySymbol)}
          </span>
          {onSale && (
            <span className="text-[10px] text-[var(--color-muted)] line-through">
              {formatPrice(product.price, settings.currencySymbol)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
