import Link from "next/link";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminPage";
import { prisma } from "@/lib/prisma";
import { formatPrice, getSiteSettings } from "@/lib/site";

export default async function AdminDashboard() {
  const settings = await getSiteSettings();

  const [productCount, categoryCount, promotionCount, lowStock, outOfStock, recentProducts] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.promotion.count({ where: { isActive: true } }),
      prisma.product.count({ where: { stock: { lte: 2, gt: 0 }, isActive: true } }),
      prisma.product.count({ where: { stock: 0, isActive: true } }),
      prisma.product.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
        include: { category: true },
      }),
    ]);

  const quickActions = [
    { label: "Add Product", href: "/admin/products/new", desc: "List new jewelry" },
    { label: "Edit Appearance", href: "/admin/appearance", desc: "Theme & hero" },
    { label: "Manage Categories", href: "/admin/categories", desc: "Collections" },
    { label: "View Store", href: "/", desc: "Open storefront" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#111827]">Welcome back</h2>
        <p className="mt-1 text-sm text-[#6b7280]">
          Here&apos;s what&apos;s happening with {settings.siteName} today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Total Products" value={productCount} hint="In catalog" />
        <AdminStatCard label="Categories" value={categoryCount} hint="Collections" />
        <AdminStatCard label="Active Promotions" value={promotionCount} accent="success" />
        <AdminStatCard
          label="Low Stock"
          value={lowStock}
          hint={`${outOfStock} out of stock`}
          accent={lowStock > 0 ? "warning" : "default"}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent products */}
        <AdminCard title="Recent Products" className="lg:col-span-2">
          {recentProducts.length === 0 ? (
            <p className="text-sm text-[#6b7280]">No products yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#f3f4f6] text-xs uppercase tracking-wider text-[#9ca3af]">
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3f4f6]">
                  {recentProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="py-3">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="font-medium text-[#111827] hover:text-amber-600"
                        >
                          {product.name}
                        </Link>
                      </td>
                      <td className="py-3 text-[#6b7280]">
                        {product.category?.name ?? "—"}
                      </td>
                      <td className="py-3 text-[#6b7280]">
                        {formatPrice(
                          product.salePrice ?? product.price,
                          settings.currencySymbol,
                        )}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            product.stock === 0
                              ? "bg-red-50 text-red-600"
                              : product.stock <= 2
                                ? "bg-amber-50 text-amber-600"
                                : "bg-green-50 text-green-600"
                          }`}
                        >
                          {product.stock === 0 ? "Out" : product.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4 border-t border-[#f3f4f6] pt-4">
            <Link
              href="/admin/products"
              className="text-sm font-medium text-[#111827] hover:text-amber-600"
            >
              View all products →
            </Link>
          </div>
        </AdminCard>

        {/* Quick actions */}
        <AdminCard title="Quick Actions">
          <ul className="space-y-2">
            {quickActions.map((action) => (
              <li key={action.href}>
                <Link
                  href={action.href}
                  className="flex flex-col rounded-lg border border-[#f3f4f6] px-4 py-3 transition hover:border-[#111827] hover:bg-[#f9fafb]"
                >
                  <span className="text-sm font-medium text-[#111827]">{action.label}</span>
                  <span className="text-xs text-[#9ca3af]">{action.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>
    </div>
  );
}
