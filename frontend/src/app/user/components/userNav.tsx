"use client";
import { useRouter } from "next/navigation";
import { CircleUser, Bell } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UserNav() {
  // 👇 Abhi ke liye hardcoded
  const isProfileComplete = false;
  const router = useRouter();
  return (
    <div className="flex items-center gap-6 absolute right-2">
      {/* Notification Icon */}
      <div className="relative">
        <Bell className="w-6 h-6 text-foreground cursor-pointer" />
        {!isProfileComplete && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-background"></span>
        )}
      </div>

      {/* Profile Section with Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <CircleUser
                className="w-7 h-7 text-foreground"
                onClick={() => {
                  router.push("user/profile");
                }}
              />
              <span
                className={`w-3 h-3 rounded-full ${
                  isProfileComplete ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {isProfileComplete ? (
              <p className="text-green-500 font-semibold">
                ✅ Profile Completed
              </p>
            ) : (
              <p className="text-red-500 font-semibold">
                ⚠️ Profile Incomplete — Update your info
              </p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
