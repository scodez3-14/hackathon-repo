"use client";
import React from "react";
import Link from "next/link";
import Waves from "@/components/Waves";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { SparklesText } from "@/components/magicui/sparkles-text";

const Page = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Waves (unchanged) */}
      <Waves
        lineColor="rgba(180, 180, 180, 0.7)"
        backgroundColor="transparent"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-6">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2">
          <TypingAnimation className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white">
            Discover Opportunities 🚀
          </TypingAnimation>

          {/* Tagline */}
          <SparklesText className="text-xl md:text-2xl font-semibold tracking-wide text-cyan-700 dark:text-cyan-300 mt-1">
            Smarter • Faster • Fairer
          </SparklesText>
        </div>

        {/* Subheading */}
        <p className="max-w-3xl text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
          Whether you are a{" "}
          <span className="font-semibold text-cyan-700 dark:text-cyan-400">
            student
          </span>{" "}
          looking for exciting internships or a{" "}
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
            company
          </span>{" "}
          seeking top talent, our AI-powered system connects you in the smartest
          way.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 mt-2">
          <Link
            href="/explore/companies"
            className="px-7 py-4 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-cyan-500 to-blue-600
                       shadow-lg hover:scale-105 hover:shadow-cyan-400/40
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                       focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-neutral-900
                       transition-transform duration-300"
            aria-label="Explore companies as a student"
          >
            🎓 I’m a Student — Explore Companies
          </Link>

          <Link
            href="/explore/candidates"
            className="px-7 py-4 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-emerald-500 to-green-600
                       shadow-lg hover:scale-105 hover:shadow-emerald-400/40
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                       focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-neutral-900
                       transition-transform duration-300"
            aria-label="Explore profiles as a company"
          >
            🏢 I’m a Company — Explore Profiles
          </Link>
        </div>

        {/* Note */}
        <p className="text-sm md:text-base italic mt-2 text-neutral-600 dark:text-neutral-400">
          Our AI ranks profiles & opportunities fairly so you can make the best
          decision.
        </p>
      </div>
    </div>
  );
};

export default Page;
