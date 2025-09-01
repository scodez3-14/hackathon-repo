"use client";

import Link from "next/link";

export default function TopBar() {
  return (
    <div className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-background/40 border-b border-border py-2 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Login */}
        <Link
          href="/login"
          className="px-4 py-1.5 rounded-md border border-border text-foreground/80 text-sm font-medium hover:bg-muted transition-colors"
        >
          Login
        </Link>

        {/* Center: SmartAI */}
        <h1 className="text-lg font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-wide">
          SmartAI
        </h1>

        {/* Right: Signup */}
        <Link
          href="authorization/signup"
          className="px-4 py-1.5 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white dark:text-foreground text-sm font-medium hover:opacity-90 transition"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
