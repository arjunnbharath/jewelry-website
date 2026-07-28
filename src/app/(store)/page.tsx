import { BestsellersScroll } from "@/components/store/BestsellersScroll";
import { CreatingSection } from "@/components/store/CreatingSection";
import { EmotionSection } from "@/components/store/EmotionSection";
import { ProcessSection } from "@/components/store/ProcessSection";
import { SimHero } from "@/components/store/SimHero";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site";

export default async function HomePage() {
  const settings = await getSiteSettings();

  const [featuredProducts, categories, allProducts] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      orderBy: { sortOrder: "asc" },
      take: 4,
    }),
    prisma.category.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: "asc" },
      take: 4,
    }),
    prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  return (
    <>
      <SimHero settings={settings} />
      <CreatingSection products={featuredProducts} settings={settings} />
      <EmotionSection categories={categories} />
      <BestsellersScroll products={allProducts} settings={settings} />
      <ProcessSection settings={settings} />
    </>
  );
}
