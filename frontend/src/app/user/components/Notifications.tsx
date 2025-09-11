"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Notification = {
  id: string;
  title: string;
  message: string;
  details?: string;
  createdAt?: string;
};

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "🎉 Internship Allotted",
    message: "You have been allotted two internships.",
    details: "Frontend Intern – Aman Kumar (Bengaluru)",
    createdAt: new Date().toISOString(),
  },
  {
    id: "n2",
    title: "🎉 Internship Allotted",
    message: "You have been allotted two internships.",
    details: "Data Science Intern – Neha Singh (Kolkata)",
    createdAt: new Date().toISOString(),
  },
];

export default function Notifications({
  onClose,
  initial = DEMO_NOTIFICATIONS,
}: {
  onClose: () => void;
  initial?: Notification[];
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  // <- component manages its own notification list so Dismiss can remove items
  const [items, setItems] = useState<Notification[]>(initial);

  // close on outside click (closes panel, doesn't mutate notifications)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // dismiss single notification
  const dismissOne = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  // dismiss all notifications
  const dismissAll = () => {
    setItems([]);
  };

  return (
    <div
      ref={panelRef}
      className="absolute right-0 mt-2 w-88 max-w-xs bg-popover border rounded-lg shadow-lg z-50 p-2"
      aria-live="polite"
    >
      <div className="flex items-center justify-between px-2 mb-2">
        <div className="font-semibold">Notifications</div>
        <div className="flex items-center gap-2">
          <button
            onClick={dismissAll}
            className="text-xs px-2 py-1 rounded hover:bg-accent"
            aria-label="Dismiss all"
            title="Dismiss all"
          >
            Dismiss all
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-accent"
            aria-label="Close notifications"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {items.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center p-3">
            No new notifications
          </div>
        ) : (
          items.map((n) => (
            <Card key={n.id} className="p-2 bg-card border shadow-sm">
              <CardContent className="p-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-sm">{n.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {n.message}
                    </div>
                    {n.details && (
                      <div className="text-xs text-muted-foreground mt-2">
                        {n.details}
                      </div>
                    )}
                  </div>

                  {/* quick dismiss button for this notification */}
                  <div className="ml-3 flex-shrink-0">
                    <button
                      onClick={() => dismissOne(n.id)}
                      className="text-xs px-2 py-1 rounded bg-transparent hover:bg-accent"
                      aria-label={`Dismiss ${n.id}`}
                      title="Dismiss"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  {/* Example actions — you can wire these to real handlers later */}
                  <Button
                    size="sm"
                    onClick={() => {
                      // demo action: close panel and navigate, or open details
                      onClose();
                    }}
                    className="px-2"
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
