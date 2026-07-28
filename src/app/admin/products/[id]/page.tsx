import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteProduct, updateProduct } from "@/app/admin/actions";
import {
  AdminField,
  inputClass,
  SubmitButton,
  textareaClass,
} from "@/components/admin/AdminForm";
import { AdminCard, AdminPage } from "@/components/admin/AdminPage";
import { prisma } from "@/lib/prisma";
import { parseImages } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  const images = parseImages(product.images);
  const imagesText = images.join("\n");

  return (
    <AdminPage
      description={`Editing ${product.name}`}
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
        <form action={updateProduct.bind(null, product.id)} className="max-w-3xl space-y-4">
          <AdminField label="Name">
            <input name="name" defaultValue={product.name} required className={inputClass} />
          </AdminField>
          <AdminField label="Slug">
            <input name="slug" defaultValue={product.slug} className={inputClass} />
          </AdminField>
          <AdminField label="Description">
            <textarea
              name="description"
              defaultValue={product.description}
              rows={4}
              required
              className={textareaClass}
            />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-3">
            <AdminField label="Price">
              <input
                name="price"
                type="number"
                step="0.01"
                defaultValue={product.price}
                required
                className={inputClass}
              />
            </AdminField>
            <AdminField label="Sale Price">
              <input
                name="salePrice"
                type="number"
                step="0.01"
                defaultValue={product.salePrice ?? ""}
                className={inputClass}
              />
            </AdminField>
            <AdminField label="Stock">
              <input
                name="stock"
                type="number"
                defaultValue={product.stock}
                className={inputClass}
              />
            </AdminField>
          </div>
          <AdminField label="Category">
            <select name="categoryId" defaultValue={product.categoryId ?? ""} className={inputClass}>
              <option value="">None</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </AdminField>
          <AdminField label="Image URLs" hint="One URL per line">
            <textarea name="images" defaultValue={imagesText} rows={3} className={textareaClass} />
          </AdminField>
          {images.length > 0 && (
            <div className="rounded-lg border border-[#e5e7eb] p-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#9ca3af]">
                Preview
              </p>
              <div className="flex flex-wrap gap-2">
                {images.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt=""
                    className="h-16 w-16 rounded-lg object-cover bg-[#f3f4f6]"
                  />
                ))}
              </div>
            </div>
          )}
          <AdminField label="Sort Order">
            <input
              name="sortOrder"
              type="number"
              defaultValue={product.sortOrder}
              className={inputClass}
            />
          </AdminField>
          <label className="flex items-center gap-2 text-sm text-[#374151]">
            <input name="isFeatured" type="checkbox" defaultChecked={product.isFeatured} />
            Featured on homepage
          </label>
          <label className="flex items-center gap-2 text-sm text-[#374151]">
            <input name="isActive" type="checkbox" defaultChecked={product.isActive} />
            Active on store
          </label>
          <div className="flex items-center gap-4 border-t border-[#f3f4f6] pt-4">
            <SubmitButton label="Save Product" />
            <button
              formAction={deleteProduct.bind(null, product.id)}
              className="text-sm font-medium text-red-500 hover:text-red-700"
            >
              Delete product
            </button>
          </div>
        </form>
      </AdminCard>
    </AdminPage>
  );
}
