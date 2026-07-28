import { prisma } from "@/lib/prisma";
import type { SiteSettings } from "@/generated/prisma/client";

export {
  formatPrice,
  getEffectivePrice,
  isInStock,
  parseImages,
  slugify,
} from "@/lib/utils";

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });

  if (settings) return settings;

  return prisma.siteSettings.create({ data: { id: "default" } });
}

export async function getHeaderNav() {
  return prisma.navItem.findMany({
    where: { location: "HEADER", isVisible: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getFooterNav() {
  return prisma.navItem.findMany({
    where: { location: "FOOTER", isVisible: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getNavCategories() {
  return prisma.category.findMany({
    where: { isVisible: true },
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { products: true } },
    },
  });
}

export async function getNavFeaturedProducts() {
  return prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    orderBy: { sortOrder: "asc" },
    take: 3,
    select: {
      id: true,
      name: true,
      slug: true,
      images: true,
    },
  });
}
