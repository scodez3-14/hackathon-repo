"use client";
import { useRouter } from "next/navigation";
import { CircleUser, Bell, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useProfileStore } from "../_store/profileStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UserNav() {
  const [open, setOpen] = useState(false);
  const { isProfileComplete } = useProfileStore();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 👇 Click outside to close logic
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="flex items-center gap-6 absolute right-2">
      {/* Notification Icon */}
      <div className="relative">
        <Bell className="w-6 h-6 text-foreground cursor-pointer" />
        {!isProfileComplete && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-background"></span>
        )}
      </div>

      {/* Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <CircleUser className="w-7 h-7 text-foreground" />
          <span
            className={`w-3 h-3 rounded-full ${
              isProfileComplete ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
        </div>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-popover border rounded-lg shadow-lg p-2 z-50">
            {/* Profile Option with tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/user/profile");
                    }}
                    className="flex w-full items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <CircleUser className="w-4 h-4" />
                      Profile
                    </div>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isProfileComplete ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                  </button>
                </TooltipTrigger>
                {!isProfileComplete && (
                  <TooltipContent>
                    <p className="text-red-500 font-semibold">
                      ⚠️ Complete your profile
                    </p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>

            {/* Logout Option */}
            <button
              onClick={() => {
                setOpen(false);
                router.push("/");
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
