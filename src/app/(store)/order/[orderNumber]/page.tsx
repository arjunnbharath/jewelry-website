import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderByNumber } from "@/lib/orders";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { formatPrice, getSiteSettings } from "@/lib/site";

type Props = { params: Promise<{ orderNumber: string }> };

export default async function OrderConfirmationPage({ params }: Props) {
  const { orderNumber } = await params;
  const [order, settings] = await Promise.all([
    getOrderByNumber(orderNumber),
    getSiteSettings(),
  ]);

  if (!order) notFound();

  const symbol = settings.currencySymbol;

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-5 sm:py-12 lg:py-16">
        <Breadcrumbs items={[{ label: "Order confirmed" }]} />

        <div className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Thank you
          </p>
          <h1 className="mt-3 font-serif text-2xl font-light sm:text-3xl">
            Your order is confirmed
          </h1>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            We&apos;ve received your order and will be in touch shortly. A
            confirmation has been sent to{" "}
            <span className="text-[var(--color-text)]">{order.email}</span>.
          </p>

          <div className="mt-6 grid gap-4 border-t border-[var(--color-border)] pt-6 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
                Order number
              </p>
              <p className="mt-1 font-medium">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
                Total
              </p>
              <p className="mt-1 font-medium">{formatPrice(order.total, symbol)}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <section className="border border-[var(--color-border)] p-5 sm:p-6">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em]">
              Shipping to
            </h2>
            <address className="mt-4 not-italic text-sm leading-relaxed">
              <p>
                {order.firstName} {order.lastName}
              </p>
              <p>{order.addressLine1}</p>
              {order.addressLine2 && <p>{order.addressLine2}</p>}
              <p>
                {order.city}, {order.state} {order.postalCode}
              </p>
              <p>{order.country}</p>
              {order.phone && <p className="mt-2">{order.phone}</p>}
            </address>
          </section>

          <section className="border border-[var(--color-border)] p-5 sm:p-6">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em]">
              Order summary
            </h2>
            <ul className="mt-4 space-y-4">
              {order.items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-white">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.productSlug}`}
                      className="line-clamp-2 text-sm hover:text-[var(--color-primary)]"
                    >
                      {item.productName}
                    </Link>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      Qty {item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm">
                    {formatPrice(item.price * item.quantity, symbol)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 border-t border-[var(--color-border)] pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">Subtotal</span>
                <span>{formatPrice(order.subtotal, symbol)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">Shipping</span>
                <span>
                  {order.shipping === 0
                    ? "Free"
                    : formatPrice(order.shipping, symbol)}
                </span>
              </div>
              <div className="flex justify-between pt-2 font-medium">
                <span>Total</span>
                <span>{formatPrice(order.total, symbol)}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center border border-[#111] bg-[#111] px-6 text-xs font-medium uppercase tracking-[0.2em] text-white"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center border border-[var(--color-border)] px-6 text-xs uppercase tracking-wider text-[var(--color-muted)]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
