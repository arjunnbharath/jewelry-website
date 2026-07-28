"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BoxIcon,
  DashboardIcon,
  ExternalIcon,
  FileIcon,
  LogoutIcon,
  MenuIcon,
  PaletteIcon,
  SettingsIcon,
  SparklesIcon,
  TagIcon,
} from "@/components/admin/AdminIcons";

const navGroups = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: DashboardIcon, exact: true }],
  },
  {
    label: "Store",
    items: [
      { href: "/admin/products", label: "Products", icon: BoxIcon },
      { href: "/admin/categories", label: "Categories", icon: TagIcon },
      { href: "/admin/promotions", label: "Promotions", icon: SparklesIcon },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/appearance", label: "Appearance", icon: PaletteIcon },
      { href: "/admin/pages", label: "Pages", icon: FileIcon },
      { href: "/admin/navigation", label: "Navigation", icon: MenuIcon },
    ],
  },
  {
    label: "System",
    items: [{ href: "/admin/settings", label: "Settings", icon: SettingsIcon }],
  },
];

type AdminSidebarProps = {
  email?: string;
};

export function AdminSidebar({ email }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[#1f2937] bg-[#111827] text-white">
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <Image
          src="/logo/logo.jpg"
          alt="House of Manivala"
          width={32}
          height={32}
          className="rounded-md object-contain"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">House of Manivala</p>
          <p className="text-[10px] uppercase tracking-wider text-white/40">Admin</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-hidden px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/35">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href, "exact" in item ? item.exact : false);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                        active
                          ? "bg-white/10 font-medium text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <item.icon className={`h-[18px] w-[18px] ${active ? "text-amber-400" : ""}`} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        {email && (
          <p className="mb-2 truncate px-3 text-xs text-white/40">{email}</p>
        )}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <ExternalIcon />
          View Store
        </Link>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="mt-0.5 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white/60 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogoutIcon />
            Log Out
          </button>
        </form>
      </div>
    </aside>
  );
}
