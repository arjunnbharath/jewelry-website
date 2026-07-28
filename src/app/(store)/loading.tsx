export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
      <p className="text-sm text-[var(--color-muted)]">Loading...</p>
    </div>
  );
}
