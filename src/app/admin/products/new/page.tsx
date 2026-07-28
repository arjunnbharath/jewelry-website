import Link from "next/link";
import { createProduct } from "@/app/admin/actions";
import {
  AdminField,
  inputClass,
  SubmitButton,
  textareaClass,
} from "@/components/admin/AdminForm";
import { AdminCard, AdminPage } from "@/components/admin/AdminPage";
import { prisma } from "@/lib/prisma";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <AdminPage
      description="Add a new item to your jewelry catalog."
      action={
        <Link
          href="/admin/products"
          className="text-sm font-medium text-[#6b7280] hover:text-[#111827]"
        >
          ← Back to products
        </Link>
      }
    >
      <AdminCard>
        <form action={createProduct} className="max-w-3xl space-y-4">
          <AdminField label="Name">
            <input name="name" required className={inputClass} />
          </AdminField>
          <AdminField label="Slug" hint="Leave blank to auto-generate">
            <input name="slug" className={inputClass} />
          </AdminField>
          <AdminField label="Description">
            <textarea name="description" rows={4} required className={textareaClass} />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-3">
            <AdminField label="Price">
              <input name="price" type="number" step="0.01" required className={inputClass} />
            </AdminField>
            <AdminField label="Sale Price" hint="Optional">
              <input name="salePrice" type="number" step="0.01" className={inputClass} />
            </AdminField>
            <AdminField label="Stock">
              <input name="stock" type="number" defaultValue={10} className={inputClass} />
            </AdminField>
          </div>
          <AdminField label="Category">
            <select name="categoryId" className={inputClass}>
              <option value="">None</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </AdminField>
          <AdminField label="Image URLs" hint="One URL per line">
            <textarea name="images" rows={3} className={textareaClass} />
          </AdminField>
          <AdminField label="Sort Order">
            <input name="sortOrder" type="number" defaultValue={0} className={inputClass} />
          </AdminField>
          <label className="flex items-center gap-2 text-sm text-[#374151]">
            <input name="isFeatured" type="checkbox" />
            Featured on homepage
          </label>
          <label className="flex items-center gap-2 text-sm text-[#374151]">
            <input name="isActive" type="checkbox" defaultChecked />
            Active on store
          </label>
          <SubmitButton label="Create Product" />
        </form>
      </AdminCard>
    </AdminPage>
  );
}
