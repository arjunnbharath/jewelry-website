import Image from "next/image";
import Link from "next/link";

export function BespokeSection() {
  return (
    <section className="relative min-h-[320px] overflow-hidden sm:min-h-[380px] lg:min-h-[500px]">
      <Image
        src="https://images.unsplash.com/photo-1617032214709-985a229c4be9?w=1600&q=80"
        alt="Bespoke jewelry"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative flex min-h-[320px] flex-col items-center justify-center px-5 text-center sm:min-h-[380px] lg:min-h-[500px]">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/60">
          Bespoke
        </p>
        <h2 className="mt-4 max-w-lg font-serif text-2xl text-white sm:text-4xl lg:text-5xl">
          Your Vision, Our Craftsmanship
        </h2>
        <p className="mt-4 max-w-md text-sm text-white/60">
          Work with our master jewelers to create a one-of-a-kind piece that tells your unique story.
        </p>
        <Link
          href="/pages/contact"
          className="mt-8 inline-flex min-h-[44px] items-center gap-2 border border-white px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition active:bg-white active:text-black"
        >
          Create Your Dream Piece
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
