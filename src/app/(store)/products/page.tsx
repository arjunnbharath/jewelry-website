import { ShopCatalog } from "@/components/store/ShopCatalog";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site";

export default async function ProductsPage() {
  const settings = await getSiteSettings();

  const [products, categories] = await Promise.all([
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

  return (
    <ShopCatalog
      products={products}
      categories={categories}
      settings={settings}
    />
  );
}
