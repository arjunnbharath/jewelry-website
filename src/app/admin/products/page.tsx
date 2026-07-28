import Link from "next/link";
import { deleteProduct } from "@/app/admin/actions";
import { AdminCard, AdminPage, AdminStatCard } from "@/components/admin/AdminPage";
import { prisma } from "@/lib/prisma";
import { formatPrice, getSiteSettings, parseImages } from "@/lib/site";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function ProductsAdminPage({ searchParams }: Props) {
  const [products, settings] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { sortOrder: "asc" },
    }),
    getSiteSettings(),
  ]);
  const { saved } = await searchParams;

  const activeCount = products.filter((p) => p.isActive && p.stock > 0).length;
  const outOfStockCount = products.filter((p) => p.isActive && p.stock === 0).length;
  const hiddenCount = products.filter((p) => !p.isActive).length;
  const featuredCount = products.filter((p) => p.isFeatured).length;

  return (
    <AdminPage
      description="Manage jewelry inventory, pricing, and stock."
      saved={!!saved}
      savedMessage="Product saved."
      action={
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-[#111827] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1f2937]"
        >
          + Add Product
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total Products" value={products.length} />
        <AdminStatCard
          label="In Stock"
          value={activeCount}
          accent="success"
          hint="Active and available"
        />
        <AdminStatCard
          label="Out of Stock"
          value={outOfStockCount}
          accent={outOfStockCount > 0 ? "warning" : "default"}
          hint="Active but zero stock"
        />
        <AdminStatCard
          label="Featured"
          value={featuredCount}
          hint={hiddenCount > 0 ? `${hiddenCount} hidden` : "On homepage"}
        />
      </div>

      <AdminCard flush>
        {products.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm font-medium text-[#111827]">No products yet</p>
            <p className="mt-1 text-sm text-[#6b7280]">
              Add your first piece to start selling on the store.
            </p>
            <Link
              href="/admin/products/new"
              className="mt-4 inline-flex rounded-lg bg-[#111827] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1f2937]"
            >
              Add Product
            </Link>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#f3f4f6] bg-[#f9fafb]">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Product
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Category
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Price
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Stock
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3f4f6]">
              {products.map((product) => {
                const images = parseImages(product.images);
                const thumb = images[0];

                return (
                  <tr key={product.id} className="hover:bg-[#f9fafb]">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt=""
                            className="h-10 w-10 shrink-0 rounded-lg object-cover bg-[#f3f4f6]"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3f4f6] text-xs font-medium text-[#9ca3af]">
                            {product.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-[#111827]">{product.name}</p>
                            {product.isFeatured && (
                              <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#9ca3af]">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[#6b7280]">
                      {product.category?.name ?? "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      {product.salePrice ? (
                        <div>
                          <span className="font-medium text-[#111827]">
                            {formatPrice(product.salePrice, settings.currencySymbol)}
                          </span>
                          <span className="ml-1.5 text-xs text-[#9ca3af] line-through">
                            {formatPrice(product.price, settings.currencySymbol)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#6b7280]">
                          {formatPrice(product.price, settings.currencySymbol)}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={
                          product.stock === 0
                            ? "font-medium text-red-600"
                            : product.stock <= 5
                              ? "font-medium text-amber-600"
                              : "text-[#6b7280]"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          product.isActive
                            ? product.stock > 0
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {product.isActive
                          ? product.stock > 0
                            ? "Active"
                            : "Out of stock"
                          : "Hidden"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-3">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="text-sm font-medium text-[#111827] hover:text-amber-600"
                        >
                          Edit
                        </Link>
                        <form action={deleteProduct.bind(null, product.id)}>
                          <button
                            type="submit"
                            className="text-sm text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </AdminCard>
    </AdminPage>
  );
}
