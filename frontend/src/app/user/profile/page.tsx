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
import { useStepStore } from "../_store/stepStore";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/ui/file-upload";

export default function ProfileForm() {
  const [sameAddress, setSameAddress] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const setStep = useStepStore((state) => state.setStep);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setStep(3);
      router.push("/user/profile/details");
    } else {
      form.reportValidity();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-4 sm:p-6 bg-card rounded-xl shadow-md max-w-4xl w-full mx-auto"
    >
      {/* Candidate Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <RadioGroup
            defaultValue="male"
            className="flex gap-6 flex-wrap"
            required
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="r1" />
              <Label htmlFor="r1">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="r2" />
              <Label htmlFor="r2">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="r3" />
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

      {/* File Upload */}
      <div className="mt-6">
        <Label className="mb-2 block">Upload ID Proof</Label>
        <FileUpload
          onChange={(files) => {
            setUploadedFiles(files);
          }}
        />
        {uploadedFiles.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            {uploadedFiles.length} file(s) selected
          </p>
        )}
      </div>

      {/* Permanent Address */}
      <h2 className="text-lg font-semibold mt-6">Permanent Address</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          className="flex gap-6 mt-2 flex-wrap"
          required
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="sameYes" />
            <Label htmlFor="sameYes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="sameNo" />
            <Label htmlFor="sameNo">No</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Current Address (only if No) */}
      {!sameAddress && (
        <>
          <h2 className="text-lg font-semibold mt-6">Current Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <RadioGroup
          defaultValue="no"
          className="flex gap-6 mt-2 flex-wrap"
          required
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="pwdYes" />
            <Label htmlFor="pwdYes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="pwdNo" />
            <Label htmlFor="pwdNo">No</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
        <Button type="button" variant="outline" className="w-full sm:w-auto">
          Previous / Edit
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          Save & Next
        </Button>
      </div>
    </form>
  );
}
