"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FlipLink from "@/components/ui/text-effect-flipper";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function BottomNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Feedback", href: "/feedback" },
    { name: "Upload", href: "/upload" },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-lg px-4 pointer-events-auto">
      {/* Desktop Navbar */}
      <div
        className="
          relative hidden md:flex items-center justify-between gap-12 px-12 py-3 
          rounded-full bg-background/80 backdrop-blur-xl border border-border shadow-xl
          pointer-events-auto
        "
      >
        {/* Left Links */}
        <div className="flex items-center gap-6">
          {links.slice(0, 2).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href}>
                <FlipLink
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </FlipLink>
              </Link>
            );
          })}
        </div>

        {/* Center Floating Theme Button */}
        <div className="absolute -top-3 left-[48.5%] -translate-x-1/2 ">
          <div
            className="
              w-15 h-15 rounded-full bg-background border-4 border-border shadow-lg 
              flex items-center justify-center pointer-events-auto
            "
          >
            <ThemeToggleButton />
          </div>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-6">
          {links.slice(2).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href}>
                <FlipLink
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </FlipLink>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ✅ Mobile Navbar */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-2 rounded-full 
        bg-background/80 backdrop-blur-xl border border-border shadow-lg 
        fixed bottom-1 left-1/2 -translate-x-1/2 w-[90%] max-w-sm"
      >
        <ThemeToggleButton />
        <button className="p-1" onClick={() => setMenuOpen((prev) => !prev)}>
          {menuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* ✅ Slide-Up Mobile Menu */}
      {menuOpen && (
        <div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 
          w-[90%] rounded-xl bg-background border border-border shadow-lg p-4
          flex flex-col items-center gap-3 animate-in fade-in-50 slide-in-from-bottom-2"
        >
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
