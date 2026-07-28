import Link from "next/link";
import { notFound } from "next/navigation";
import { deletePromotion, updatePromotion } from "@/app/admin/actions";
import {
  AdminField,
  inputClass,
  SubmitButton,
  textareaClass,
} from "@/components/admin/AdminForm";
import { AdminCard, AdminPage } from "@/components/admin/AdminPage";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export default async function EditPromotionPage({ params }: Props) {
  const { id } = await params;
  const [promotion, categories, products] = await Promise.all([
    prisma.promotion.findUnique({
      where: { id },
      include: { category: true, product: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!promotion) notFound();

  return (
    <AdminPage
      description={`Editing ${promotion.name}`}
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
        <form action={updatePromotion.bind(null, promotion.id)} className="max-w-3xl space-y-4">
          <AdminField label="Name">
            <input
              name="name"
              defaultValue={promotion.name}
              required
              className={inputClass}
            />
          </AdminField>
          <AdminField label="Description" hint="Optional internal note">
            <textarea
              name="description"
              defaultValue={promotion.description ?? ""}
              rows={2}
              className={textareaClass}
            />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Discount Type">
              <select
                name="discountType"
                defaultValue={promotion.discountType}
                className={inputClass}
              >
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed Amount</option>
              </select>
            </AdminField>
            <AdminField label="Discount Value">
              <input
                name="discountValue"
                type="number"
                step="0.01"
                defaultValue={promotion.discountValue}
                required
                className={inputClass}
              />
            </AdminField>
          </div>
          <AdminField label="Applies To">
            <select
              name="appliesTo"
              defaultValue={promotion.appliesTo}
              className={inputClass}
            >
              <option value="ALL">Entire Store</option>
              <option value="CATEGORY">Specific Category</option>
              <option value="PRODUCT">Specific Product</option>
            </select>
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Category" hint="Required when applies to category">
              <select
                name="categoryId"
                defaultValue={promotion.categoryId ?? ""}
                className={inputClass}
              >
                <option value="">None</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Product" hint="Required when applies to product">
              <select
                name="productId"
                defaultValue={promotion.productId ?? ""}
                className={inputClass}
              >
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
              defaultValue={promotion.bannerText ?? ""}
              className={inputClass}
            />
          </AdminField>
          <label className="flex items-center gap-2 text-sm text-[#374151]">
            <input
              name="isActive"
              type="checkbox"
              defaultChecked={promotion.isActive}
            />
            Active
          </label>
          <div className="flex items-center gap-4 border-t border-[#f3f4f6] pt-4">
            <SubmitButton label="Save Promotion" />
            <button
              formAction={deletePromotion.bind(null, promotion.id)}
              className="text-sm font-medium text-red-500 hover:text-red-700"
            >
              Delete promotion
            </button>
          </div>
        </form>
      </AdminCard>
    </AdminPage>
  );
}
