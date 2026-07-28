import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { CartProvider } from "@/components/providers/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeStyles } from "@/components/layout/ThemeStyles";
import {
  getFooterNav,
  getHeaderNav,
  getNavCategories,
  getNavFeaturedProducts,
  getSiteSettings,
} from "@/lib/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

export const dynamic = "force-dynamic";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, headerNav, footerNav, categories, featuredProducts] =
    await Promise.all([
      getSiteSettings(),
      getHeaderNav(),
      getFooterNav(),
      getNavCategories(),
      getNavFeaturedProducts(),
    ]);

  return (
    <div
      className={`${dmSans.variable} ${cormorant.variable} flex min-h-screen flex-col overflow-x-hidden`}
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)",
        fontFamily: "var(--font-dm), system-ui, sans-serif",
      }}
    >
      <ThemeStyles settings={settings} />
      <CartProvider>
        <Navbar
          settings={settings}
          navItems={headerNav}
          categories={categories}
          featuredProducts={featuredProducts}
        />
        <main className="flex-1 pt-[73px]">{children}</main>
        <Footer settings={settings} navItems={footerNav} categories={categories} />
      </CartProvider>
    </div>
  );
}
