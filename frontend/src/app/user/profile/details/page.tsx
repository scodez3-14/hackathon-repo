"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStepStore } from "../../_store/stepStore";
import { useRouter } from "next/navigation";
import OtpVerify from "@/components/common/otp";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactDetailsPage() {
  const setStep = useStepStore((state) => state.setStep);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [otpGenerate, setOtpGenerate] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() && otpVerified) {
      setStep(4);
      router.push("/user/profile/education");
    } else if (!otpVerified) {
      setOtpError("⚠️ Please verify OTP before proceeding!");
    } else {
      form.reportValidity();
    }
  };

  const handlePrevious = () => {
    setStep(2);
    router.push("/user/profile");
  };

  const handleSendOtp = () => {
    if (!email) return;
    setOtpSent(true);
    setResendTimer(30);
    setOtpError("");

    const interval = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    console.log("OTP sent to:", email);
  };

  const handleOtpVerify = (otp: string) => {
    if (otp === "123456") {
      setOtpVerified(true);
      setOtpSent(false);
      setOtpError("");
      setOtpGenerate(true);
    } else {
      setOtpVerified(false);
      setOtpError("❌ Invalid OTP. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 p-6 bg-card rounded-xl shadow-md max-w-4xl mx-auto"
    >
      <h2 className="text-xl font-semibold">Candidate Contact Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Registered Mobile */}
        <div className="flex flex-col gap-2">
          <Label>Registered Mobile Number</Label>
          <Input placeholder="Enter registered mobile number" required />
        </div>

        {/* Alternate Mobile */}
        <div className="flex flex-col gap-2">
          <Label>Alternate Mobile Number</Label>
          <Input placeholder="Enter alternate number" />
        </div>

        {/* Mobile Ownership */}
        <div className="flex flex-col gap-2">
          <Label>
            Does the registered mobile number (login ID) belong to you?
          </Label>
          <RadioGroup defaultValue="yes" className="flex gap-6 mt-1" required>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes"
                id="mobileYes"
                className="data-[state=checked]:bg-blue-500 border-2 border-gray-400"
              />
              <Label htmlFor="mobileYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no"
                id="mobileNo"
                className="data-[state=checked]:bg-blue-500 border-2 border-gray-400"
              />
              <Label htmlFor="mobileNo">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Owner Name */}
        <div className="flex flex-col gap-2">
          <Label>Whom does the number belong to?</Label>
          <Input placeholder="Enter full name of owner" required />
        </div>

        {/* Relation */}
        <div className="flex flex-col gap-2">
          <Label>What is your relation with the owner?</Label>
          <Input placeholder="Enter relation" required />
        </div>

        {/* Email with OTP */}
        <div className="flex flex-col gap-2 col-span-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Enter email ID"
            required
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!otpGenerate && (
            <Button
              type="button"
              className="w-fit mt-2"
              onClick={handleSendOtp}
              disabled={!email}
            >
              Generate OTP
            </Button>
          )}

          {otpSent && (
            <>
              <p className="text-sm text-muted-foreground mt-1">
                OTP has been sent to{" "}
                <span className="font-semibold">{email}</span>
              </p>
              {resendTimer > 0 ? (
                <p className="text-xs text-muted-foreground mt-1">
                  Resend OTP in {resendTimer}s
                </p>
              ) : (
                <Button
                  type="button"
                  className="mt-2 w-fit"
                  onClick={handleSendOtp}
                >
                  Resend OTP
                </Button>
              )}

              <div className="mt-4">
                <OtpVerify onVerify={handleOtpVerify} />
              </div>
            </>
          )}

          {/* ✅ Success + Error messages */}
          <AnimatePresence>
            {otpVerified && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-green-600 font-medium mt-2"
              >
                ✅ OTP Verified Successfully!
              </motion.div>
            )}
          </AnimatePresence>

          {otpError && !otpVerified && (
            <p className="text-red-500 text-sm mt-1">{otpError}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
        <Button
          type="button"
          variant="outline"
          className="w-full md:w-auto"
          onClick={handlePrevious}
        >
          Previous / Edit
        </Button>
        <Button
          type="submit"
          disabled={!otpVerified}
          className="w-full md:w-auto"
        >
          Save & Next
        </Button>
      </div>
    </form>
  );
}
