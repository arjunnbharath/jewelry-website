"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/site";

async function guard() {
  await requireAdmin();
}

export async function updateAppearance(formData: FormData) {
  await guard();

  await prisma.siteSettings.update({
    where: { id: "default" },
    data: {
      siteName: String(formData.get("siteName") || ""),
      tagline: String(formData.get("tagline") || ""),
      primaryColor: String(formData.get("primaryColor") || "#B8860B"),
      secondaryColor: String(formData.get("secondaryColor") || "#8B6914"),
      accentColor: String(formData.get("accentColor") || "#D4AF37"),
      backgroundColor: String(formData.get("backgroundColor") || "#FFFBF5"),
      textColor: String(formData.get("textColor") || "#2C2416"),
      mutedColor: String(formData.get("mutedColor") || "#6B5E4F"),
      heroTitle: String(formData.get("heroTitle") || ""),
      heroSubtitle: String(formData.get("heroSubtitle") || ""),
      heroImageUrl: String(formData.get("heroImageUrl") || ""),
      heroCtaText: String(formData.get("heroCtaText") || ""),
      heroCtaLink: String(formData.get("heroCtaLink") || ""),
      promoBannerText: String(formData.get("promoBannerText") || ""),
      promoBannerActive: formData.get("promoBannerActive") === "on",
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/appearance?saved=1");
}

export async function updateSettings(formData: FormData) {
  await guard();

  await prisma.siteSettings.update({
    where: { id: "default" },
    data: {
      footerAbout: String(formData.get("footerAbout") || ""),
      footerEmail: String(formData.get("footerEmail") || ""),
      footerPhone: String(formData.get("footerPhone") || ""),
      footerAddress: String(formData.get("footerAddress") || ""),
      instagramUrl: String(formData.get("instagramUrl") || "") || null,
      facebookUrl: String(formData.get("facebookUrl") || "") || null,
      pinterestUrl: String(formData.get("pinterestUrl") || "") || null,
      currency: String(formData.get("currency") || "USD"),
      currencySymbol: String(formData.get("currencySymbol") || "$"),
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}

export async function createCategory(formData: FormData) {
  await guard();

  const name = String(formData.get("name") || "");
  const slug = slugify(String(formData.get("slug") || name));

  await prisma.category.create({
    data: {
      name,
      slug,
      description: String(formData.get("description") || "") || null,
      imageUrl: String(formData.get("imageUrl") || "") || null,
      sortOrder: Number(formData.get("sortOrder") || 0),
      isVisible: formData.get("isVisible") === "on",
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/categories?saved=1");
}

export async function updateCategory(id: string, formData: FormData) {
  await guard();

  const name = String(formData.get("name") || "");
  await prisma.category.update({
    where: { id },
    data: {
      name,
      slug: slugify(String(formData.get("slug") || name)),
      description: String(formData.get("description") || "") || null,
      imageUrl: String(formData.get("imageUrl") || "") || null,
      sortOrder: Number(formData.get("sortOrder") || 0),
      isVisible: formData.get("isVisible") === "on",
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/categories?saved=1");
}

export async function deleteCategory(id: string) {
  await guard();
  await prisma.category.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/categories");
}

export async function createProduct(formData: FormData) {
  await guard();

  const name = String(formData.get("name") || "");
  const imagesRaw = String(formData.get("images") || "");
  const images = imagesRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  await prisma.product.create({
    data: {
      name,
      slug: slugify(String(formData.get("slug") || name)),
      description: String(formData.get("description") || ""),
      price: Number(formData.get("price") || 0),
      salePrice: formData.get("salePrice")
        ? Number(formData.get("salePrice"))
        : null,
      stock: Number(formData.get("stock") || 0),
      images: JSON.stringify(images),
      categoryId: String(formData.get("categoryId") || "") || null,
      isFeatured: formData.get("isFeatured") === "on",
      isActive: formData.get("isActive") === "on",
      sortOrder: Number(formData.get("sortOrder") || 0),
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/products?saved=1");
}

export async function updateProduct(id: string, formData: FormData) {
  await guard();

  const name = String(formData.get("name") || "");
  const imagesRaw = String(formData.get("images") || "");
  const images = imagesRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug: slugify(String(formData.get("slug") || name)),
      description: String(formData.get("description") || ""),
      price: Number(formData.get("price") || 0),
      salePrice: formData.get("salePrice")
        ? Number(formData.get("salePrice"))
        : null,
      stock: Number(formData.get("stock") || 0),
      images: JSON.stringify(images),
      categoryId: String(formData.get("categoryId") || "") || null,
      isFeatured: formData.get("isFeatured") === "on",
      isActive: formData.get("isActive") === "on",
      sortOrder: Number(formData.get("sortOrder") || 0),
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/products?saved=1");
}

export async function deleteProduct(id: string) {
  await guard();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function createPromotion(formData: FormData) {
  await guard();

  await prisma.promotion.create({
    data: {
      name: String(formData.get("name") || ""),
      description: String(formData.get("description") || "") || null,
      discountType: String(formData.get("discountType") || "PERCENTAGE"),
      discountValue: Number(formData.get("discountValue") || 0),
      appliesTo: String(formData.get("appliesTo") || "ALL"),
      bannerText: String(formData.get("bannerText") || "") || null,
      categoryId: String(formData.get("categoryId") || "") || null,
      productId: String(formData.get("productId") || "") || null,
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/promotions?saved=1");
}

export async function updatePromotion(id: string, formData: FormData) {
  await guard();

  await prisma.promotion.update({
    where: { id },
    data: {
      name: String(formData.get("name") || ""),
      description: String(formData.get("description") || "") || null,
      discountType: String(formData.get("discountType") || "PERCENTAGE"),
      discountValue: Number(formData.get("discountValue") || 0),
      appliesTo: String(formData.get("appliesTo") || "ALL"),
      bannerText: String(formData.get("bannerText") || "") || null,
      categoryId: String(formData.get("categoryId") || "") || null,
      productId: String(formData.get("productId") || "") || null,
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/promotions?saved=1");
}

export async function deletePromotion(id: string) {
  await guard();
  await prisma.promotion.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/promotions");
}

export async function createPage(formData: FormData) {
  await guard();

  const title = String(formData.get("title") || "");
  await prisma.page.create({
    data: {
      title,
      slug: slugify(String(formData.get("slug") || title)),
      content: String(formData.get("content") || ""),
      isPublished: formData.get("isPublished") === "on",
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/pages?saved=1");
}

export async function updatePage(id: string, formData: FormData) {
  await guard();

  const title = String(formData.get("title") || "");
  await prisma.page.update({
    where: { id },
    data: {
      title,
      slug: slugify(String(formData.get("slug") || title)),
      content: String(formData.get("content") || ""),
      isPublished: formData.get("isPublished") === "on",
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/pages?saved=1");
}

export async function deletePage(id: string) {
  await guard();
  await prisma.page.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/pages");
}

export async function createNavItem(formData: FormData) {
  await guard();

  await prisma.navItem.create({
    data: {
      label: String(formData.get("label") || ""),
      href: String(formData.get("href") || ""),
      sortOrder: Number(formData.get("sortOrder") || 0),
      location: String(formData.get("location") || "HEADER"),
      isVisible: formData.get("isVisible") === "on",
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/navigation?saved=1");
}

export async function deleteNavItem(id: string) {
  await guard();
  await prisma.navItem.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/navigation");
}

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    redirect("/admin/login?error=1");
  }

  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  session.isLoggedIn = true;
  session.adminId = admin.id;
  session.email = admin.email;
  await session.save();

  redirect("/admin");
}
