import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Kababayan NY — Filipino Community Guide NYC",
  description: "Discover Filipino-friendly restaurants, neighborhoods, and community spots across New York City.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-[#0F172A]">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
