"use client";

import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";

type AddToCartButtonProps = {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  inStock: boolean;
};

export function AddToCartButton({
  productId,
  name,
  slug,
  price,
  image,
  inStock,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!inStock) {
    return (
      <button
        disabled
        className="w-full min-h-[48px] border border-[var(--color-border)] text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-muted)]"
      >
        Sold Out
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        addItem({ productId, name, slug, price, image });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }}
      className="w-full min-h-[52px] bg-[var(--color-espresso)] text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-black"
    >
      {added ? "Added to Bag ✓" : "Add to Bag →"}
    </button>
  );
}
