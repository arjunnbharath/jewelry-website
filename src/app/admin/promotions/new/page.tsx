import Link from "next/link";
import { createPromotion } from "@/app/admin/actions";
import {
  AdminField,
  inputClass,
  SubmitButton,
  textareaClass,
} from "@/components/admin/AdminForm";
import { AdminCard, AdminPage } from "@/components/admin/AdminPage";
import { prisma } from "@/lib/prisma";

export default async function NewPromotionPage() {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <AdminPage
      description="Set up a new discount or homepage banner."
      action={
        <Link
          href="/admin/promotions"
          className="text-sm font-medium text-[#6b7280] hover:text-[#111827]"
        >
          ← Back to promotions
        </Link>
      }
    >
      <AdminCard>
        <form action={createPromotion} className="max-w-3xl space-y-4">
          <AdminField label="Name">
            <input name="name" required className={inputClass} placeholder="Summer Sale" />
          </AdminField>
          <AdminField label="Description" hint="Optional internal note">
            <textarea name="description" rows={2} className={textareaClass} />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Discount Type">
              <select name="discountType" className={inputClass}>
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed Amount</option>
              </select>
            </AdminField>
            <AdminField label="Discount Value">
              <input
                name="discountValue"
                type="number"
                step="0.01"
                required
                className={inputClass}
                placeholder="10"
              />
            </AdminField>
          </div>
          <AdminField label="Applies To">
            <select name="appliesTo" className={inputClass}>
              <option value="ALL">Entire Store</option>
              <option value="CATEGORY">Specific Category</option>
              <option value="PRODUCT">Specific Product</option>
            </select>
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Category" hint="Required when applies to category">
              <select name="categoryId" className={inputClass}>
                <option value="">None</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Product" hint="Required when applies to product">
              <select name="productId" className={inputClass}>
                <option value="">None</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </AdminField>
          </div>
          <AdminField label="Banner Text" hint="Shown on homepage when active">
            <input
              name="bannerText"
              className={inputClass}
              placeholder="Get 15% off all rings this week"
            />
          </AdminField>
          <label className="flex items-center gap-2 text-sm text-[#374151]">
            <input name="isActive" type="checkbox" defaultChecked />
            Active
          </label>
          <SubmitButton label="Create Promotion" />
        </form>
      </AdminCard>
    </AdminPage>
  );
}
