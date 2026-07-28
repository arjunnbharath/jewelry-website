import type { SiteSettings } from "@/generated/prisma/client";

export function PromoBanner({ settings }: { settings: SiteSettings }) {
  if (!settings.promoBannerActive || !settings.promoBannerText) return null;

  return (
    <div className="bg-[var(--color-espresso)] px-4 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/80 sm:text-[11px]">
      {settings.promoBannerText}
    </div>
  );
}
