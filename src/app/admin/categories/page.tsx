import Link from "next/link";
import { deleteCategory } from "@/app/admin/actions";
import { AdminCard, AdminPage, AdminStatCard } from "@/components/admin/AdminPage";
import { prisma } from "@/lib/prisma";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function CategoriesAdminPage({ searchParams }: Props) {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
  const { saved } = await searchParams;

  const visibleCount = categories.filter((c) => c.isVisible).length;
  const hiddenCount = categories.length - visibleCount;

  return (
    <AdminPage
      description="Organize collections shown in the shop and mega menu."
      saved={!!saved}
      savedMessage="Category saved."
      action={
        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-[#111827] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1f2937]"
        >
          + Add Category
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard label="Total Categories" value={categories.length} />
        <AdminStatCard
          label="Visible"
          value={visibleCount}
          accent="success"
          hint="Shown on store"
        />
        <AdminStatCard
          label="Hidden"
          value={hiddenCount}
          accent={hiddenCount > 0 ? "warning" : "default"}
          hint="Not shown to customers"
        />
      </div>

      <AdminCard flush>
        {categories.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm font-medium text-[#111827]">No categories yet</p>
            <p className="mt-1 text-sm text-[#6b7280]">
              Create your first collection to organize products in the shop.
            </p>
            <Link
              href="/admin/categories/new"
              className="mt-4 inline-flex rounded-lg bg-[#111827] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1f2937]"
            >
              Add Category
            </Link>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#f3f4f6] bg-[#f9fafb]">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Category
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Slug
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Products
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Order
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
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-[#f9fafb]">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {category.imageUrl ? (
                        <img
                          src={category.imageUrl}
                          alt=""
                          className="h-10 w-10 shrink-0 rounded-lg object-cover bg-[#f3f4f6]"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3f4f6] text-xs font-medium text-[#9ca3af]">
                          {category.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-[#111827]">{category.name}</p>
                        {category.description && (
                          <p className="truncate text-xs text-[#9ca3af] max-w-[200px]">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[#6b7280]">{category.slug}</td>
                  <td className="px-5 py-3.5 text-[#6b7280]">
                    {category._count.products}
                  </td>
                  <td className="px-5 py-3.5 text-[#6b7280]">{category.sortOrder}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        category.isVisible
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {category.isVisible ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/categories/${category.id}`}
                        className="text-sm font-medium text-[#111827] hover:text-amber-600"
                      >
                        Edit
                      </Link>
                      <form action={deleteCategory.bind(null, category.id)}>
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
              ))}
            </tbody>
          </table>
        )}
      </AdminCard>
    </AdminPage>
  );
}
