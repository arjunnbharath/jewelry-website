type AdminPageProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  saved?: boolean;
  savedMessage?: string;
  children: React.ReactNode;
};

export function AdminPage({
  title,
  description,
  action,
  saved,
  savedMessage = "Changes saved successfully.",
  children,
}: AdminPageProps) {
  const hasHeader = title || description || action;

  return (
    <div className="space-y-6">
      {hasHeader && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {(title || description) && (
            <div>
              {title && (
                <h2 className="text-2xl font-semibold text-[#111827]">{title}</h2>
              )}
              {description && (
                <p className={`text-sm text-[#6b7280] ${title ? "mt-1" : ""}`}>
                  {description}
                </p>
              )}
            </div>
          )}
          {action}
        </div>
      )}

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          {savedMessage}
        </div>
      )}

      {children}
    </div>
  );
}

export function AdminCard({
  children,
  className = "",
  title,
  flush = false,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  flush?: boolean;
}) {
  return (
    <div className={`rounded-xl border border-[#e5e7eb] bg-white shadow-sm ${className}`}>
      {title && (
        <div className="border-b border-[#f3f4f6] px-6 py-4">
          <h3 className="text-sm font-semibold text-[#111827]">{title}</h3>
        </div>
      )}
      <div className={flush ? "" : "p-6"}>{children}</div>
    </div>
  );
}

export function AdminStatCard({
  label,
  value,
  hint,
  accent = "default",
}: {
  label: string;
  value: number | string;
  hint?: string;
  accent?: "default" | "warning" | "success";
}) {
  const accents = {
    default: "text-[#111827]",
    warning: "text-amber-600",
    success: "text-emerald-600",
  };

  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-[#6b7280]">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${accents[accent]}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-[#9ca3af]">{hint}</p>}
    </div>
  );
}

export function AdminButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "danger";
}) {
  const styles = {
    primary: "bg-[#111827] text-white hover:bg-[#1f2937]",
    secondary: "border border-[#e5e7eb] bg-white text-[#374151] hover:bg-[#f9fafb]",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  };

  const className = `inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${styles[variant]}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return <button type="button" className={className}>{children}</button>;
}
