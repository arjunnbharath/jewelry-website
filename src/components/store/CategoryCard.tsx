import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/generated/prisma/client";

export function CategoryCard({ category }: { category: Category }) {
  const image =
    category.imageUrl ??
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80";

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface)]">
        <Image
          src={image}
          alt={category.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="font-serif text-xl">{category.name}</h3>
          <span className="mt-1 inline-block text-xs text-white/70 opacity-0 transition group-hover:opacity-100">
            View collection →
          </span>
        </div>
      </div>
    </Link>
  );
}
