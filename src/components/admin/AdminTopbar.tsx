"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/appearance": "Appearance",
  "/admin/categories": "Categories",
  "/admin/categories/new": "Add Category",
  "/admin/products": "Products",
  "/admin/products/new": "Add Product",
  "/admin/promotions": "Promotions",
  "/admin/promotions/new": "Add Promotion",
  "/admin/pages": "Pages",
  "/admin/navigation": "Navigation",
  "/admin/settings": "Settings",
};

export function AdminTopbar({ email }: { email?: string }) {
  const pathname = usePathname();

  let title = "Admin";
  if (titles[pathname]) {
    title = titles[pathname];
  } else if (pathname.startsWith("/admin/products/")) {
    title = "Edit Product";
  } else if (pathname.startsWith("/admin/categories/")) {
    title = "Edit Category";
  } else if (pathname.startsWith("/admin/promotions/")) {
    title = "Edit Promotion";
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-white px-6 lg:px-8">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-[#9ca3af]">
          Admin Panel
        </p>
        <h1 className="text-lg font-semibold text-[#111827]">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden rounded-full bg-[#f3f4f6] px-3 py-1 text-xs text-[#6b7280] sm:inline">
          {email}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111827] text-xs font-semibold text-amber-400">
          {email?.[0]?.toUpperCase() ?? "A"}
        </div>
      </div>
    </header>
  );
}
