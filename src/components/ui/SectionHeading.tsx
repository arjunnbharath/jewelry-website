type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  action?: React.ReactNode;
};

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  action,
}: SectionHeadingProps) {
  if (align === "left" && action) {
    return (
      <div className="mb-12 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl tracking-[0.08em] text-[var(--color-text)] sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-[var(--color-muted)]">{subtitle}</p>
          )}
          <div className="mt-4 h-0.5 w-12 bg-[var(--color-primary)]" />
        </div>
        {action}
      </div>
    );
  }

  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
      <h2 className="font-serif text-2xl tracking-[0.08em] text-[var(--color-text)] sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-2 text-sm text-[var(--color-muted)] ${align === "center" ? "mx-auto max-w-md" : ""}`}>
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-0.5 w-12 bg-[var(--color-primary)] ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
