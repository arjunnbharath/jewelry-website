import {
  createPage,
  deletePage,
  updatePage,
} from "@/app/admin/actions";
import {
  AdminField,
  inputClass,
  SubmitButton,
  textareaClass,
} from "@/components/admin/AdminForm";
import { AdminCard, AdminPage } from "@/components/admin/AdminPage";
import { prisma } from "@/lib/prisma";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function PagesAdminPage({ searchParams }: Props) {
  const pages = await prisma.page.findMany({ orderBy: { title: "asc" } });
  const { saved } = await searchParams;

  return (
    <AdminPage
      description="Manage About, Contact, and other static pages."
      saved={!!saved}
      savedMessage="Page saved."
    >
      <AdminCard title="Add Page">
        <form action={createPage} className="space-y-4">
          <AdminField label="Title">
            <input name="title" required className={inputClass} />
          </AdminField>
          <AdminField label="Slug" hint="e.g. about, contact">
            <input name="slug" className={inputClass} />
          </AdminField>
          <AdminField label="Content">
            <textarea name="content" rows={6} required className={textareaClass} />
          </AdminField>
          <label className="flex items-center gap-2 text-sm text-[#374151]">
            <input name="isPublished" type="checkbox" defaultChecked />
            Published
          </label>
          <SubmitButton label="Add Page" />
        </form>
      </AdminCard>

      <div className="space-y-4">
        {pages.map((page) => (
          <AdminCard key={page.id} title={page.title}>
            <form action={updatePage.bind(null, page.id)} className="space-y-4">
              <div className="flex justify-end">
                <button
                  formAction={deletePage.bind(null, page.id)}
                  className="text-sm font-medium text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              <AdminField label="Title">
                <input name="title" defaultValue={page.title} className={inputClass} />
              </AdminField>
              <AdminField label="Slug">
                <input name="slug" defaultValue={page.slug} className={inputClass} />
              </AdminField>
              <AdminField label="Content">
                <textarea
                  name="content"
                  defaultValue={page.content}
                  rows={6}
                  className={textareaClass}
                />
              </AdminField>
              <label className="flex items-center gap-2 text-sm text-[#374151]">
                <input name="isPublished" type="checkbox" defaultChecked={page.isPublished} />
                Published
              </label>
              <SubmitButton label="Update Page" />
            </form>
          </AdminCard>
        ))}
      </div>
    </AdminPage>
  );
}
