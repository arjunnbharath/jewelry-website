import Link from "next/link";
import { deletePromotion } from "@/app/admin/actions";
import { AdminCard, AdminPage, AdminStatCard } from "@/components/admin/AdminPage";
import { prisma } from "@/lib/prisma";
import { formatPrice, getSiteSettings } from "@/lib/site";

type Props = { searchParams: Promise<{ saved?: string }> };

function formatDiscount(
  type: string,
  value: number,
  currencySymbol: string
) {
  return type === "PERCENTAGE"
    ? `${value}% off`
    : `${formatPrice(value, currencySymbol)} off`;
}

function formatAppliesTo(
  appliesTo: string,
  categoryName?: string | null,
  productName?: string | null
) {
  if (appliesTo === "CATEGORY" && categoryName) return `Category · ${categoryName}`;
  if (appliesTo === "PRODUCT" && productName) return `Product · ${productName}`;
  if (appliesTo === "CATEGORY") return "Category";
  if (appliesTo === "PRODUCT") return "Product";
  return "Entire store";
}

export default async function PromotionsAdminPage({ searchParams }: Props) {
  const [promotions, settings] = await Promise.all([
    prisma.promotion.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true, product: true },
    }),
    getSiteSettings(),
  ]);
  const { saved } = await searchParams;

  const activeCount = promotions.filter((p) => p.isActive).length;
  const withBannerCount = promotions.filter((p) => p.bannerText).length;

  return (
    <AdminPage
      description="Create discounts and homepage promo banners."
      saved={!!saved}
      savedMessage="Promotion saved."
      action={
        <Link
          href="/admin/promotions/new"
          className="rounded-lg bg-[#111827] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1f2937]"
        >
          + Add Promotion
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard label="Total Promotions" value={promotions.length} />
        <AdminStatCard
          label="Active"
          value={activeCount}
          accent="success"
          hint="Currently running"
        />
        <AdminStatCard
          label="With Banner"
          value={withBannerCount}
          hint="Shown on homepage"
        />
      </div>

      <AdminCard flush>
        {promotions.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm font-medium text-[#111827]">No promotions yet</p>
            <p className="mt-1 text-sm text-[#6b7280]">
              Create a discount or homepage banner to boost sales.
            </p>
            <Link
              href="/admin/promotions/new"
              className="mt-4 inline-flex rounded-lg bg-[#111827] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1f2937]"
            >
              Add Promotion
            </Link>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#f3f4f6] bg-[#f9fafb]">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Promotion
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Discount
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Applies To
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                  Banner
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
              {promotions.map((promo) => (
                <tr key={promo.id} className="hover:bg-[#f9fafb]">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-[#111827]">{promo.name}</p>
                    {promo.description && (
                      <p className="mt-0.5 max-w-[220px] truncate text-xs text-[#9ca3af]">
                        {promo.description}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-[#111827]">
                      {formatDiscount(
                        promo.discountType,
                        promo.discountValue,
                        settings.currencySymbol
                      )}
                    </span>
                    <p className="text-xs text-[#9ca3af]">
                      {promo.discountType === "PERCENTAGE" ? "Percentage" : "Fixed amount"}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 text-[#6b7280]">
                    {formatAppliesTo(
                      promo.appliesTo,
                      promo.category?.name,
                      promo.product?.name
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    {promo.bannerText ? (
                      <span className="text-sm text-amber-700">{promo.bannerText}</span>
                    ) : (
                      <span className="text-[#9ca3af]">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        promo.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {promo.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/promotions/${promo.id}`}
                        className="text-sm font-medium text-[#111827] hover:text-amber-600"
                      >
                        Edit
                      </Link>
                      <form action={deletePromotion.bind(null, promo.id)}>
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
