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
  SelectValue,
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

const interestOptions = ["Tech", "Finance", "Quant", "Design", "Marketing"];

export default function SkillsPage() {
  const setStep = useStepStore((state) => state.setStep);
  const router = useRouter();
  const { isProfileComplete, setProfileComplete } = useProfileStore();
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [githubLink, setGithubLink] = useState("");
  const [certifications, setCertifications] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) setSkills([...skills, skill]);
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleAddInterest = (interest: string) => {
    if (!interests.includes(interest)) setInterests([...interests, interest]);
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (interests.includes("Tech") && !githubLink) {
      alert("⚠️ Please provide your GitHub repo link for Tech interest!");
      return;
    }
    setStep(7); // ✅ next step
    if (!isProfileComplete) setProfileComplete(true);
    router.push("/user/profile/complete"); // next page
  };

  const handlePrevious = () => {
    setStep(5); // back to Bank details
    router.push("/user/profile/bank");
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

      {/* Interests */}
      {/* Interests */}
      {/* Interests */}
      <div className="flex flex-col gap-2">
        <Label>My Interests</Label>
        <Select onValueChange={handleAddInterest}>
          <SelectTrigger>
            {interests.length === 0 ? (
              <span className="text-muted-foreground">Select interests</span>
            ) : (
              <span className="text-muted-foreground">Add more interests</span>
            )}
          </SelectTrigger>
          <SelectContent>
            {interestOptions.map((interest) => (
              <SelectItem key={interest} value={interest}>
                {interest}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-2 mt-2">
          {interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full flex items-center gap-2"
            >
              {interest}
              <X
                className="w-4 h-4 cursor-pointer"
                onClick={() => handleRemoveInterest(interest)}
              />
            </span>
          ))}
        </div>
      </div>

      {/* GitHub Link if Tech selected */}
      {interests.includes("Tech") && (
        <div className="flex flex-col gap-2">
          <Label>GitHub Repository Link</Label>
          <Input
            type="url"
            placeholder="https://github.com/your-repo"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </div>
      )}

      {/* Additional Certifications */}
      <div className="flex flex-col gap-2">
        <Label>Additional Certifications (if any)</Label>
        <Input
          placeholder="Enter additional certifications"
          value={certifications}
          onChange={(e) => setCertifications(e.target.value)}
        />
      </div>

      {/* Other Details */}
      <div className="flex flex-col gap-2">
        <Label>Other Details (if any)</Label>
        <Input
          placeholder="Enter other details"
          value={otherDetails}
          onChange={(e) => setOtherDetails(e.target.value)}
        />
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
