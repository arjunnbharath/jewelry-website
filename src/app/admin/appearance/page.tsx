import { updateAppearance } from "@/app/admin/actions";
import {
  AdminField,
  inputClass,
  SubmitButton,
  textareaClass,
} from "@/components/admin/AdminForm";
import { AdminCard, AdminPage } from "@/components/admin/AdminPage";
import { getSiteSettings } from "@/lib/site";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function AppearancePage({ searchParams }: Props) {
  const settings = await getSiteSettings();
  const { saved } = await searchParams;

  return (
    <AdminPage
      description="Control theme colors, hero section, and promo banner."
      saved={!!saved}
    >
      <AdminCard>
      <form action={updateAppearance} className="max-w-3xl space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Site Name">
            <input name="siteName" defaultValue={settings.siteName} className={inputClass} />
          </AdminField>
          <AdminField label="Tagline">
            <input name="tagline" defaultValue={settings.tagline} className={inputClass} />
          </AdminField>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {(
            [
              ["primaryColor", "Primary Color"],
              ["secondaryColor", "Secondary Color"],
              ["accentColor", "Accent Color"],
              ["backgroundColor", "Background"],
              ["textColor", "Text Color"],
              ["mutedColor", "Muted Color"],
            ] as const
          ).map(([name, label]) => (
            <AdminField key={name} label={label}>
              <input
                name={name}
                type="color"
                defaultValue={settings[name]}
                className="h-10 w-full cursor-pointer rounded-lg border border-[#E8DFD0]"
              />
            </AdminField>
          ))}
        </div>

        <AdminField label="Hero Title">
          <input name="heroTitle" defaultValue={settings.heroTitle} className={inputClass} />
        </AdminField>
        <AdminField label="Hero Subtitle">
          <textarea
            name="heroSubtitle"
            defaultValue={settings.heroSubtitle}
            rows={3}
            className={textareaClass}
          />
        </AdminField>
        <AdminField label="Hero Image URL">
          <input name="heroImageUrl" defaultValue={settings.heroImageUrl} className={inputClass} />
        </AdminField>
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminField label="Hero Button Text">
            <input name="heroCtaText" defaultValue={settings.heroCtaText} className={inputClass} />
          </AdminField>
          <AdminField label="Hero Button Link">
            <input name="heroCtaLink" defaultValue={settings.heroCtaLink} className={inputClass} />
          </AdminField>
        </div>

        <AdminField label="Promo Banner Text">
          <input
            name="promoBannerText"
            defaultValue={settings.promoBannerText}
            className={inputClass}
          />
        </AdminField>
        <label className="flex items-center gap-2 text-sm">
          <input
            name="promoBannerActive"
            type="checkbox"
            defaultChecked={settings.promoBannerActive}
          />
          Show promo banner in header
        </label>

        <SubmitButton label="Save Appearance" />
      </form>
      </AdminCard>
    </AdminPage>
  );
}
