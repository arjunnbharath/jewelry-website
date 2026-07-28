"use client";

import Image from "next/image";
import Link from "next/link";
import { parseImages } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  _count: { products: number };
};

type FeaturedProduct = {
  id: string;
  name: string;
  slug: string;
  images: string;
};

type ShopMegaMenuProps = {
  open: boolean;
  categories: Category[];
  featuredProducts: FeaturedProduct[];
  onClose: () => void;
};

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "New Arrivals", href: "/products" },
  { label: "Sale", href: "/products" },
];

const spotlightLinks = [
  { label: "Gift Guide", href: "/products" },
  { label: "Best Sellers", href: "/products" },
  { label: "Under $500", href: "/products" },
];

export function ShopMegaMenu({
  open,
  categories,
  featuredProducts,
  onClose,
}: ShopMegaMenuProps) {
  const highlight = featuredProducts[0];
  const highlightImage = highlight ? parseImages(highlight.images)[0] : null;

  return (
    <div
      className={`absolute left-0 right-0 top-full z-40 grid border-t border-[#e5e5e5] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
      onMouseLeave={onClose}
    >
      <div className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {/* Shop */}
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-text)]">
                Shop
              </p>
              <ul className="space-y-1.5">
                {shopLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="text-[12px] text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories — compact 2-column list */}
            <div className="sm:col-span-2">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-text)]">
                Categories
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/categories/${category.slug}`}
                      onClick={onClose}
                      className="text-[12px] text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spotlight */}
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-text)]">
                Spotlight
              </p>
              <ul className="space-y-1.5">
                {spotlightLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="text-[12px] text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's New — compact */}
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-text)]">
                New
              </p>
              {highlight && highlightImage ? (
                <Link
                  href={`/products/${highlight.slug}`}
                  onClick={onClose}
                  className="group flex items-center gap-3"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-[#f5f5f5]">
                    <Image
                      src={highlightImage}
                      alt={highlight.name}
                      fill
                      className="object-cover transition group-hover:scale-105"
                      sizes="48px"
                    />
                  </div>
                  <span className="line-clamp-2 text-[12px] leading-snug text-[var(--color-muted)] group-hover:text-[var(--color-text)]">
                    {highlight.name}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/products"
                  onClick={onClose}
                  className="text-[12px] text-[var(--color-muted)] hover:text-[var(--color-text)]"
                >
                  View all →
                </Link>
              )}
            </div>
          </div>

          {/* Compact bottom strip */}
          <div className="mt-4 flex items-center justify-between border-t border-[#eee] pt-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
              From the Collection
            </p>
            <div className="flex items-center gap-3">
              {featuredProducts.slice(0, 3).map((product) => {
                const img = parseImages(product.images)[0];
                if (!img) return null;
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="relative h-10 w-8 overflow-hidden bg-[#f5f5f5]"
                  >
                    <Image src={img} alt={product.name} fill className="object-cover" sizes="32px" />
                  </Link>
                );
              })}
              <Link
                href="/products"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-text)] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-text)] transition hover:bg-[var(--color-text)] hover:text-white"
              >
                Shop All
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
