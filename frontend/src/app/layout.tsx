import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "PM Internship Scheme",
  description: "Smart AI-based internship matching system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen flex flex-col ${poppins.className} bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* ✅ Main content scroll karega */}
          <main className="flex-1">{children}</main>

          {/* ✅ Bottom Navbar fixed */}
          <Navbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
