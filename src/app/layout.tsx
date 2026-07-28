import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "House of Manivala",
  description: "Fine jewelry for life's most precious moments",
  icons: { icon: "/logo/logo.jpg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
