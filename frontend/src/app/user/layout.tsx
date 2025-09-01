"use client";

import UserNav from "./components/userNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background  overflow-y-auto">
      {/* 🔹 Navbar */}
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <h1 className="text-lg font-bold text-primary">User Dashboard</h1>
          <UserNav />
        </div>
      </header>

      {/* 🔹 Dashboard Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">{children}</main>
    </div>
  );
}
