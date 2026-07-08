"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Solution } from "@/data/solutions";

interface SolutionTextOverlaysProps {
  solution: Solution;
}

export default function SolutionTextOverlays({ solution }: SolutionTextOverlaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track global page scroll progress
  const { scrollYProgress } = useScroll();

  // 1. Text Section 1 (Intro) Animation Maps
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.18], [0, -40]);

  // 2. Text Section 2 (Workflow & Architecture) Animation Maps
  const opacity2 = useTransform(scrollYProgress, [0.18, 0.24, 0.36, 0.42], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.18, 0.24, 0.36, 0.42], [40, 0, 0, -40]);

  // 3. Text Section 3 (Agentic Operations / Efficiency) Animation Maps
  const opacity3 = useTransform(scrollYProgress, [0.42, 0.48, 0.60, 0.66], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.42, 0.48, 0.60, 0.66], [40, 0, 0, -40]);

  // 4. Text Section 4 (Engineering / Guarantee) Animation Maps
  const opacity4 = useTransform(scrollYProgress, [0.66, 0.72, 0.84, 0.90], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.66, 0.72, 0.84, 0.90], [40, 0, 0, -40]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-30 pointer-events-none">
      
      {/* Beat 1: Intro Hero Text */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="fixed inset-0 flex flex-col items-center justify-center text-center px-6 h-screen"
      >
        <span className="text-xs uppercase tracking-[0.5em] font-mono text-[#8A8A8A] mb-4">
          ALKET SOLUTIONS
        </span>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-none text-[#F2F2F2]">
          {solution.section1.title}
        </h1>
        <p className="text-lg md:text-xl mt-4 font-light text-[#8A8A8A] max-w-xl">
          {solution.section1.subtitle}
        </p>
      </motion.div>

      {/* Beat 2: Core Detail */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="fixed inset-0 flex flex-col items-start justify-center px-8 md:px-24 text-left h-screen max-w-3xl"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#C4C4C4] mb-2 font-bold">
          01 // DESIGN ARCHITECTURE
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#F2F2F2] leading-tight">
          {solution.section2.title}
        </h2>
        <p className="text-base md:text-lg mt-4 font-light text-[#8A8A8A] leading-relaxed max-w-xl">
          {solution.section2.subtitle}
        </p>
      </motion.div>

      {/* Beat 3: Key Value Prop */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="fixed inset-0 flex flex-col items-end justify-center px-8 md:px-24 text-right h-screen ml-auto max-w-3xl"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#C4C4C4] mb-2 font-bold">
          02 // INTELLIGENCE LAYER
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#F2F2F2] leading-tight">
          {solution.section3.title}
        </h2>
        <p className="text-base md:text-lg mt-4 font-light text-[#8A8A8A] leading-relaxed max-w-xl">
          {solution.section3.subtitle}
        </p>
      </motion.div>

      {/* Beat 4: Process Guarantee */}
      <motion.div
        style={{ opacity: opacity4, y: y4 }}
        className="fixed inset-0 flex flex-col items-center justify-center text-center px-6 h-screen"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#C4C4C4] mb-2 font-bold">
          03 // ENGINEERING PROMISE
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#F2F2F2] leading-tight max-w-3xl">
          {solution.name} — optimized.
        </h2>
        <p className="text-base md:text-lg mt-4 font-light text-[#8A8A8A] max-w-xl">
          {solution.section4.title || "Engineered intelligence, built around your business goals. Designed to adapt, scale, and learn continuously."}
        </p>
      </motion.div>

    </div>
  );
}
