"use client";

import { useRouter } from "next/navigation";
import { CircleUser, Bell, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useProfileStore } from "../_store/profileStore";
import Notifications from "../components/Notifications";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UserNav() {
  const [open, setOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const { isProfileComplete } = useProfileStore();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="flex items-center gap-4 absolute right-2 top-3 z-50">
      {/* Notification Icon */}
      <div className="relative">
        <button
          aria-label="Toggle notifications"
          onClick={() => setShowNotifs((prev) => !prev)}
          className="p-1 rounded-full hover:bg-accent"
        >
          <Bell className="w-6 h-6 text-foreground" />
        </button>

        {/* red dot */}
        {!isProfileComplete && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-background" />
        )}

        {/* Notifications panel: on md+ show anchored dropdown, on mobile bottom sheet handled inside Notifications */}
        {showNotifs && (
          // wrapper positions dropdown near the bell on larger screens
          <div className="hidden md:block relative">
            <div className="absolute right-0 mt-2">
              <Notifications onClose={() => setShowNotifs(false)} />
            </div>
          </div>
        )}

        {/* Mobile: show bottom-sheet Notifications (Notifications component already handles mobile fixed positioning).
            We render it outside of the md:hidden so it shows on small screens.
        */}
        {showNotifs && (
          <div className="md:hidden">
            <Notifications onClose={() => setShowNotifs(false)} />
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-accent"
        >
          <CircleUser className="w-7 h-7 text-foreground" />
          <span
            className={`w-3 h-3 rounded-full ${
              isProfileComplete ? "bg-green-500" : "bg-red-500"
            }`}
          />
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-popover border rounded-lg shadow-lg p-2 z-50">
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
                    />
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

            <button
              onClick={() => {
                setOpen(false);
                router.push("/");
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
