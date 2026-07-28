import { notFound } from "next/navigation";
import { ShopCatalog } from "@/components/store/ShopCatalog";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const settings = await getSiteSettings();

  const [category, products, categories] = await Promise.all([
    prisma.category.findUnique({
      where: { slug, isVisible: true },
    }),
    prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.category.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: "asc" },
      include: {
        _count: {
          select: {
            products: { where: { isActive: true } },
          },
        },
      },
    }),
  ]);

  if (!category) notFound();

  return (
    <ShopCatalog
      products={products}
      categories={categories}
      settings={settings}
      title={category.name}
      initialCategory={category.id}
    />
  );
}
