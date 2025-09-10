"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStepStore } from "../../_store/stepStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { X } from "lucide-react";
import { useProfileStore } from "../../_store/profileStore";

const skillOptions = [
  "Python",
  "Artificial Intelligence",
  "Machine Learning",
  "DBMS",
  "JavaScript",
  "Tableau",
  "React",
  "Node.js",
];

const sectorOptions = [
  "AI",
  "Web Development",
  "Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Blockchain",
  "Cloud Computing",
  "DevOps",
  "UI/UX Design",
  "Mobile Development",
];

export default function SkillsPage() {
  const setStep = useStepStore((state) => state.setStep);
  const router = useRouter();
  const { isProfileComplete, setProfileComplete } = useProfileStore();

  const [skills, setSkills] = useState<string[]>([]);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [sectorPreferences, setSectorPreferences] = useState<string[]>(["", "", ""]);
  const [locationPreferences, setLocationPreferences] = useState<
    { state: string; district: string; city: string }[]
  >([
    { state: "", district: "", city: "" },
    { state: "", district: "", city: "" },
    { state: "", district: "", city: "" },
  ]);

  const handlePrevious = () => {
    setStep(5);
    router.push("/user/profile/bank");
  };

  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) setSkills([...skills, skill]);
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSectorSelect = (rank: number, value: string) => {
    setSectorPreferences((prev) => {
      const updated = [...prev];
      updated[rank] = value;
      return updated;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCertificateFile(file);
  };

  const handleLocationChange = (
    rank: number,
    field: "state" | "district" | "city",
    value: string
  ) => {
    setLocationPreferences((prev) => {
      const updated = [...prev];
      updated[rank] = { ...updated[rank], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Save skills, sector & location preferences
      const skillsRes = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/users/profile/skills",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            skills,
            sectorPreferences,
            locationPreferences,
          }),
          credentials: "include",
        }
      );

      if (!skillsRes.ok) {
        throw new Error("Failed to save skills");
      }

      // Upload certificate file if present
      if (certificateFile) {
        const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(certificateFile.type)) {
          const formData = new FormData();
          formData.append("certificate", certificateFile);
          formData.append("educationIndex", "0");

          const certRes = await fetch(
            process.env.NEXT_PUBLIC_BACKEND_URL +
              "/api/users/profile/education/certificate",
            {
              method: "POST",
              body: formData,
              credentials: "include",
            }
          );

          if (!certRes.ok) {
            throw new Error("Failed to upload certificate");
          }
        } else {
          alert("Invalid file type. Only PDF, JPG, JPEG, PNG allowed.");
          return;
        }
      }

      setStep(7);
      if (!isProfileComplete) setProfileComplete(true);
      router.push("/user/profile/complete");
    } catch (err) {
      alert("Failed to save skills or upload certificate. Please try again.");
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 p-6 bg-card rounded-xl shadow-md max-w-5xl mx-auto"
    >
      <h2 className="text-xl font-semibold">
        Skills, Certifications & Experience
      </h2>

      {/* Skills */}
      <div className="flex flex-col gap-2">
        <Label>My Skills</Label>
        <Select onValueChange={handleAddSkill}>
          <SelectTrigger>
            {skills.length === 0 ? (
              <span className="text-muted-foreground">Select skills</span>
            ) : (
              <span className="text-muted-foreground">Add more skills</span>
            )}
          </SelectTrigger>
          <SelectContent>
            {skillOptions.map((skill) => (
              <SelectItem key={skill} value={skill}>
                {skill}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-primary/20 text-primary rounded-full flex items-center gap-2"
            >
              {skill}
              <X
                className="w-4 h-4 cursor-pointer"
                onClick={() => handleRemoveSkill(skill)}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Certificate Upload */}
      <div className="space-y-2">
        <Label htmlFor="certificate" className="font-medium">
          Upload Certificate (PDF/JPG/PNG)
        </Label>
        <Input
          id="certificate"
          name="certificate"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="block w-full border border-border rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-primary transition-all shadow-sm"
        />
        {certificateFile && (
          <div className="text-xs text-muted-foreground mt-1">
            Selected: {certificateFile.name}
          </div>
        )}
      </div>

      {/* Sector Preferences */}
      <div className="space-y-2">
        <Label className="font-medium">Sector Preferences (Rank 1, 2, 3)</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((rank) => (
            <div key={rank} className="flex flex-col gap-1">
              <Label
                htmlFor={`sector-rank-${rank}`}
                className="text-sm font-medium"
              >
                Preference {rank + 1}
              </Label>
              <select
                id={`sector-rank-${rank}`}
                value={sectorPreferences[rank]}
                onChange={(e) => handleSectorSelect(rank, e.target.value)}
                className="block w-full border border-border rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-primary transition-all shadow-sm"
              >
                <option value="">Select sector</option>
                {sectorOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                    disabled={
                      sectorPreferences.includes(option) &&
                      sectorPreferences[rank] !== option
                    }
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Choose your top 3 sectors in order of preference.
        </div>
      </div>

      {/* Location Preferences */}
      <div className="space-y-2">
        <Label className="font-medium">Location Preferences (Rank 1, 2, 3)</Label>
        <div className="space-y-4">
          {[0, 1, 2].map((rank) => (
            <div
              key={rank}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-3 rounded-lg"
            >
              <div>
                <Label className="text-sm font-medium">State</Label>
                <Input
                  type="text"
                  placeholder="Enter state"
                  value={locationPreferences[rank].state}
                  onChange={(e) =>
                    handleLocationChange(rank, "state", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="text-sm font-medium">District</Label>
                <Input
                  type="text"
                  placeholder="Enter district"
                  value={locationPreferences[rank].district}
                  onChange={(e) =>
                    handleLocationChange(rank, "district", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="text-sm font-medium">City</Label>
                <Input
                  type="text"
                  placeholder="Enter city"
                  value={locationPreferences[rank].city}
                  onChange={(e) =>
                    handleLocationChange(rank, "city", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Choose your top 3 location preferences with State, District, and City.
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
