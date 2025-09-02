"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfileCard } from "../components/profile-card";

export default function UserProfilePage() {
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-10 space-y-10 relative">
      {/* Floating Generate Card Button */}
      <Button
        onClick={() => setShowCard(true)}
        className="absolute top-4 right-2 z-50 inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white backdrop-blur-3xl">
          Generate Profile Card
        </span>
      </Button>

      {/* Top Hero Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <Image
          src="https://i.pravatar.cc/150"
          alt="Profile"
          width={128}
          height={128}
          className="w-32 h-32 rounded-full border-4 border-primary object-cover"
        />

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold">John Doe</h1>
          <p className="text-muted-foreground">
            Final Year B.Tech | Aspiring Software Engineer
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Phone size={16} /> +91 9876543210
            </div>
            <div className="flex items-center gap-1">
              <Mail size={16} /> johndoe@example.com
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} /> Mumbai, India
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <section>
        <h2 className="text-lg font-semibold text-primary mb-2">About</h2>
        <p className="text-muted-foreground leading-relaxed">
          Passionate developer with experience in building modern web apps.
          Skilled in JavaScript, React, and Node.js. Loves participating in
          hackathons and solving real-world problems with technology.
        </p>
      </section>

      {/* Candidate Info */}
      <section className="border-t pt-6">
        <h2 className="text-lg font-semibold text-primary mb-4">
          Candidate Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p>
            <strong>Date of Birth:</strong> 01-01-2000
          </p>
          <p>
            <strong>Gender:</strong> Male
          </p>
          <p>
            <strong>Category:</strong> General
          </p>
          <p>
            <strong>Guardian:</strong> Mr. Doe
          </p>
        </div>
      </section>

      {/* Education */}
      <section className="border-t pt-6">
        <h2 className="text-lg font-semibold text-primary mb-4">
          Education Qualification
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p>
            <strong>Qualification:</strong> Graduation
          </p>
          <p>
            <strong>Course:</strong> Engineering
          </p>
          <p>
            <strong>Stream:</strong> Computer Science
          </p>
          <p>
            <strong>Institute:</strong> IIT Kharagpur
          </p>
          <p>
            <strong>Year of Passing:</strong> 2024
          </p>
          <p>
            <strong>Marks:</strong> 8.5 CGPA
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t pt-6">
        <h2 className="text-lg font-semibold text-primary mb-4">
          Skills & Interests
        </h2>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
            JavaScript
          </span>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
            React
          </span>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
            Node.js
          </span>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
            Web Development
          </span>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 border-t pt-8 mb-12">
        <Button variant="outline">Edit Profile</Button>
        <Button>Browse Internships 🚀</Button>
      </div>

      {/* Modal for Profile Card */}
      {showCard && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative">
            {/* Profile Card with onClose */}
            <ProfileCard onClose={() => setShowCard(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
