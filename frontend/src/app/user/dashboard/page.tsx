"use client";

import { WarpBackground } from "@/components/magicui/warp-background";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, UploadCloud, CheckCircle2, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Internship = {
  id: string;
  title: string;
  company: string;
  location: string;
  applicantName: string;
  status: "pending" | "allotted" | "waitlist";
};

const DEMO_DATA: Internship[] = [
  {
    id: "i1",
    title: "Frontend Intern",
    company: "Skipper Labs",
    location: "Bengaluru",
    applicantName: "Aman Kumar",
    status: "pending",
  },
  {
    id: "i2",
    title: "Data Science Intern",
    company: "InsightAI",
    location: "Kolkata",
    applicantName: "Neha Singh",
    status: "pending",
  },
];

export default function DashboardPageSimple() {
  const [pending, setPending] = useState<Internship[]>(DEMO_DATA);
  const [allotted, setAllotted] = useState<Internship[]>([]);
  const [waitlist, setWaitlist] = useState<Internship[]>([]);
  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    title: string;
    desc?: string;
  } | null>(null);

  const [active, setActive] = useState<"pending" | "allotted" | "waitlist">(
    "pending"
  );

  const acceptInternship = useCallback((id: string) => {
    setPending((prevPending) => {
      const chosen = prevPending.find((p) => p.id === id);
      if (!chosen) return prevPending;
      const newPending = prevPending.filter((p) => p.id !== id);

      setAllotted((prevAllotted) => {
        const already = prevAllotted.some((a) => a.id === id);
        if (already) {
          const filtered = prevAllotted.filter((a) => a.id !== id);
          return [{ ...chosen, status: "allotted" }, ...filtered];
        }
        return [{ ...chosen, status: "allotted" }, ...prevAllotted];
      });

      setWaitlist((prevWait) => prevWait.filter((w) => w.id !== id));

      setAlertMessage({
        type: "success",
        title: "Accepted",
        desc: `${chosen.applicantName} allotted to ${chosen.title}`,
      });

      return newPending;
    });
  }, []);

  const rejectInternship = useCallback((id: string) => {
    setPending((prevPending) => {
      const rejected = prevPending.find((p) => p.id === id);
      if (!rejected) return prevPending;

      const newPending = prevPending.filter((p) => p.id !== id);

      setWaitlist((prevWait) => {
        const already = prevWait.some((w) => w.id === id);
        if (already) {
          const filtered = prevWait.filter((w) => w.id !== id);
          return [{ ...rejected, status: "waitlist" }, ...filtered];
        }
        return [{ ...rejected, status: "waitlist" }, ...prevWait];
      });

      setAllotted((prevAllotted) => prevAllotted.filter((a) => a.id !== id));

      setAlertMessage({
        type: "error",
        title: "Moved to Waitlist",
        desc: `${rejected.applicantName} moved to waitlist`,
      });

      return newPending;
    });
  }, []);

  useEffect(() => {
    if (!alertMessage) return;
    const t = setTimeout(() => setAlertMessage(null), 3000);
    return () => clearTimeout(t);
  }, [alertMessage]);

  const renderList = useCallback(
    (
      list: Internship[],
      emptyText: string,
      color: "yellow" | "green" | "blue",
      allowActions = false
    ) => {
      return (
        <div className="space-y-4">
          {list.length === 0 ? (
            <Card className="text-center p-6 rounded-xl border border-dashed shadow-sm dark:border-slate-700">
              <p className="text-muted-foreground">{emptyText}</p>
            </Card>
          ) : (
            list.map((item) => (
              <Card
                key={`${color}-${item.id}`}
                className={`rounded-xl shadow-md border-l-4 transition-transform duration-150 max-sm:w-full overflow-hidden ${
                  color === "yellow"
                    ? "border-yellow-400 dark:border-yellow-600"
                    : color === "green"
                    ? "border-green-400 dark:border-green-600"
                    : "border-blue-400 dark:border-blue-600"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <span className="text-slate-900 dark:text-slate-100 font-semibold">
                      {item.title}
                    </span>
                    <Badge
                      className={
                        item.status === "pending"
                          ? "bg-yellow-200 text-yellow-900"
                          : item.status === "allotted"
                          ? "bg-green-200 text-green-900"
                          : "bg-blue-200 text-blue-900"
                      }
                    >
                      {item.status}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {item.applicantName} • {item.location}
                  </p>
                </CardHeader>

                {allowActions && (
                  <CardContent className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <Button
                      onClick={() => acceptInternship(item.id)}
                      size="sm"
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="h-4 w-4" /> Accept
                    </Button>
                    <Button
                      onClick={() => rejectInternship(item.id)}
                      size="sm"
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <X className="h-4 w-4" /> Reject
                    </Button>
                    {/* small-screen info aligned right */}
                    <div className="ml-auto text-xs text-muted-foreground hidden sm:block">
                      {item.company}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>
      );
    },
    [acceptInternship, rejectInternship]
  );

  const counts = useMemo(
    () => ({
      pending: pending.length,
      allotted: allotted.length,
      waitlist: waitlist.length,
    }),
    [pending.length, allotted.length, waitlist.length]
  );

  return (
    <div>
      <WarpBackground className="flex justify-center">
        <div className="min-h-screen p-4 sm:p-6 md:p-8 ">
          <div className="sm:max-w-6xl mx-auto space-y-6">
            {/* Alert */}
            {alertMessage && (
              <Alert
                className={`flex items-start gap-3 rounded-xl shadow-lg p-4 border ${
                  alertMessage.type === "success"
                    ? "border-green-400 "
                    : "border-red-400 "
                }`}
              >
                {alertMessage.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 mt-1" />
                )}
                <div>
                  <AlertTitle className="font-semibold text-base">
                    {alertMessage.title}
                  </AlertTitle>
                  <AlertDescription>{alertMessage.desc}</AlertDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto hover:bg-transparent"
                  onClick={() => setAlertMessage(null)}
                >
                  ✕
                </Button>
              </Alert>
            )}

            {/* header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                🎓 Internship Dashboard
              </h1>
              <div className="flex items-center gap-3">
                <Badge className="bg-purple-200 text-purple-900">Demo</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <UploadCloud className="h-4 w-4" />{" "}
                  <span className="hidden sm:inline">Export CSV</span>
                </Button>
              </div>
            </div>

            {/* simple tabs as responsive buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActive("pending")}
                className={`px-3 py-2 rounded ${
                  active === "pending"
                    ? "bg-yellow-200 text-yellow-900 font-semibold"
                    : "bg-transparent text-sm"
                }`}
              >
                ⏳ Pending ({counts.pending})
              </button>
              <button
                onClick={() => setActive("allotted")}
                className={`px-3 py-2 rounded ${
                  active === "allotted"
                    ? "bg-green-200 text-green-900 font-semibold"
                    : "bg-transparent text-sm"
                }`}
              >
                ✅ Allotted ({counts.allotted})
              </button>
              <button
                onClick={() => setActive("waitlist")}
                className={`px-3 py-2 rounded ${
                  active === "waitlist"
                    ? "bg-blue-200 text-blue-900 font-semibold"
                    : "bg-transparent text-sm"
                }`}
              >
                🕒 Waitlist ({counts.waitlist})
              </button>
            </div>

            {/* content */}
            <div className="mt-4">
              {/* Use responsive container so items stack nicely on small screens */}
              <div className="grid grid-cols-1 gap-6">
                {active === "pending" &&
                  renderList(pending, "No pending internships", "yellow", true)}
                {active === "allotted" &&
                  renderList(
                    allotted,
                    "No allotted internships",
                    "green",
                    false
                  )}
                {active === "waitlist" &&
                  renderList(
                    waitlist,
                    "No waitlisted internships",
                    "blue",
                    false
                  )}
              </div>
            </div>
          </div>
        </div>
      </WarpBackground>
    </div>
  );
}
