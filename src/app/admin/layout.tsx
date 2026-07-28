import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { getSession } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <AdminSidebar email={session.email} />
      <div className="pl-64">
        <AdminTopbar email={session.email} />
        <main className="min-h-[calc(100vh-4rem)] p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
