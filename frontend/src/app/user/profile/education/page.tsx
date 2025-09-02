"use client";

import { useRouter } from "next/navigation";
import { useStepStore } from "../../_store/stepStore";
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

// 👇 import Aceternity UI FileUpload
import { FileUpload } from "@/components/ui/file-upload";

export default function EducationPage() {
  const router = useRouter();
  const setStep = useStepStore((state) => state.setStep);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    if (form.checkValidity() && uploadedFiles.length > 0) {
      setStep(5); // ✅ move to next step
      router.push("/user/profile/skills"); // next page
    } else {
      form.reportValidity();
    }
  };

  const handlePrevious = () => {
    setStep(3); // ✅ back to contact details
    router.push("/user/profile/details");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 p-4 sm:p-6 bg-card rounded-xl shadow-md max-w-5xl mx-auto"
    >
      <h2 className="text-xl font-semibold">Education Qualification</h2>
      <p className="text-sm text-muted-foreground">
        Please enter your qualifications in order of completion (Class 10th,
        then Class 12th, then Graduation, etc.).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Qualification */}
        <div className="flex flex-col gap-2">
          <Label>Qualification</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select qualification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Class 10</SelectItem>
              <SelectItem value="12">Class 12</SelectItem>
              <SelectItem value="graduation">Graduation</SelectItem>
              <SelectItem value="postgrad">Post Graduation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course */}
        <div className="flex flex-col gap-2">
          <Label>Course</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
              <SelectItem value="commerce">Commerce</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Specialization */}
        <div className="flex flex-col gap-2">
          <Label>Stream / Specialization</Label>
          <Input placeholder="Enter stream or specialization" required />
        </div>

        {/* Board / University */}
        <div className="flex flex-col gap-2">
          <Label>Name of Board / University</Label>
          <Input placeholder="Enter name of board or university" required />
        </div>

        {/* Institute */}
        <div className="flex flex-col gap-2">
          <Label>Name of Institute</Label>
          <Input placeholder="Enter name of institute" required />
        </div>

        {/* Year of Passing */}
        <div className="flex flex-col gap-2">
          <Label>Year of Passing</Label>
          <Input type="number" placeholder="Enter year" required />
        </div>

        {/* Marks */}
        <div className="flex flex-col gap-2">
          <Label>CGPA / Grade / Percentage</Label>
          <Input placeholder="Enter marks" required />
        </div>

        {/* 🆕 Upload Certificate */}
        <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
          <Label>Upload Certificate</Label>
          <FileUpload
            onChange={(files) => {
              setUploadedFiles(files);
              console.log("Uploaded files:", files);
            }}
          />
          {uploadedFiles.length > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              {uploadedFiles.length} file(s) selected
            </p>
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
        <Button type="submit" className="w-full md:w-auto">
          Save & Next
        </Button>
      </div>
    </form>
  );
}
