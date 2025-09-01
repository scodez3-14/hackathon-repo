"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStepStore } from "./_store/stepStore";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const [sameAddress, setSameAddress] = useState(true);
  const setStep = useStepStore((state) => state.setStep);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    // Agar form valid hai → next step
    if (form.checkValidity()) {
      setStep(3);
      router.push("/user/profile/details");
    } else {
      // ❌ HTML5 validation messages trigger
      form.reportValidity();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-card rounded-xl shadow-md"
    >
      {/* Candidate Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Candidate Name</Label>
          <Input placeholder="Enter full name" className="mt-2.5" required />
        </div>
        <div>
          <Label>Date of Birth</Label>
          <Input type="date" className="mt-1" required />
        </div>
        <div>
          <Label className="mb-2">Gender</Label>
          <RadioGroup defaultValue="male" className="flex gap-6" required>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="male"
                id="r1"
                className="data-[state=checked]:bg-blue-500 border-2 border-gray-400"
              />
              <Label htmlFor="r1">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="female"
                id="r2"
                className="data-[state=checked]:bg-blue-500 border-2 border-gray-400"
              />
              <Label htmlFor="r2">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="other"
                id="r3"
                className="data-[state=checked]:bg-blue-500 border-2 border-gray-400"
              />
              <Label htmlFor="r3">Other</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label>Father / Mother / Guardian Name</Label>
          <Input placeholder="Enter name" className="mt-1" required />
        </div>
        <div>
          <Label className="mb-1.5">Category</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="obc">OBC</SelectItem>
              <SelectItem value="sc">SC</SelectItem>
              <SelectItem value="st">ST</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Permanent Address */}
      <h2 className="text-lg font-semibold mt-6">Permanent Address</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="House / Apartment No." required />
        <Input placeholder="Address Line 1" required />
        <Input placeholder="Address Line 2" />
        <Input placeholder="Village" required />
        <Input placeholder="Zip / Postal Code" required />
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="State / UT" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="maharashtra">Maharashtra</SelectItem>
            <SelectItem value="karnataka">Karnataka</SelectItem>
          </SelectContent>
        </Select>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="north-west">North West</SelectItem>
            <SelectItem value="south">South</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Address Same As */}
      <div className="mt-4">
        <Label>Is your permanent address same as current address?</Label>
        <RadioGroup
          value={sameAddress ? "yes" : "no"}
          onValueChange={(val) => setSameAddress(val === "yes")}
          className="flex gap-6 mt-2"
          required
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="yes"
              id="sameYes"
              className="data-[state=checked]:bg-blue-500 border-2 border-gray-400"
            />
            <Label htmlFor="sameYes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="no"
              id="sameNo"
              className="data-[state=checked]:bg-blue-500 border-2 border-gray-400"
            />
            <Label htmlFor="sameNo">No</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Current Address (only if No) */}
      {!sameAddress && (
        <>
          <h2 className="text-lg font-semibold mt-6">Current Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="House / Apartment No." required />
            <Input placeholder="Address Line 1" required />
            <Input placeholder="Address Line 2" />
            <Input placeholder="Village" required />
            <Input placeholder="Zip / Postal Code" required />
          </div>
        </>
      )}

      {/* Differently-abled */}
      <div className="mt-4">
        <Label>Differently-abled</Label>
        <RadioGroup defaultValue="no" className="flex gap-6 mt-2" required>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="yes"
              id="pwdYes"
              className="data-[state=checked]:bg-blue-500 border-2 border-gray-400"
            />
            <Label htmlFor="pwdYes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="no"
              id="pwdNo"
              className="data-[state=checked]:bg-blue-500 border-2 border-gray-400"
            />
            <Label htmlFor="pwdNo">No</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline">
          Previous / Edit
        </Button>
        <Button type="submit">Save & Next</Button>
      </div>
    </form>
  );
}
