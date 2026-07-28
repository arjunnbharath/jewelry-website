import {
  AwardIcon,
  GiftIcon,
  HeadsetIcon,
  ShieldIcon,
} from "@/components/ui/Icons";

const items = [
  { icon: AwardIcon, title: "Handcrafted Excellence", subtitle: "Artisan made" },
  { icon: ShieldIcon, title: "Ethically Sourced Diamonds", subtitle: "Conflict-free" },
  { icon: HeadsetIcon, title: "Lifetime Warranty", subtitle: "Guaranteed quality" },
  { icon: GiftIcon, title: "Complimentary Shipping", subtitle: "On all orders" },
];

export function ValueBar() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[#EEEBE6]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 py-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:px-8">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white">
              <item.icon className="h-4 w-4 text-[var(--color-text)]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[var(--color-text)] sm:text-[11px]">
                {item.title}
              </p>
              <p className="text-xs text-[var(--color-muted)]">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
