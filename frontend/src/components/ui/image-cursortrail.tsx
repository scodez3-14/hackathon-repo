"use client";

import { createRef, useRef } from "react";
import Image from "next/image"; // ✅ use next/image
import { cn } from "@/lib/utils";

interface ImageMouseTrailProps {
  items: string[];
  children?: React.ReactNode;
  className?: string;
  imgClass?: string;
  distance?: number;
  maxNumberOfImages?: number;
  fadeAnimation?: boolean;
}

export default function ImageCursorTrail({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = "w-40 h-48",
  distance = 20,
  fadeAnimation = false,
}: ImageMouseTrailProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef(items.map(() => createRef<HTMLDivElement>())); // ✅ wrapper div refs
  const currentZIndexRef = useRef(1);

  let globalIndex = 0;
  let last = { x: 0, y: 0 };

  const activate = (wrapper: HTMLDivElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect) return;

    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;
    wrapper.style.left = `${relativeX}px`;
    wrapper.style.top = `${relativeY}px`;

    if (currentZIndexRef.current > 40) {
      currentZIndexRef.current = 1;
    }
    wrapper.style.zIndex = String(currentZIndexRef.current);
    currentZIndexRef.current++;

    wrapper.dataset.status = "active";
    if (fadeAnimation) {
      setTimeout(() => {
        wrapper.dataset.status = "inactive";
      }, 1500);
    }
    last = { x, y };
  };

  const distanceFromLast = (x: number, y: number) => {
    return Math.hypot(x - last.x, y - last.y);
  };

  const deactivate = (wrapper: HTMLDivElement) => {
    wrapper.dataset.status = "inactive";
  };

  const handleOnMove = ({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) => {
    if (distanceFromLast(clientX, clientY) > window.innerWidth / distance) {
      const lead = refs.current[globalIndex % refs.current.length].current;
      const tail =
        refs.current[(globalIndex - maxNumberOfImages) % refs.current.length]
          ?.current;
      if (lead) activate(lead, clientX, clientY);
      if (tail) deactivate(tail);
      globalIndex++;
    }
  };

  return (
    <section
      onMouseMove={(e) => handleOnMove(e)}
      onTouchMove={(e) => handleOnMove(e.touches[0])}
      ref={containerRef}
      className={cn(
        "relative grid h-[600px] w-full place-content-center overflow-hidden rounded-lg",
        className
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          ref={refs.current[index]}
          data-index={index}
          data-status="inactive"
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-transform duration-300",
            "data-[status='active']:scale-100 data-[status='active']:opacity-100 data-[status='active']:duration-500",
            imgClass
          )}
          style={{ width: "160px", height: "200px" }} // ✅ fixed container size
        >
          <Image
            src={item}
            alt={`image`}
            fill
            className="rounded-3xl object-cover relative z-10"
          />
        </div>
      ))}
      {children}
    </section>
  );
}
