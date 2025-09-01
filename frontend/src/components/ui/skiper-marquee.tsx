"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: unknown;
}

function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:25s] [--gap:3rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 items-center [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

// Example company logos
const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
];

const stats = [
  "🌟 10,000+ Students",
  "🚀 350+ Companies",
  "🤝 9600+ Matches Made",
  "🏆 Trusted by IITs",
];

export function SkiperMarquee() {
  return (
    <section id="marquee-footer" className="w-full">
      <div className="container mx-auto px-4 py-12 flex flex-col gap-12">
        {/* Company Logos Marquee */}
        <Marquee pauseOnHover className="[--duration:40s]">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="h-12 w-32 flex items-center justify-center grayscale hover:grayscale-0 transition"
            >
              <Image
                src={logo}
                alt={`logo-${idx}`}
                width={120}
                height={48}
                className="object-contain"
              />
            </div>
          ))}
        </Marquee>

        {/* Stats Marquee */}
        <Marquee
          reverse
          pauseOnHover
          className="[--duration:30s] text-xl font-semibold text-gray-200"
        >
          {stats.map((item, idx) => (
            <span
              key={idx}
              className="px-6 whitespace-nowrap bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent"
            >
              {item}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
