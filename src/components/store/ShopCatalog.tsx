"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import type { Category, Product, SiteSettings } from "@/generated/prisma/client";
import { ProductCard } from "@/components/store/ProductCard";
import { getEffectivePrice } from "@/lib/utils";

type ProductWithCategory = Product & { category: Category | null };
type CategoryWithCount = Category & { _count: { products: number } };

type ShopCatalogProps = {
  products: ProductWithCategory[];
  categories: CategoryWithCount[];
  settings: SiteSettings;
  title?: string;
  initialCategory?: string;
};

type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ShopCatalog({
  products,
  categories,
  settings,
  title = "All Pieces",
  initialCategory = "all",
}: ShopCatalogProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result =
      activeCategory === "all"
        ? [...products]
        : products.filter((p) => p.categoryId === activeCategory);

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "price-asc":
          return getEffectivePrice(a.price, a.salePrice) - getEffectivePrice(b.price, b.salePrice);
        case "price-desc":
          return getEffectivePrice(b.price, b.salePrice) - getEffectivePrice(a.price, a.salePrice);
        default:
          return a.sortOrder - b.sortOrder;
      }
    });
    return result;
  }, [products, activeCategory, sortBy]);

  const activeLabel =
    activeCategory === "all"
      ? "All"
      : categories.find((c) => c.id === activeCategory)?.name ?? "All";

  return (
    <div className="bg-silk min-h-screen">
      <div className="store-x w-full py-6 sm:py-8">
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12 xl:grid-cols-[220px_1fr]">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text)]">
                {title}
                <span className="ml-2 font-normal text-[var(--color-muted)]">
                  ({filtered.length})
                </span>
              </p>
              <FilterGroup title="Category">
                <FilterLink
                  active={activeCategory === "all"}
                  onClick={() => setActiveCategory("all")}
                  label="All Pieces"
                  count={products.length}
                />
                {categories.map((cat) => (
                  <FilterLink
                    key={cat.id}
                    active={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    label={cat.name}
                    count={cat._count.products}
                  />
                ))}
              </FilterGroup>

              <FilterGroup title="Sort by">
                {SORT_OPTIONS.map((opt) => (
                  <FilterLink
                    key={opt.value}
                    active={sortBy === opt.value}
                    onClick={() => setSortBy(opt.value)}
                    label={opt.label}
                  />
                ))}
              </FilterGroup>
            </div>
          </aside>

          {/* Main */}
          <div>
            {/* Mobile title */}
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text)] lg:hidden">
              {title}
              <span className="ml-2 font-normal text-[var(--color-muted)]">
                ({filtered.length})
              </span>
            </p>

            {/* Mobile filter bar */}
            <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex min-h-[40px] items-center gap-2 border border-[var(--color-border)] bg-white/60 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text)]"
              >
                Filter · {activeLabel}
                <span className="text-[var(--color-muted)]">{filtersOpen ? "−" : "+"}</span>
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="min-h-[40px] border border-[var(--color-border)] bg-white/60 px-3 text-[10px] uppercase tracking-[0.1em] outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {filtersOpen && (
              <div className="mb-6 border border-[var(--color-border)] bg-white/60 p-4 lg:hidden">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-muted)]">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  <MobilePill
                    active={activeCategory === "all"}
                    onClick={() => { setActiveCategory("all"); setFiltersOpen(false); }}
                    label="All"
                  />
                  {categories.map((cat) => (
                    <MobilePill
                      key={cat.id}
                      active={activeCategory === cat.id}
                      onClick={() => { setActiveCategory(cat.id); setFiltersOpen(false); }}
                      label={cat.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
                <p className="text-sm text-[var(--color-muted)]">No pieces in this category.</p>
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className="mt-4 text-[10px] uppercase tracking-[0.15em] text-[var(--color-text)] underline"
                >
                  View all pieces
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10 xl:grid-cols-4">
                {filtered.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    settings={settings}
                    categoryName={product.category?.name}
                    priority={i < 4}
                    minimal
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text)]">
        {title}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function FilterLink({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between py-1.5 text-left text-xs transition ${
        active
          ? "font-medium text-[var(--color-text)]"
          : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span className="text-[10px] tabular-nums text-[var(--color-muted)]">{count}</span>
      )}
    </button>
  );
}

function MobilePill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[32px] px-3 text-[10px] uppercase tracking-[0.12em] ${
        active
          ? "bg-black text-white"
          : "border border-[var(--color-border)] text-[var(--color-muted)]"
      }`}
    >
      {label}
    </button>
  );
}
