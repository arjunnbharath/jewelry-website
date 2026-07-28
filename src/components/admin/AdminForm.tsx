export function AdminField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#374151]">
        {label}
      </span>
      {children}
      {hint && (
        <span className="mt-1 block text-xs text-[#9ca3af]">{hint}</span>
      )}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition focus:border-[#111827] focus:ring-1 focus:ring-[#111827]";

export const textareaClass =
  "w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-sm text-[#111827] outline-none transition focus:border-[#111827] focus:ring-1 focus:ring-[#111827]";

export const selectClass = inputClass;

export function SubmitButton({
  label,
  pending,
}: {
  label: string;
  pending?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-[#111827] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1f2937] disabled:opacity-60"
    >
      {pending ? "Saving..." : label}
    </button>
  );
}
