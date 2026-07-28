import Image from "next/image";
import Link from "next/link";
import type { NavItem, SiteSettings } from "@/generated/prisma/client";

const FOOTER_LOGO = "/logo/footer.png";

type FooterProps = {
  settings: SiteSettings;
  navItems: NavItem[];
  categories: { id: string; name: string; slug: string }[];
};

const whatsAppButtonClass =
  "inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-transparent px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#25D366] transition hover:bg-[#25D366]/10 sm:px-5 sm:tracking-[0.14em]";

const instagramButtonClass =
  "inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-transparent px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#E4405F] transition hover:bg-[#E4405F]/10 sm:px-5 sm:tracking-[0.14em]";

function getWhatsAppUrl(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}`;
}

export function Footer({ settings, navItems, categories }: FooterProps) {
  const whatsAppUrl = getWhatsAppUrl(settings.footerPhone);
  const pageLinks = navItems.filter((item) => item.href !== "/products");

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-black text-white">
      <div className="store-x safe-bottom w-full py-8 sm:py-10 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          {/* Brand */}
          <div className="shrink-0 text-center lg:max-w-[38%] lg:text-left">
            <Link href="/" className="inline-block">
              <Image
                src={FOOTER_LOGO}
                alt={settings.siteName}
                width={480}
                height={120}
                className="mx-auto h-16 w-auto max-w-[260px] object-contain sm:h-20 sm:max-w-[320px] lg:mx-0 lg:h-28 lg:max-w-[480px]"
              />
            </Link>
            <p className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-white/40 lg:mx-0 lg:mt-4 lg:max-w-md">
              {settings.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-1 flex-col gap-8 lg:gap-0">
            {/* Mobile WhatsApp — full width, top of links */}
            {(whatsAppUrl || settings.instagramUrl) && (
              <div className="md:hidden">
                <SocialButtons
                  whatsAppUrl={whatsAppUrl}
                  instagramUrl={settings.instagramUrl}
                  variant="mobile"
                />
              </div>
            )}

            <div className="grid grid-cols-3 gap-x-3 sm:gap-x-6 md:grid-cols-4 md:gap-6 lg:gap-10 xl:gap-12">
              <FooterColumn title="Shop">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="transition hover:text-white"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </FooterColumn>

              <FooterColumn title="Help">
                {pageLinks.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} className="transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <span className="text-white/45">Shipping</span>
                </li>
              </FooterColumn>

              <FooterColumn title="Connect">
                {settings.pinterestUrl && (
                  <li>
                    <a
                      href={settings.pinterestUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-white"
                    >
                      Pinterest
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href={`mailto:${settings.footerEmail}`}
                    className="transition hover:text-white"
                  >
                    Email
                  </a>
                </li>
              </FooterColumn>

              {/* Desktop social */}
              <div className="hidden min-w-0 md:block">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:mb-3">
                  Follow
                </p>
                <SocialButtons
                  whatsAppUrl={whatsAppUrl}
                  instagramUrl={settings.instagramUrl}
                  variant="desktop"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center text-[10px] text-white/30 sm:flex-row sm:justify-between sm:text-left lg:mt-10">
          <p>
            © {new Date().getFullYear()} {settings.siteName}
          </p>
          <div className="flex gap-5">
            <span className="cursor-pointer transition hover:text-white/50">Privacy</span>
            <span className="cursor-pointer transition hover:text-white/50">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialButtons({
  whatsAppUrl,
  instagramUrl,
  variant = "desktop",
}: {
  whatsAppUrl: string | null;
  instagramUrl: string | null;
  variant?: "mobile" | "desktop";
}) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile
          ? "flex w-full flex-row gap-2.5"
          : "flex flex-col items-start gap-2.5"
      }
    >
      {whatsAppUrl && (
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noreferrer"
          className={
            isMobile
              ? `${whatsAppButtonClass} min-h-[48px] w-full active:scale-[0.98]`
              : "inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#25D366] transition hover:text-[#3dd977]"
          }
        >
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          WhatsApp
        </a>
      )}
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          className={
            isMobile
              ? `${instagramButtonClass} min-h-[48px] w-full active:scale-[0.98]`
              : "inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E4405F] transition hover:text-[#f5607a]"
          }
        >
          <InstagramIcon className="h-4 w-4 shrink-0" />
          Instagram
        </a>
      )}
    </div>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70 sm:mb-3 sm:text-[10px] sm:tracking-[0.18em]">
        {title}
      </p>
      <ul className="space-y-2 text-[10px] text-white/45 sm:text-xs sm:space-y-2.5">
        {children}
      </ul>
    </div>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
