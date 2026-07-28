import Image from "next/image";
import Link from "next/link";
import { loginAdmin } from "@/app/admin/actions";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-[#111827] p-12 lg:flex">
        <div className="flex items-center gap-3">
          <Image src="/logo/logo.jpg" alt="" width={40} height={40} className="rounded-lg" />
          <div>
            <p className="text-sm font-semibold text-white">House of Manivala</p>
            <p className="text-[10px] uppercase tracking-wider text-white/40">Admin Panel</p>
          </div>
        </div>
        <div>
          <h2 className="font-serif text-3xl leading-snug text-white">
            Manage your store
            <br />
            from one place.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
            Update products, categories, appearance, and content — changes go live instantly.
          </p>
        </div>
        <p className="text-xs text-white/30">© House of Manivala</p>
      </div>

      {/* Right login form */}
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <Image src="/logo/logo.jpg" alt="" width={36} height={36} className="rounded-lg" />
            <p className="font-semibold text-[#111827]">House of Manivala Admin</p>
          </div>

          <h1 className="text-2xl font-semibold text-[#111827]">Sign in</h1>
          <p className="mt-2 text-sm text-[#6b7280]">
            Enter your credentials to access the dashboard.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Invalid email or password.
            </div>
          )}

          <form action={loginAdmin} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-[#374151]">Email</span>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-[#374151]">Password</span>
              <input
                name="password"
                type="password"
                required
                className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2.5 text-sm outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#111827] py-2.5 text-sm font-medium text-white transition hover:bg-[#1f2937]"
            >
              Sign In
            </button>
          </form>

          <Link
            href="/"
            className="mt-6 block text-center text-sm text-[#6b7280] hover:text-[#111827]"
          >
            ← Back to store
          </Link>
        </div>
      </div>
    </div>
  );
}
