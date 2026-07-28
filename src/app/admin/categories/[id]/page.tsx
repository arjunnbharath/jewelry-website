import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteCategory, updateCategory } from "@/app/admin/actions";
import {
  AdminField,
  inputClass,
  SubmitButton,
  textareaClass,
} from "@/components/admin/AdminForm";
import { AdminCard, AdminPage } from "@/components/admin/AdminPage";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { products: true } } },
  });

  if (!category) notFound();

  return (
    <AdminPage
      description={`Editing ${category.name} · ${category._count.products} product${category._count.products === 1 ? "" : "s"}`}
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
        <form action={updateCategory.bind(null, category.id)} className="max-w-3xl space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Name">
              <input name="name" defaultValue={category.name} required className={inputClass} />
            </AdminField>
            <AdminField label="Slug">
              <input name="slug" defaultValue={category.slug} className={inputClass} />
            </AdminField>
          </div>
          <AdminField label="Description">
            <textarea
              name="description"
              defaultValue={category.description ?? ""}
              rows={3}
              className={textareaClass}
            />
          </AdminField>
          <AdminField label="Image URL" hint="Shown in mega menu and category pages">
            <input
              name="imageUrl"
              defaultValue={category.imageUrl ?? ""}
              className={inputClass}
              placeholder="https://..."
            />
          </AdminField>
          {category.imageUrl && (
            <div className="rounded-lg border border-[#e5e7eb] p-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
                Preview
              </p>
              <img
                src={category.imageUrl}
                alt={category.name}
                className="h-24 w-24 rounded-lg object-cover"
              />
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Sort Order" hint="Lower numbers appear first">
              <input
                name="sortOrder"
                type="number"
                defaultValue={category.sortOrder}
                className={inputClass}
              />
            </AdminField>
            <label className="flex items-center gap-2 pt-6 text-sm text-[#374151]">
              <input
                name="isVisible"
                type="checkbox"
                defaultChecked={category.isVisible}
              />
              Visible on store
            </label>
          </div>
          <div className="flex items-center gap-4 border-t border-[#f3f4f6] pt-4">
            <SubmitButton label="Save Category" />
            <button
              formAction={deleteCategory.bind(null, category.id)}
              className="text-sm font-medium text-red-500 hover:text-red-700"
            >
              Delete category
            </button>
          </div>
        </form>
      </AdminCard>
    </AdminPage>
  );
}
