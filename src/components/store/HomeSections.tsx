"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@/components/ui/Icons";

const testimonials = [
  {
    name: "Sarah M.",
    text: "The craftsmanship is extraordinary. My engagement ring exceeded every expectation.",
    rating: 5,
  },
  {
    name: "James L.",
    text: "Beautiful pieces and exceptional service. Will definitely return for anniversary gifts.",
    rating: 5,
  },
  {
    name: "Elena R.",
    text: "Luxury experience from start to finish. The bespoke consultation was wonderful.",
    rating: 5,
  },
];

const faqs = [
  { q: "Do you offer custom jewelry design?", a: "Yes! Book a consultation and our master jewelers will bring your vision to life." },
  { q: "What is your return policy?", a: "We offer a 30-day return policy on all non-custom pieces in original condition." },
  { q: "Are your diamonds certified?", a: "All our diamonds are conflict-free and come with certification upon request." },
  { q: "How long does shipping take?", a: "Standard shipping is 3-5 business days. Express options are available at checkout." },
];

export function Testimonials() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-center font-serif text-2xl sm:text-3xl">What Our Clients Say</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-[var(--color-border)] p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <StarIcon key={i} className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-[var(--color-text)]">
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-background)] py-16">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="text-center font-serif text-2xl">Need Help?</h2>
        <div className="mt-8 divide-y divide-[var(--color-border)] border border-[var(--color-border)] bg-white">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex min-h-[52px] w-full items-center justify-between px-4 py-4 text-left text-sm font-medium text-[var(--color-text)] sm:px-5"
              >
                {faq.q}
                <span className="text-lg text-[var(--color-muted)]">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-[var(--color-muted)]">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConsultationCTA() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-2 lg:px-8">
        <div className="relative min-h-[280px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1617032214709-985a229c4be9?w=800&q=80"
            alt="Store interior"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-muted)]">
            Visit Us
          </p>
          <h2 className="mt-3 font-serif text-3xl">Book a Consultation</h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
            Schedule a private appointment with our jewelry experts. We&apos;ll help you find
            the perfect piece or design something entirely unique.
          </p>
          <Link
            href="/pages/contact"
            className="mt-6 inline-flex w-fit items-center gap-2 border border-[var(--color-text)] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] transition hover:bg-[var(--color-text)] hover:text-white"
          >
            Schedule Now
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LuminaPromise() {
  return (
    <section className="bg-[#0a0a0a] py-12">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
        <h3 className="font-serif text-xl text-white">Luxury You Can Trust</h3>
        <div className="mt-6 flex flex-wrap justify-center gap-8 text-[11px] uppercase tracking-[0.12em] text-white/50">
          <span>Certified Diamonds</span>
          <span>·</span>
          <span>Secure Payments</span>
          <span>·</span>
          <span>Lifetime Warranty</span>
          <span>·</span>
          <span>Free Shipping</span>
        </div>
      </div>
    </section>
  );
}
