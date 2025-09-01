"use client";

import WrapButton from "@/components/ui/wrap-button";
import { SkiperCard } from "@/components/ui/skiper-card";
import {
  MinimalCard,
  MinimalCardTitle,
  MinimalCardDescription,
} from "@/components/ui/minimal-card";
import HoverExpand from "@/components/ui/hover-expand";
import AnimatedNumberRandom from "@/components/ui/animated-number-random";
import { SkiperMarquee } from "@/components/ui/skiper-marquee";
import ShareButton from "@/components/ui/share-button";
import BadgeButton from "@/components/ui/badge-button";
import { TextScroll } from "@/components/ui/text-scroll";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import TopBar from "@/components/common/topbar";

const randomImage = (id: number) => `https://picsum.photos/seed/${id}/600/400`;

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground transition-colors duration-300">
      <TopBar />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] sm:min-h-screen text-center px-4 pt-20">
        <div className="relative z-10 flex flex-col items-center justify-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg leading-tight">
            Smart Internship Matching
          </h1>
          <p className="text-muted-foreground text-sm sm:text-lg md:text-xl px-2">
            AI-powered, explainable & fair internship allocation system built
            for the future.
          </p>
          <div className="mt-6 flex justify-center">
            <WrapButton href="/login">🚀 Get Started</WrapButton>
          </div>
        </div>
      </section>

      {/* ---------------- TEXT SCROLL EFFECT ---------------- */}
      <TextScroll
        text="FAIR • EXPLAINABLE • AI-POWERED • INTERNSHIP MATCHING"
        className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-extrabold py-6 sm:py-10 md:py-12 border-y border-border"
      />

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <SkiperCard
          title="Explainable Matching"
          description="See why a candidate is matched: Skills %, Location Fit, Diversity Weight."
          bgClass="bg-gradient-to-r from-indigo-500 to-purple-500"
          image={{
            step1light1: randomImage(1),
            step1light2: randomImage(2),
            step2light1: randomImage(3),
            step2light2: randomImage(4),
            step3light: randomImage(5),
            step4light: randomImage(6),
            alt: "XAI",
          }}
        />
        <SkiperCard
          title="Fairness & Policy Knobs"
          description="Configurable quotas for gender, PwD, rural applicants."
          bgClass="bg-gradient-to-r from-pink-500 to-red-500"
          image={{
            step1light1: randomImage(7),
            step1light2: randomImage(8),
            step2light1: randomImage(9),
            step2light2: randomImage(10),
            step3light: randomImage(11),
            step4light: randomImage(12),
            alt: "Policy",
          }}
        />
        <SkiperCard
          title="Feedback Loop"
          description="Student & employer feedback retrains model every cycle."
          bgClass="bg-gradient-to-r from-teal-500 to-green-500"
          image={{
            step1light1: randomImage(13),
            step1light2: randomImage(14),
            step2light1: randomImage(15),
            step2light2: randomImage(16),
            step3light: randomImage(17),
            step4light: randomImage(18),
            alt: "Feedback",
          }}
        />
      </section>

      {/* ---------------- MINIMAL FEATURES ---------------- */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MinimalCard>
          <MinimalCardTitle>Operational Resilience</MinimalCardTitle>
          <MinimalCardDescription>
            Auto waitlist + re-match in real time.
          </MinimalCardDescription>
        </MinimalCard>
        <MinimalCard>
          <MinimalCardTitle>Capacity Guardrails</MinimalCardTitle>
          <MinimalCardDescription>
            Prevent over-allocation per city, company or institute.
          </MinimalCardDescription>
        </MinimalCard>
        <MinimalCard>
          <MinimalCardTitle>Multi-channel UX</MinimalCardTitle>
          <MinimalCardDescription>
            APIs, bulk upload, WhatsApp/SMS notifications.
          </MinimalCardDescription>
        </MinimalCard>
      </section>

      {/* ---------------- SHOWCASE SECTION ---------------- */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12">
          Platform Showcase
        </h2>
        <HoverExpand
          images={[
            "https://picsum.photos/400/300",
            "https://picsum.photos/401/300",
            "https://picsum.photos/402/300",
            "https://picsum.photos/403/300",
          ]}
        />
      </section>

      {/* ---------------- STATS SECTION ---------------- */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-muted text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-12">
          Platform Stats
        </h2>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
          <div>
            <AnimatedNumberRandom value={12450} diff={0.05} />
            <p className="mt-2 text-muted-foreground text-sm sm:text-base">
              Students
            </p>
          </div>
          <div>
            <AnimatedNumberRandom value={350} diff={0.02} />
            <p className="mt-2 text-muted-foreground text-sm sm:text-base">
              Companies
            </p>
          </div>
          <div>
            <AnimatedNumberRandom value={9600} diff={0.08} />
            <p className="mt-2 text-muted-foreground text-sm sm:text-base">
              Matches Made
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- SOCIAL / SHARE SECTION ---------------- */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
          Spread the Word
        </h2>
        <p className="text-muted-foreground mb-6 text-sm sm:text-base">
          Help us connect more students with the right internships.
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <ShareButton
            links={[
              { icon: Twitter, href: "https://twitter.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Facebook, href: "https://facebook.com" },
            ]}
          >
            Share
          </ShareButton>
          <BadgeButton />
        </div>
      </section>

      {/* ---------------- MARQUEE FOOTER ---------------- */}
      <SkiperMarquee />

      {/* ---------------- BIG FOOTER ---------------- */}
      <footer className="bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-muted-foreground text-sm">
          {/* Column 1 */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-foreground">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Cookies
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                Email:{" "}
                <a
                  href="mailto:info@smartintern.com"
                  className="hover:text-foreground"
                >
                  info@smartintern.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+91-9876543210" className="hover:text-foreground">
                  +91-9876543210
                </a>
              </li>
              <li>
                Address:{" "}
                <span className="hover:text-foreground">Kharagpur, India</span>
              </li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="hover:text-foreground"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="hover:text-foreground"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:text-foreground"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-6 text-center text-muted-foreground text-xs">
          © {new Date().getFullYear()} Smart Internship. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
