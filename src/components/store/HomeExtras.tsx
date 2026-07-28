import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/generated/prisma/client";
import { FALLBACK_PRODUCT_IMAGE } from "@/lib/images";

const icons: Record<string, string> = {
  rings: "💍",
  necklaces: "📿",
  earrings: "✦",
  bracelets: "⭕",
};

export function CategoryIcons({ categories }: { categories: Category[] }) {
  return (
    <section className="border-b border-[var(--color-border)] bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="mb-4 text-center text-xs uppercase tracking-wider text-[var(--color-muted)] sm:hidden">
          Swipe to browse
        </p>
        <div className="scroll-snap-x flex justify-start gap-6 overflow-x-auto px-1 pb-2 sm:justify-center sm:gap-10 sm:overflow-visible sm:pb-0 lg:gap-14">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group flex w-[72px] shrink-0 snap-start flex-col items-center gap-3 sm:w-auto"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-border)] bg-[#FAFAFA] text-lg transition active:border-[var(--color-primary)] active:bg-[var(--color-primary)]/10 sm:h-16 sm:w-16 sm:text-xl sm:group-hover:border-[var(--color-primary)] sm:group-hover:bg-[var(--color-primary)]/10">
                {icons[cat.slug] ?? "◆"}
              </div>
              <span className="text-center text-xs uppercase tracking-[0.1em] text-[var(--color-muted)] group-hover:text-[var(--color-text)]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BestSellers({
  products,
  settings,
}: {
  products: Array<{
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice: number | null;
    images: string;
  }>;
  settings: { currencySymbol: string };
}) {
  return (
    <section className="bg-[var(--color-background)] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="mb-8 text-center font-serif text-2xl sm:text-3xl">Best Sellers</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {products.map((product) => {
            let image = "";
            try {
              const parsed = JSON.parse(product.images);
              image = Array.isArray(parsed) ? parsed[0] : "";
            } catch {
              image = "";
            }
            const price = product.salePrice ?? product.price;
            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group overflow-hidden bg-[#0a0a0a]"
              >
                <div className="relative aspect-square">
                  <Image
                    src={image || FALLBACK_PRODUCT_IMAGE}
                    alt={product.name}
                    fill
                    className="object-cover opacity-90 transition group-hover:opacity-100"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="p-3 text-center sm:p-4">
                  <h3 className="text-xs text-white/90 sm:text-sm">{product.name}</h3>
                  <p className="mt-1 text-xs text-[var(--color-primary)] sm:text-sm">
                    {settings.currencySymbol}{price.toFixed(2)}
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
