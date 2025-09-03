"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"normal" | "error" | "loading">("normal");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(`/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("normal");
        // Save token, redirect, etc.
        router.push("/authorization/login");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Login failed");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-xl rounded-2xl bg-gradient-to-b from-background via-muted to-background relative">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleFormSubmit}>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                className="focus:ring-2 focus:ring-primary transition-all"
                value={form.email}
                onChange={handleFormChange}
                required
              />
            </div>
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                className="focus:ring-2 focus:ring-primary transition-all"
                value={form.password}
                onChange={handleFormChange}
                required
              />
            </div>
            {status === "error" && (
              <div className="text-red-500 text-sm text-center">{errorMsg}</div>
            )}
            <Button
              type="submit"
              className="w-full transition-all hover:scale-[1.02] active:scale-[0.98]"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Logging in..." : "Login"}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              <Link href="/authorization/signup">Don't have an account? Sign Up</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
