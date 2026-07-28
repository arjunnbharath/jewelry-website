import {
  AwardIcon,
  GiftIcon,
  HeadsetIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/ui/Icons";

const trustItems = [
  {
    icon: TruckIcon,
    title: "Free Shipping",
    subtitle: "On orders over $100",
  },
  {
    icon: ShieldIcon,
    title: "Secure Payment",
    subtitle: "100% secure checkout",
  },
  {
    icon: AwardIcon,
    title: "Premium Quality",
    subtitle: "Finest materials",
  },
  {
    icon: ShieldIcon,
    title: "Easy Returns",
    subtitle: "30-day return policy",
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-[#EFEFEF] bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
        {trustItems.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 lg:flex-col lg:text-center"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FAFAFA] text-[var(--color-text)] lg:mx-auto">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-text)]">
                {item.title}
              </p>
              <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const footerFeatures = [
  {
    icon: AwardIcon,
    title: "Crafted with Care",
    subtitle: "Expert craftsmanship in every piece",
  },
  {
    icon: ShieldIcon,
    title: "Certified Diamonds",
    subtitle: "Conflict-free & certified stones",
  },
  {
    icon: GiftIcon,
    title: "Luxury Packaging",
    subtitle: "Beautiful packaging perfect for gifting",
  },
  {
    icon: HeadsetIcon,
    title: "Customer Support",
    subtitle: "We're here for you 7 days a week",
  },
];

export function FooterFeatures() {
  return (
    <div className="bg-[#0A0A0A]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {footerFeatures.map((item) => (
          <div key={item.title} className="text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-[var(--color-primary)]">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
