import Link from "next/link";

type BreadcrumbsProps = {
  items: { label: string; href?: string }[];
  light?: boolean;
};

export function Breadcrumbs({ items, light = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className={`flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] ${light ? "text-white/50" : "text-[var(--color-muted)]"}`}>
        <li>
          <Link href="/" className={`transition ${light ? "hover:text-white" : "hover:text-[var(--color-primary)]"}`}>
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className={light ? "text-white/20" : "text-[#D4D4D4]"}>/</span>
            {item.href ? (
              <Link href={item.href} className={`transition ${light ? "hover:text-white" : "hover:text-[var(--color-primary)]"}`}>
                {item.label}
              </Link>
            ) : (
              <span className={light ? "text-white" : "text-[var(--color-text)]"}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
