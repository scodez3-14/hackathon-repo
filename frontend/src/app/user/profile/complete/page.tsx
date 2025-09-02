"use client";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "../../_store/profileStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CompletedPage() {
  const { isProfileComplete } = useProfileStore();
  const router = useRouter();

  useEffect(() => {
    if (!isProfileComplete) {
      // Agar profile complete nahi hai toh wapas profile pe bhej do
      router.push("/user/profile");
    }
  }, [isProfileComplete, router]);

  if (!isProfileComplete) {
    return null; // jab tak redirect hota hai kuch mat dikhana
  }

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4 pt-6 space-y-2 ">
      {/* Success Icon */}
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
        🎉 Profile Setup Complete!
      </h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        You can now browse and apply for internships tailored to your skills.
      </p>

      {/* Main Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Link href="/internships">
          <Button className="w-full sm:w-auto">Browse Internships 🚀</Button>
        </Link>
        <Link href="/user/profile">
          <Button variant="outline" className="w-full sm:w-auto">
            Edit Profile
          </Button>
        </Link>
      </div>

      {/* Motivational / Footer text */}
      <p className="text-xs text-muted-foreground mt-6">
        Ready to take the next step? Start applying today and unlock your
        opportunities.
      </p>
    </div>
  );
}
