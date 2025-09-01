"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import OtpVerify from "../../../components/common/otp";
import Link from "next/link";

export default function SignupForm() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [status, setStatus] = useState<"normal" | "error" | "loading">(
    "normal"
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setStatus("error");
      return;
    }
    setStatus("normal");
    setStep("otp");
  };

  const handleOtpVerify = (enteredOtp: string) => {
    setStatus("loading");

    // Simulate API call delay
    setTimeout(() => {
      if (enteredOtp === "123456") {
        setStatus("normal");
        setStep("success");
      } else {
        setStatus("error");
      }
    }, 2000); // 2 second delay for loader demo
  };

  return (
    <Card className="w-full max-w-md shadow-xl rounded-2xl bg-gradient-to-b from-background via-muted to-background relative">
      <CardHeader>
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6 relative">
          {/* Step 1 */}

          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10
            ${
              step === "form"
                ? "bg-yellow-500 text-black"
                : "bg-green-500 text-white"
            }`}
          >
            1
          </div>

          {/* Animated Line */}
          <div className="relative flex-1 h-1 bg-border overflow-hidden">
            {step !== "form" && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6 }}
                className="h-full bg-green-500"
              />
            )}
          </div>

          {/* Step 2 */}
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10
            ${
              step === "otp"
                ? status === "error"
                  ? "bg-red-500 text-white"
                  : "bg-yellow-500 text-black"
                : step === "success"
                ? "bg-green-500 text-white"
                : "bg-muted text-foreground/50"
            }`}
          >
            2
          </div>
        </div>

        <CardTitle className="text-center text-2xl font-bold">
          {step === "form"
            ? "Create Account"
            : step === "otp"
            ? "Verify Email"
            : "Success 🎉"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {step === "form" && (
          <form className="space-y-5" onSubmit={handleFormSubmit}>
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="focus:ring-2 focus:ring-primary transition-all"
                value={form.name}
                onChange={handleFormChange}
                required
              />
            </div>

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

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="focus:ring-2 focus:ring-primary transition-all"
                value={form.confirmPassword}
                onChange={handleFormChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign Up
            </Button>

            {/* Trust Info */}
            <p className="text-xs text-muted-foreground text-center mt-3">
              🔒 Your information is secure & will never be shared with third
              parties.
            </p>
          </form>
        )}

        {step === "otp" && (
          <div className="space-y-6">
            {/* Show Email */}
            <p className="text-sm text-center text-muted-foreground">
              We have sent a valid OTP to{" "}
              <span className="font-semibold">{form.email}</span>
            </p>

            {/* Loader or OTP Verify */}
            {status === "loading" ? (
              <div className="flex flex-col items-center justify-center gap-3 py-6">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-muted-foreground">Verifying...</p>
              </div>
            ) : (
              <>
                <OtpVerify onVerify={handleOtpVerify} />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep("form")}
                >
                  ← Back
                </Button>
              </>
            )}
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-6">
            <p className="text-green-600 font-semibold text-lg">
              ✅ Your account has been created successfully!
            </p>
            <Button
              className="w-full"
              onClick={() => {
                router.push("/user");
              }}
            >
              Go to Dashboard
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
