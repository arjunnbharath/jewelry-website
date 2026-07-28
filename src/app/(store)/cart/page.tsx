import { CartContent } from "@/components/store/CartContent";
import { getSiteSettings } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const settings = await getSiteSettings();
  return <CartContent currencySymbol={settings.currencySymbol} />;
}
