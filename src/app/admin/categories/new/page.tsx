import Link from "next/link";
import { createCategory } from "@/app/admin/actions";
import {
  AdminField,
  inputClass,
  SubmitButton,
  textareaClass,
} from "@/components/admin/AdminForm";
import { AdminCard, AdminPage } from "@/components/admin/AdminPage";

export default function NewCategoryPage() {
  return (
    <AdminPage
      description="Add a new collection for your store."
      action={
        <Link
          href="/admin/categories"
          className="text-sm font-medium text-[#6b7280] hover:text-[#111827]"
        >
          ← Back to categories
        </Link>
      }
    >
      <AdminCard>
        <form action={createCategory} className="max-w-3xl space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Name">
              <input name="name" required className={inputClass} />
            </AdminField>
            <AdminField label="Slug" hint="Leave blank to auto-generate">
              <input name="slug" className={inputClass} />
            </AdminField>
          </div>
          <AdminField label="Description">
            <textarea name="description" rows={3} className={textareaClass} />
          </AdminField>
          <AdminField label="Image URL" hint="Shown in mega menu and category pages">
            <input name="imageUrl" className={inputClass} placeholder="https://..." />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Sort Order" hint="Lower numbers appear first">
              <input name="sortOrder" type="number" defaultValue={0} className={inputClass} />
            </AdminField>
            <label className="flex items-center gap-2 pt-6 text-sm text-[#374151]">
              <input name="isVisible" type="checkbox" defaultChecked />
              Visible on store
            </label>
          </div>
          <SubmitButton label="Create Category" />
        </form>
      </AdminCard>
    </AdminPage>
  );
}
