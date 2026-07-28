import type { SiteSettings } from "@/generated/prisma/client";

export function ThemeStyles({ settings }: { settings: SiteSettings }) {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            --color-primary: ${settings.primaryColor || "#c4a574"};
            --color-secondary: ${settings.secondaryColor || "#8b7355"};
            --color-accent: ${settings.accentColor || "#d4b896"};
            --color-background: ${settings.backgroundColor || "#f7f3ee"};
            --color-text: ${settings.textColor || "#1a1410"};
            --color-muted: ${settings.mutedColor || "#7a6f66"};
          }
        `,
      }}
    />
  );
}
