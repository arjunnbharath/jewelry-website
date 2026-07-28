import { createNavItem, deleteNavItem } from "@/app/admin/actions";
import {
  AdminField,
  inputClass,
  SubmitButton,
} from "@/components/admin/AdminForm";
import { AdminCard, AdminPage } from "@/components/admin/AdminPage";
import { prisma } from "@/lib/prisma";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function NavigationAdminPage({ searchParams }: Props) {
  const navItems = await prisma.navItem.findMany({ orderBy: { sortOrder: "asc" } });
  const { saved } = await searchParams;

  return (
    <AdminPage
      description="Control header and footer menu links."
      saved={!!saved}
      savedMessage="Navigation updated."
    >
      <AdminCard title="Add Menu Item">
        <form action={createNavItem} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Label">
              <input name="label" required className={inputClass} />
            </AdminField>
            <AdminField label="Link" hint="e.g. /products or /pages/about">
              <input name="href" required className={inputClass} />
            </AdminField>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Location">
              <select name="location" className={inputClass}>
                <option value="HEADER">Header</option>
                <option value="FOOTER">Footer</option>
              </select>
            </AdminField>
            <AdminField label="Sort Order">
              <input name="sortOrder" type="number" defaultValue={0} className={inputClass} />
            </AdminField>
          </div>
          <label className="flex items-center gap-2 text-sm text-[#374151]">
            <input name="isVisible" type="checkbox" defaultChecked />
            Visible
          </label>
          <SubmitButton label="Add Menu Item" />
        </form>
      </AdminCard>

      <AdminCard title="Menu Items" flush>
        <div className="divide-y divide-[#f3f4f6]">
          {navItems.length === 0 ? (
            <p className="px-6 py-8 text-sm text-[#6b7280]">No menu items yet.</p>
          ) : (
            navItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-[#f9fafb]"
              >
                <div>
                  <p className="font-medium text-[#111827]">{item.label}</p>
                  <p className="text-sm text-[#6b7280]">
                    {item.href} · {item.location} · Order {item.sortOrder}
                  </p>
                </div>
                <form action={deleteNavItem.bind(null, item.id)}>
                  <button type="submit" className="text-sm font-medium text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      </AdminCard>
    </AdminPage>
  );
}
