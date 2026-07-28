import { updateSettings } from "@/app/admin/actions";
import {
  AdminField,
  inputClass,
  SubmitButton,
  textareaClass,
} from "@/components/admin/AdminForm";
import { AdminCard, AdminPage } from "@/components/admin/AdminPage";
import { getSiteSettings } from "@/lib/site";

type Props = { searchParams: Promise<{ saved?: string }> };

export default async function SettingsPage({ searchParams }: Props) {
  const settings = await getSiteSettings();
  const { saved } = await searchParams;

  return (
    <AdminPage
      description="Footer, contact info, and currency."
      saved={!!saved}
      savedMessage="Settings saved."
    >
      <AdminCard>
        <form action={updateSettings} className="max-w-3xl space-y-5">
          <AdminField label="Footer About">
            <textarea
              name="footerAbout"
              defaultValue={settings.footerAbout}
              rows={4}
              className={textareaClass}
            />
          </AdminField>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Email">
              <input name="footerEmail" defaultValue={settings.footerEmail} className={inputClass} />
            </AdminField>
            <AdminField label="Phone">
              <input name="footerPhone" defaultValue={settings.footerPhone} className={inputClass} />
            </AdminField>
          </div>
          <AdminField label="Address">
            <input name="footerAddress" defaultValue={settings.footerAddress} className={inputClass} />
          </AdminField>
          <div className="grid gap-5 sm:grid-cols-3">
            <AdminField label="Instagram URL">
              <input name="instagramUrl" defaultValue={settings.instagramUrl ?? ""} className={inputClass} />
            </AdminField>
            <AdminField label="Facebook URL">
              <input name="facebookUrl" defaultValue={settings.facebookUrl ?? ""} className={inputClass} />
            </AdminField>
            <AdminField label="Pinterest URL">
              <input name="pinterestUrl" defaultValue={settings.pinterestUrl ?? ""} className={inputClass} />
            </AdminField>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Currency Code">
              <input name="currency" defaultValue={settings.currency} className={inputClass} />
            </AdminField>
            <AdminField label="Currency Symbol">
              <input name="currencySymbol" defaultValue={settings.currencySymbol} className={inputClass} />
            </AdminField>
          </div>
          <SubmitButton label="Save Settings" />
        </form>
      </AdminCard>
    </AdminPage>
  );
}
