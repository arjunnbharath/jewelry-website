"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { placeOrder } from "@/app/(store)/actions";
import { useCart } from "@/components/providers/CartProvider";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  calculateShipping,
  FLAT_SHIPPING_RATE,
  FREE_SHIPPING_THRESHOLD,
} from "@/lib/checkout";
import { formatPrice } from "@/lib/utils";

type CheckoutFormProps = {
  currencySymbol: string;
};

export function CheckoutForm({ currencySymbol }: CheckoutFormProps) {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const result = await placeOrder({
      email: String(formData.get("email") || ""),
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      phone: String(formData.get("phone") || ""),
      addressLine1: String(formData.get("addressLine1") || ""),
      addressLine2: String(formData.get("addressLine2") || ""),
      city: String(formData.get("city") || ""),
      state: String(formData.get("state") || ""),
      postalCode: String(formData.get("postalCode") || ""),
      country: String(formData.get("country") || "US"),
      notes: String(formData.get("notes") || ""),
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    if (!result.success) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    clearCart();
    router.push(`/order/${result.orderNumber}`);
  }

  return (
    <div className="pb-16">
      <div className="store-x w-full py-8 sm:py-12 lg:py-16">
        <Breadcrumbs
          items={[
            { label: "Bag", href: "/cart" },
            { label: "Checkout" },
          ]}
        />

        <h1 className="font-serif text-2xl font-light sm:text-3xl">Checkout</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Complete your details below to place your order.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-3 lg:gap-12"
        >
          <div className="space-y-8 lg:col-span-2">
            <section className="border border-[var(--color-border)] p-5 sm:p-6">
              <h2 className="text-xs font-medium uppercase tracking-[0.2em]">
                Contact
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" required className="sm:col-span-2" />
                <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
              </div>
            </section>

            <section className="border border-[var(--color-border)] p-5 sm:p-6">
              <h2 className="text-xs font-medium uppercase tracking-[0.2em]">
                Shipping Address
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="First name" name="firstName" required />
                <Field label="Last name" name="lastName" required />
                <Field label="Address" name="addressLine1" required className="sm:col-span-2" />
                <Field
                  label="Apartment, suite, etc. (optional)"
                  name="addressLine2"
                  className="sm:col-span-2"
                />
                <Field label="City" name="city" required />
                <Field label="State / Province" name="state" required />
                <Field label="Postal code" name="postalCode" required />
                <Field label="Country" name="country" defaultValue="US" required />
              </div>
            </section>

            <section className="border border-[var(--color-border)] p-5 sm:p-6">
              <h2 className="text-xs font-medium uppercase tracking-[0.2em]">
                Order Notes
              </h2>
              <label className="mt-5 block">
                <span className="sr-only">Order notes</span>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Gift message, delivery instructions, etc."
                  className="w-full border border-[var(--color-border)] bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)]"
                />
              </label>
            </section>
          </div>

          <div>
            <div className="sticky top-24 border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h2 className="text-xs font-medium uppercase tracking-[0.2em]">
                Order Summary
              </h2>

              <ul className="mt-5 space-y-4">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-3">
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm">{item.name}</p>
                      <p className="mt-1 text-xs text-[var(--color-muted)]">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm">
                      {formatPrice(item.price * item.quantity, currencySymbol)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-2 border-t border-[var(--color-border)] pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-muted)]">Subtotal</span>
                  <span>{formatPrice(subtotal, currencySymbol)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-muted)]">Shipping</span>
                  <span>
                    {shipping === 0
                      ? "Free"
                      : formatPrice(shipping, currencySymbol)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-base font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total, currencySymbol)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="mt-3 text-xs text-[var(--color-muted)]">
                  Free shipping on orders over{" "}
                  {formatPrice(FREE_SHIPPING_THRESHOLD, currencySymbol)}.
                  Add{" "}
                  {formatPrice(
                    Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0),
                    currencySymbol,
                  )}{" "}
                  more to qualify.
                </p>
              )}

              {error && (
                <p className="mt-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full min-h-[48px] border border-[#111] bg-[#111] text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Placing order..." : "Place order"}
              </button>

              <p className="mt-3 text-center text-xs text-[var(--color-muted)]">
                Payment collected on delivery.{" "}
                {formatPrice(FLAT_SHIPPING_RATE, currencySymbol)} flat rate shipping.
              </p>

              <Link
                href="/cart"
                className="mt-4 flex min-h-[44px] items-center justify-center border border-[var(--color-border)] text-xs uppercase tracking-wider text-[var(--color-muted)]"
              >
                Back to bag
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  autoComplete,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1.5 block text-xs text-[var(--color-muted)]">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className="w-full border border-[var(--color-border)] bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)]"
      />
    </label>
  );
}
