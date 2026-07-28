"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/utils";
import { calculateShipping, FREE_SHIPPING_THRESHOLD } from "@/lib/checkout";

type CartContentProps = { currencySymbol: string };

export function CartContent({ currencySymbol }: CartContentProps) {
  const { items, updateQuantity, removeItem, subtotal, clearCart, totalItems } = useCart();
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;
  const toFree = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  if (items.length === 0) {
    return (
      <div className="bg-silk store-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-muted)]">
          Your bag
        </p>
        <h1
          className="display-title mt-4 text-[var(--color-text)]"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
        >
          Nothing here yet
        </h1>
        <p className="mt-4 max-w-xs text-[11px] leading-relaxed text-[var(--color-muted)]">
          Discover handcrafted pieces made to be worn, gifted, and kept.
        </p>
        <Link
          href="/products"
          className="mt-10 inline-flex min-h-[48px] items-center bg-black px-10 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[var(--color-primary)] hover:text-black"
        >
          Shop Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-silk min-h-screen pb-32 lg:pb-16">
      <div className="store-x w-full py-8 sm:py-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-border)] pb-6">
          <div>
            <CheckoutSteps current={1} />
            <h1 className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text)]">
              Your Bag
              <span className="ml-2 font-normal text-[var(--color-muted)]">
                ({totalItems})
              </span>
            </h1>
          </div>
          <Link
            href="/products"
            className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
          >
            Continue shopping
          </Link>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Line items */}
          <div className="lg:col-span-7">
            <ul className="divide-y divide-[var(--color-border)]">
              {items.map((item) => (
                <li key={item.productId} className="group py-6 first:pt-0 last:pb-0">
                  <div className="flex gap-4 sm:gap-6">
                    <Link
                      href={`/products/${item.slug}`}
                      className="relative h-28 w-24 shrink-0 overflow-hidden bg-white/70 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] sm:h-32 sm:w-28"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover p-1.5 transition duration-300 group-hover:opacity-90 sm:p-2"
                        sizes="112px"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <Link
                            href={`/products/${item.slug}`}
                            className="block truncate text-[11px] uppercase tracking-[0.06em] text-[var(--color-text)] transition hover:text-[var(--color-primary)] sm:text-xs"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-[10px] text-[var(--color-muted)]">
                            {formatPrice(item.price, currencySymbol)} each
                          </p>
                        </div>
                        <p className="shrink-0 text-[11px] font-medium text-[var(--color-text)] sm:text-xs">
                          {formatPrice(item.price * item.quantity, currencySymbol)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <QuantityControl
                          quantity={item.quantity}
                          onDecrease={() => updateQuantity(item.productId, item.quantity - 1)}
                          onIncrease={() => updateQuantity(item.productId, item.quantity + 1)}
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="text-[9px] uppercase tracking-[0.12em] text-[var(--color-muted)] underline-offset-2 transition hover:text-[var(--color-text)] hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-end border-t border-[var(--color-border)] pt-6">
              <button
                type="button"
                onClick={clearCart}
                className="text-[9px] uppercase tracking-[0.12em] text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
              >
                Clear bag
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 border border-[var(--color-border)] bg-white/75 p-6 backdrop-blur-sm sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text)]">
                Summary
              </p>

              {toFree > 0 ? (
                <div className="mt-5">
                  <div className="flex justify-between text-[9px] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                    <span>Free shipping</span>
                    <span>{Math.round(freeShippingProgress)}%</span>
                  </div>
                  <div className="mt-2 h-px overflow-hidden bg-[var(--color-border)]">
                    <div
                      className="h-full bg-black transition-all duration-500"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-[var(--color-muted)]">
                    Add {formatPrice(toFree, currencySymbol)} for complimentary delivery
                  </p>
                </div>
              ) : (
                <p className="mt-5 text-[10px] text-[var(--color-muted)]">
                  Complimentary shipping applied
                </p>
              )}

              <div className="mt-6 space-y-2.5 border-t border-[var(--color-border)] pt-5 text-[11px]">
                <Row label="Subtotal" value={formatPrice(subtotal, currencySymbol)} />
                <Row
                  label="Shipping"
                  value={shipping === 0 ? "Complimentary" : formatPrice(shipping, currencySymbol)}
                  muted
                />
                <div className="flex items-baseline justify-between border-t border-[var(--color-border)] pt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text)]">
                    Total
                  </span>
                  <span className="text-base font-medium text-[var(--color-text)]">
                    {formatPrice(total, currencySymbol)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 flex min-h-[50px] w-full items-center justify-center bg-black text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[var(--color-primary)] hover:text-black"
              >
                Checkout
              </Link>

              <ul className="mt-6 space-y-1.5 text-[9px] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                <li>Secure checkout</li>
                <li>Gift wrapping available</li>
                <li>30-day returns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile checkout bar */}
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-white/95 p-4 backdrop-blur-md lg:hidden">
        {toFree > 0 && (
          <p className="mb-2.5 text-center text-[9px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
            {formatPrice(toFree, currencySymbol)} from free shipping
          </p>
        )}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[9px] uppercase tracking-[0.12em] text-[var(--color-muted)]">Total</p>
            <p className="text-lg font-medium text-[var(--color-text)]">
              {formatPrice(total, currencySymbol)}
            </p>
          </div>
          <Link
            href="/checkout"
            className="flex min-h-[48px] flex-1 max-w-[200px] items-center justify-center bg-black text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="inline-flex items-center gap-3">
      <button
        type="button"
        onClick={onDecrease}
        className="flex h-7 w-7 items-center justify-center text-sm text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="min-w-[1.25rem] text-center text-[11px] tabular-nums text-[var(--color-text)]">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className="flex h-7 w-7 items-center justify-center text-sm text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className={muted ? "text-[var(--color-muted)]" : "text-[var(--color-text)]"}>
        {label}
      </span>
      <span className={muted ? "text-[var(--color-muted)]" : "text-[var(--color-text)]"}>
        {value}
      </span>
    </div>
  );
}

function CheckoutSteps({ current }: { current: 1 | 2 | 3 }) {
  const steps = ["Bag", "Checkout", "Confirmation"] as const;

  return (
    <ol className="flex items-center gap-2">
      {steps.map((step, index) => {
        const num = (index + 1) as 1 | 2 | 3;
        const isActive = num === current;
        const isDone = num < current;

        return (
          <li key={step} className="flex items-center gap-2">
            {index > 0 && (
              <span className="h-px w-4 bg-[var(--color-border)] sm:w-6" aria-hidden />
            )}
            <span
              className={`text-[9px] uppercase tracking-[0.14em] ${
                isActive
                  ? "font-semibold text-[var(--color-text)]"
                  : isDone
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-muted)]"
              }`}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
