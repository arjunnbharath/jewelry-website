import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      siteName: "House of Manivala",
      primaryColor: "#C4A574",
      secondaryColor: "#8B7355",
      accentColor: "#D4B896",
      backgroundColor: "#F7F3EE",
      textColor: "#1A1410",
      mutedColor: "#7A6F66",
      heroTitle: "Jewelry That Tells *Your* Story",
      heroSubtitle:
        "Exquisite designs. Fine craftsmanship. Made to be cherished forever.",
      heroImageUrl: "/background/openpage.jpg",
      heroCtaText: "Shop Now",
      promoBannerText: "Get 10% Off Your First Order | Use Code: LUXE10",
    },
    create: {
      id: "default",
      instagramUrl: "https://instagram.com",
      pinterestUrl: "https://pinterest.com",
    },
  });

  const email = process.env.ADMIN_EMAIL || "admin@lumierejewels.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  await prisma.navItem.deleteMany();
  await prisma.navItem.createMany({
    data: [
      { label: "Home", href: "/", sortOrder: 0, location: "HEADER" },
      { label: "Shop", href: "/products", sortOrder: 1, location: "HEADER" },
      { label: "Collections", href: "/products", sortOrder: 2, location: "HEADER" },
      { label: "New Arrivals", href: "/products", sortOrder: 3, location: "HEADER" },
      { label: "About Us", href: "/pages/about", sortOrder: 4, location: "HEADER" },
      { label: "Contact", href: "/pages/contact", sortOrder: 5, location: "HEADER" },
      { label: "Shop", href: "/products", sortOrder: 0, location: "FOOTER" },
      { label: "About", href: "/pages/about", sortOrder: 1, location: "FOOTER" },
      { label: "Contact", href: "/pages/contact", sortOrder: 2, location: "FOOTER" },
    ],
  });

  await prisma.page.deleteMany();
  await prisma.page.createMany({
    data: [
      {
        title: "About Us",
        slug: "about",
        content:
          "Founded with a passion for timeless design, Lumière Jewels creates pieces that blend classic craftsmanship with modern elegance. Every ring, necklace, and earring is thoughtfully designed to become part of your story.",
      },
      {
        title: "Contact",
        slug: "contact",
        content:
          "We would love to hear from you.\n\nEmail: hello@lumierejewels.com\nPhone: +1 (555) 123-4567\nAddress: 128 Madison Avenue, New York, NY\n\nVisit our showroom by appointment, or reach out with any questions about sizing, gifting, or custom orders.",
      },
    ],
  });

  await prisma.category.deleteMany();
  const rings = await prisma.category.create({
    data: {
      name: "Rings",
      slug: "rings",
      description: "Engagement, stackable, and statement rings",
      imageUrl:
        "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80",
      sortOrder: 0,
    },
  });
  const necklaces = await prisma.category.create({
    data: {
      name: "Necklaces",
      slug: "necklaces",
      description: "Pendants, chains, and layered necklaces",
      imageUrl:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      sortOrder: 1,
    },
  });
  const earrings = await prisma.category.create({
    data: {
      name: "Earrings",
      slug: "earrings",
      description: "Studs, hoops, and drop earrings",
      imageUrl:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      sortOrder: 2,
    },
  });
  const bracelets = await prisma.category.create({
    data: {
      name: "Bracelets",
      slug: "bracelets",
      description: "Tennis bracelets and delicate cuffs",
      imageUrl:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      sortOrder: 3,
    },
  });

  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: [
      {
        name: "Celeste Gold Band",
        slug: "celeste-gold-band",
        description:
          "A minimalist 14k gold band with a brushed finish — perfect for everyday wear or stacking.",
        price: 420,
        salePrice: 378,
        stock: 12,
        categoryId: rings.id,
        isFeatured: true,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80",
        ]),
      },
      {
        name: "Aurora Pendant Necklace",
        slug: "aurora-pendant-necklace",
        description:
          "Delicate chain with a luminous teardrop pendant, inspired by northern lights.",
        price: 295,
        stock: 8,
        categoryId: necklaces.id,
        isFeatured: true,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
        ]),
      },
      {
        name: "Luna Pearl Studs",
        slug: "luna-pearl-studs",
        description:
          "Classic freshwater pearl studs set in sterling silver with secure butterfly backs.",
        price: 165,
        stock: 20,
        categoryId: earrings.id,
        isFeatured: true,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
        ]),
      },
      {
        name: "Solstice Tennis Bracelet",
        slug: "solstice-tennis-bracelet",
        description:
          "A line of brilliant-cut stones in a flexible white gold setting — evening elegance redefined.",
        price: 890,
        salePrice: 756,
        stock: 0,
        categoryId: bracelets.id,
        isFeatured: true,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
        ]),
      },
      {
        name: "Eclipse Hoop Earrings",
        slug: "eclipse-hoop-earrings",
        description:
          "Medium-weight gold hoops with a subtle hammered texture and secure click closure.",
        price: 210,
        stock: 15,
        categoryId: earrings.id,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
        ]),
      },
      {
        name: "Heritage Signet Ring",
        slug: "heritage-signet-ring",
        description:
          "A modern take on the classic signet ring in polished 18k gold vermeil.",
        price: 340,
        stock: 6,
        categoryId: rings.id,
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80",
        ]),
      },
    ],
  });

  await prisma.promotion.deleteMany();
  await prisma.promotion.create({
    data: {
      name: "Spring Sparkle Sale",
      description: "10% off select pieces",
      discountType: "PERCENTAGE",
      discountValue: 10,
      appliesTo: "ALL",
      bannerText: "Spring Sparkle — Enjoy 10% off select fine jewelry",
      isActive: true,
    },
  });

  console.log("Seed complete.");
  console.log(`Admin login: ${email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
