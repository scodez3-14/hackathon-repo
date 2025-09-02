"use client";

import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import ShareButton from "@/components/ui/share-button";
import { X, Twitter, Linkedin, Facebook } from "lucide-react";

export function ProfileCard({ onClose }: { onClose: () => void }) {
  return (
    <CardContainer className="inter-var relative">
      <CardBody className="bg-background relative group/card dark:hover:shadow-2xl dark:hover:shadow-primary/[0.1] w-auto sm:w-[22rem] h-auto rounded-xl p-6 border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow hover:bg-gray-200 z-50"
        >
          <X size={18} className="text-black" />
        </button>

        {/* Profile Picture */}
        <CardItem translateZ="50" className="w-full flex justify-center">
          <Image
            src="https://i.pravatar.cc/150"
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-4 border-primary object-cover"
          />
        </CardItem>

        {/* Name + Tagline */}
        <CardItem translateZ="30" className="mt-4 text-center space-y-1">
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-muted-foreground text-sm">
            Full Stack Developer | React + Node.js
          </p>
        </CardItem>

        {/* Skills */}
        <CardItem
          translateZ="40"
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {["JavaScript", "React", "Node.js", "Tailwind"].map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
            >
              {skill}
            </span>
          ))}
        </CardItem>

        {/* Share Button */}
        <CardItem translateZ="20" className="mt-8 flex justify-center">
          <ShareButton
            links={[
              {
                icon: Twitter,
                href: "https://twitter.com/intent/tweet?text=Check%20out%20my%20profile%20card!",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/sharing/share-offsite/?url=https://example.com",
              },
              {
                icon: Facebook,
                href: "https://facebook.com/sharer/sharer.php?u=https://example.com",
              },
            ]}
          >
            Share Profile Card
          </ShareButton>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
