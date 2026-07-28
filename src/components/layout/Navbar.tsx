"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { CartIcon, CloseIcon } from "@/components/ui/Icons";
import type { NavItem, SiteSettings } from "@/generated/prisma/client";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type NavbarProps = {
  settings: SiteSettings;
  navItems: NavItem[];
  categories: Category[];
  featuredProducts: unknown[];
};

export function Navbar({ settings, navItems, categories }: NavbarProps) {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const displayNav = navItems.length > 0 ? navItems.slice(0, 6) : [];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
    setCategoriesOpen(false);
  };

  const mobileMenuButton = (
    <button
      type="button"
      className="relative -ml-2 flex h-11 w-11 shrink-0 items-center justify-center text-[var(--color-text)] transition-colors active:text-[var(--color-primary)] lg:hidden"
      onClick={() => setMenuOpen((open) => !open)}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
    >
      <span className="relative block h-4 w-6" aria-hidden>
        <span
          className={`absolute left-0 top-0 block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-out ${
            menuOpen ? "top-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`absolute left-0 top-[7px] block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-out ${
            menuOpen ? "scale-x-0 opacity-0" : ""
          }`}
        />
        <span
          className={`absolute left-0 top-[14px] block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ease-out ${
            menuOpen ? "top-[7px] -rotate-45" : ""
          }`}
        />
      </span>
    </button>
  );

  const mobileMenu = mounted
    ? createPortal(
        <div
          className={`fixed inset-0 z-[200] lg:hidden transition-opacity duration-300 ${
            menuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
          aria-hidden={!menuOpen}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={closeMenu}
            aria-label="Close menu"
            tabIndex={menuOpen ? 0 : -1}
          />

          <nav
            className={`absolute inset-y-0 left-0 flex w-[min(100vw,320px)] flex-col bg-white shadow-xl transition-transform duration-300 ease-out ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <BrandLogo size="sm" showWordmark />
              <button
                type="button"
                onClick={closeMenu}
                className="flex h-10 w-10 items-center justify-center text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
                aria-label="Close menu"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
              <ul className="space-y-0">
                {displayNav.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`flex min-h-[48px] items-center border-b border-[var(--color-border)] text-base font-medium ${
                        isActive(item.href) ? "text-black" : "text-[var(--color-muted)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="mt-4 flex w-full min-h-[48px] items-center justify-between text-base font-medium text-black"
              >
                Shop by Category
                <span className="text-lg text-[var(--color-muted)]">
                  {categoriesOpen ? "−" : "+"}
                </span>
              </button>

              {categoriesOpen && (
                <ul className="mb-4 space-y-0 border-b border-[var(--color-border)] pb-2">
                  <li>
                    <Link
                      href="/products"
                      onClick={closeMenu}
                      className="flex min-h-[44px] items-center pl-3 text-sm text-[var(--color-muted)]"
                    >
                      All Jewelry
                    </Link>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/categories/${cat.slug}`}
                        onClick={closeMenu}
                        className="flex min-h-[44px] items-center pl-3 text-sm text-[var(--color-muted)]"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-[var(--color-border)] p-4">
              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex min-h-[48px] items-center justify-center gap-2 bg-black text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
              >
                <CartIcon className="h-4 w-4" />
                View Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
            </div>
          </nav>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white">
        <div className="border-b border-[var(--color-border)]">
          <div className="store-x grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 py-3 lg:grid-cols-[1fr_auto_1fr]">
            <nav className="hidden items-center gap-6 lg:flex">
              {displayNav.slice(0, 4).map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-[10px] font-semibold uppercase tracking-[0.15em] transition ${
                    isActive(item.href)
                      ? "text-[var(--color-text)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {mobileMenuButton}

            <div className="flex justify-center">
              <BrandLogo size="md" showWordmark={false} className="lg:hidden" />
              <BrandLogo size="md" showIcon={false} className="hidden lg:flex" />
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/cart"
                className="relative -mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-[var(--color-text)] transition-colors active:text-[var(--color-primary)] lg:mr-0 lg:h-auto lg:min-h-[44px] lg:min-w-[44px] lg:gap-2 lg:active:text-[var(--color-text)]"
                aria-label={totalItems > 0 ? `Cart, ${totalItems} items` : "Cart"}
              >
                <CartIcon className="h-6 w-6 lg:h-[18px] lg:w-[18px]" />
                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.15em] lg:inline">
                  Cart
                </span>
                {totalItems > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[9px] font-bold text-white lg:static">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}
