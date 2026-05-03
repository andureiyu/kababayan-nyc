"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/spots", label: "Spots" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5">
      <nav className="navbar-pill w-full max-w-3xl rounded-2xl px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="font-display font-800 text-xl tracking-tight"
          style={{ color: "#3f7366", fontWeight: 800, fontFamily: "Nunito, sans-serif" }}
        >
          Kababayan <span style={{ color: "#0F172A" }}>NY</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-[#2E8B57] active"
                    : "text-[#0F172A] hover:text-[#2E8B57]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Link
            href="/spots"
            className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#3f7366", fontFamily: "Inter, sans-serif" }}
          >
            Explore Spots
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-[#0F172A]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current mb-1"></span>
          <span className="block w-5 h-0.5 bg-current mb-1"></span>
          <span className="block w-5 h-0.5 bg-current"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="absolute top-18 left-4 right-4 rounded-2xl p-5 flex flex-col gap-3 md:hidden"
          style={{
            background: "rgba(255,255,255,0.97)",
            border: "1px solid #E2E8F0",
            boxShadow: "0 8px 32px rgba(15,23,42,0.12)",
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-semibold py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#DDF5E6] text-[#2E8B57]"
                    : "text-[#0F172A] hover:bg-[#F8FAFC]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/spots"
            onClick={() => setMenuOpen(false)}
            className="mt-1 text-sm font-semibold px-4 py-2.5 rounded-xl text-white text-center"
            style={{ backgroundColor: "#3f7366" }}
          >
            Explore Spots
          </Link>
        </div>
      )}
    </header>
  );
}
