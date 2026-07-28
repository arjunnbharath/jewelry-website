import { CheckoutForm } from "@/components/store/CheckoutForm";
import { getSiteSettings } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const settings = await getSiteSettings();

  return <CheckoutForm currencySymbol={settings.currencySymbol} />;
}
