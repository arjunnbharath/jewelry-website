import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { FALLBACK_PRODUCT_IMAGE } from "@/lib/images";
import { prisma } from "@/lib/prisma";
import {
  formatPrice,
  getEffectivePrice,
  getSiteSettings,
  isInStock,
  parseImages,
} from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const settings = await getSiteSettings();

  const product = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: { category: true },
  });

  if (!product) notFound();

  const images = parseImages(product.images);
  const mainImage = images[0] ?? FALLBACK_PRODUCT_IMAGE;
  const effectivePrice = getEffectivePrice(product.price, product.salePrice);
  const onSale = product.salePrice != null && product.salePrice < product.price;
  const inStock = isInStock(product.stock);

  return (
    <div className="bg-white">
      <div className="store-x w-full py-8 sm:py-12 lg:py-16">
        <nav className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted)]">
          <Link href="/" className="hover:text-[var(--color-text)]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[var(--color-text)]">Shop</Link>
          <span>/</span>
          <span className="text-[var(--color-text)]">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-square overflow-hidden bg-[var(--color-cream)]">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover p-3 sm:p-4"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col justify-center lg:py-8">
            {product.category && (
              <Link
                href={`/categories/${product.category.slug}`}
                className="section-label text-[var(--color-muted)]"
              >
                {product.category.name}
              </Link>
            )}
            <h1
              className="display-title mt-3 text-[var(--color-text)]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              {product.name}
            </h1>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-xl text-[var(--color-text)]">
                {formatPrice(effectivePrice, settings.currencySymbol)}
              </span>
              {onSale && (
                <span className="text-sm text-[var(--color-muted)] line-through">
                  {formatPrice(product.price, settings.currencySymbol)}
                </span>
              )}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[var(--color-muted)]">
              {product.description}
            </p>

            <p className="mt-4 text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted)]">
              {inStock ? `${product.stock} available` : "Sold out"}
            </p>

            <div className="mt-8 max-w-sm">
              <AddToCartButton
                productId={product.id}
                name={product.name}
                slug={product.slug}
                price={effectivePrice}
                image={mainImage}
                inStock={inStock}
              />
            </div>

            <div className="mt-8 space-y-2 border-t border-[var(--color-border)] pt-8 text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted)]">
              <p>✦ Complimentary shipping over $150</p>
              <p>✦ 30-day returns</p>
              <p>✦ Lifetime craftsmanship guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
