"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, FolderGit2, ArrowRight } from "lucide-react";

// 1. Portfolio data
export interface WorkItem {
  title: string;
  client: string;
  category: string;
  year: string;
  thumb: string;
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  results: [string, string][];
}

const workItems: WorkItem[] = [
  {
    title: "Intelligent Support Deflection",
    client: "Confidential Fintech Client",
    category: "Generative AI",
    year: "2026",
    thumb: "/images/work/project-01/thumb.webp",
    summary: "An AI-driven support system that deflects 60% of tickets before they reach a human agent.",
    problem: "Support volume was scaling faster than the team, with response times slipping and repetitive queries consuming senior agent time.",
    solution: "Alket architected a fine-tuned LLM-powered assistant trained on the client's knowledge base, integrated directly into their helpdesk with real-time escalation logic for complex cases.",
    stack: ["Fine-Tuned LLM", "RAG Pipeline", "Intelligent Routing"],
    results: [["60%", "Ticket Deflection"], ["-74%", "Response Time"], ["+18%", "CSAT"]]
  },
  {
    title: "Predictive Inventory Engine",
    client: "Confidential Retail Client",
    category: "Data Intelligence",
    year: "2025",
    thumb: "/images/work/project-02/thumb.webp",
    summary: "A predictive AI model that cut overstock costs by forecasting demand at the SKU level.",
    problem: "Manual forecasting led to chronic overstock in slow-moving categories and stockouts in high-demand ones, tying up working capital.",
    solution: "Alket built a machine learning pipeline ingesting historical sales, seasonality, and market signals to generate SKU-level demand forecasts, surfaced through a real-time dashboard.",
    stack: ["ML Forecasting Model", "Real-Time Dashboard", "Automated Alerts"],
    results: [["-32%", "Overstock"], ["-27%", "Stockouts"], ["91%", "Forecast Accuracy"]]
  },
  {
    title: "Workflow Automation Suite",
    client: "Confidential Logistics Client",
    category: "AI Automation",
    year: "2025",
    thumb: "/images/work/project-03/thumb.webp",
    summary: "AI agents that automated document processing and routing across a 40-person operations team.",
    problem: "Operations staff spent hours daily on manual document sorting, data entry, and routing between departments.",
    solution: "Alket deployed a suite of AI agents for document classification, extraction, and intelligent routing, integrated into the client's existing operations stack with zero workflow disruption.",
    stack: ["Document AI", "Intelligent Agents", "Workflow Integration"],
    results: [["120/wk", "Hours Saved"], ["5x", "Processing Speed"], ["-89%", "Error Rate"]]
  },
  {
    title: "Real-Time Fraud Scoring",
    client: "Confidential Payments Client",
    category: "Generative AI",
    year: "2026",
    thumb: "/images/work/project-04/thumb.webp",
    summary: "A low-latency AI scoring layer that flags fraudulent transactions before settlement.",
    problem: "Legacy rule-based fraud checks missed novel patterns and generated too many false positives, frustrating legitimate customers.",
    solution: "Alket deployed an ensemble ML model with real-time inference, retrained continuously on flagged transaction data, tuned specifically to the client's risk profile.",
    stack: ["ML Ensemble Model", "Real-Time Inference", "Continuous Retraining"],
    results: [["-41%", "False Positives"], ["<80ms", "Scoring Latency"], ["99.2%", "Detection Rate"]]
  },
  {
    title: "AI Content Engine",
    client: "Confidential Media Client",
    category: "Generative AI",
    year: "2025",
    thumb: "/images/work/project-05/thumb.webp",
    summary: "A brand-trained generative system producing on-voice draft content at scale.",
    problem: "Editorial teams couldn't keep pace with publishing demand while maintaining a consistent brand voice across formats.",
    solution: "Alket fine-tuned a language model on the client's style guide and archive, deploying it as a drafting assistant integrated into their existing CMS.",
    stack: ["Fine-Tuned LLM", "CMS Integration", "Style-Guide Training"],
    results: [["3.2x", "Output Volume"], ["-58%", "Editing Time"], ["94%", "Voice Match"]]
  }
];

export default function WorkCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [showDragHint, setShowDragHint] = useState(true);

  // Math config
  const totalItems = workItems.length;
  const angleStep = (2 * Math.PI) / totalItems;

  // Physics rotation states (in radians)
  const currentRotation = useRef(0);
  const targetRotation = useRef(0);

  // Drag states
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);

  // Inertia and display settings
  const inertiaSpeed = 0.08;
  const blurEffectActive = useRef(true);
  const radius = useRef(380); // Default desktop radius

  const lastActiveIndex = useRef(0);

  // Initialize and run the 3D loop
  useEffect(() => {
    // 1. Handle responsiveness & reduced motion settings
    const handleResize = () => {
      if (window.innerWidth < 640) {
        radius.current = 260; // Mobile radius
      } else {
        radius.current = 380; // Desktop radius
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      blurEffectActive.current = false;
    }

    let animationFrameId: number;

    // 2. Physics animation loop
    const tick = () => {
      // Easing rotation
      if (prefersReducedMotion) {
        currentRotation.current = targetRotation.current;
      } else {
        currentRotation.current += (targetRotation.current - currentRotation.current) * inertiaSpeed;
      }

      // Keep rotation in boundary
      const rotationRad = currentRotation.current;

      // Track card closest to 0 radians (centered card)
      let minAngleDiff = Infinity;
      let activeIdx = 0;

      // Update positions for each card direct to style to skip React state rendering bottlenecks
      for (let i = 0; i < totalItems; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;

        const cardAngle = (i * angleStep) + rotationRad;
        
        // Find normalized angle difference in [-PI, PI] to determine visual depth
        let angleDiff = cardAngle % (2 * Math.PI);
        if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;

        const absoluteDiff = Math.abs(angleDiff);
        if (absoluteDiff < minAngleDiff) {
          minAngleDiff = absoluteDiff;
          activeIdx = i;
        }

        // Apply 3D coordinate transformations
        const tx = Math.sin(cardAngle) * radius.current * 1.25;
        const tz = Math.cos(cardAngle) * radius.current;
        const ty = Math.sin(cardAngle * 2) * 80; // Sinusoidal elevation
        const rx = Math.cos(cardAngle * 2) * 15; // Sinusoidal tilt
        const ry = cardAngle * (180 / Math.PI); // Radial orientation

        // Depth calculations based on Cosine of the angle (1 at front, -1 at back)
        const depthFactor = (Math.cos(cardAngle) + 1) / 2; // 0.0 to 1.0

        const opacity = 0.35 + 0.65 * depthFactor;
        const scale = 0.68 + 0.32 * depthFactor;
        const zIndex = Math.round(depthFactor * 100);
        const blurValue = blurEffectActive.current ? (1 - depthFactor) * 6 : 0;

        card.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(${ry}deg) rotateX(${rx}deg) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(zIndex);
        card.style.filter = blurValue > 0.5 ? `blur(${blurValue}px)` : "none";

        // Active card highlight styling
        if (activeIdx === i && absoluteDiff < 0.2) {
          card.classList.add("wc-card-active");
        } else {
          card.classList.remove("wc-card-active");
        }
      }

      // Notify React state of active card changes to update page dots smoothly
      if (activeIdx !== lastActiveIndex.current) {
        lastActiveIndex.current = activeIdx;
        setActiveIndex(activeIdx);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [totalItems, angleStep]);

  // Drag Handlers
  const handleDragStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
    startRotation.current = targetRotation.current;
    setShowDragHint(false);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current) return;
    const deltaX = clientX - startX.current;
    // Map drag distance to rotation in radians
    const rotationOffset = (deltaX / window.innerWidth) * Math.PI * 1.6;
    targetRotation.current = startRotation.current + rotationOffset;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  // Mouse drag events
  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".wc-modal-trigger-btn") || (e.target as HTMLElement).closest(".wc-nav-btn")) return;
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  // Touch swipe events
  const onTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  // Wheel scroll to rotate
  const onWheel = (e: React.WheelEvent) => {
    // Only capture scrolling when mouse is over the container
    setShowDragHint(false);
    targetRotation.current += e.deltaY * 0.0012;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedWork) return; // Ignore when modal is open
      if (e.key === "ArrowLeft") {
        setShowDragHint(false);
        targetRotation.current += angleStep;
      } else if (e.key === "ArrowRight") {
        setShowDragHint(false);
        targetRotation.current -= angleStep;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [angleStep, selectedWork]);

  // Card click: center if offset, open modal if already centered
  const handleCardClick = (idx: number) => {
    const currentCardAngle = (idx * angleStep) + currentRotation.current;
    let angleDiff = currentCardAngle % (2 * Math.PI);
    
    if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
    if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;

    // If already centered, open modal
    if (Math.abs(angleDiff) < 0.15) {
      setSelectedWork(workItems[idx]);
    } else {
      // Center card by rotating the shortest direction
      setShowDragHint(false);
      targetRotation.current -= angleDiff;
    }
  };

  // Navigation arrows
  const navigateTo = (direction: "prev" | "next") => {
    setShowDragHint(false);
    if (direction === "prev") {
      targetRotation.current += angleStep;
    } else {
      targetRotation.current -= angleStep;
    }
  };

  return (
    <section className="relative z-30 px-6 py-28 bg-[#0A0A0A] border-t border-white/5 overflow-hidden">
      
      {/* 3D Scoped Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .wc-stage-container {
          perspective: 1200px;
          perspective-origin: 50% 35%;
          position: relative;
          width: 100%;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: none;
        }
        .wc-carousel-stage {
          transform-style: preserve-3d;
          position: relative;
          width: 100%;
          height: 100%;
        }
        .wc-card-wrapper {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 290px;
          height: 360px;
          margin-left: -145px;
          margin-top: -180px;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          background: rgba(28, 28, 28, 0.85);
          border: 1px solid #333333;
          border-radius: 14px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: border-color 0.4s, box-shadow 0.4s;
          cursor: pointer;
          user-select: none;
        }
        @media (min-width: 640px) {
          .wc-card-wrapper {
            width: 310px;
            height: 380px;
            margin-left: -155px;
            margin-top: -190px;
          }
        }
        .wc-card-wrapper.wc-card-active {
          border-color: #5A5A5A;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .wc-card-wrapper:hover {
          border-color: #5A5A5A;
        }
        .wc-no-select {
          -webkit-user-drag: none;
          user-drag: none;
        }
      `}} />

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Typographic Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#C4C4C4] rounded-full animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#8A8A8A] font-bold">
                PORTFOLIO SHOWCASE
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#F2F2F2]">
              Previous work
            </h2>
            <p className="text-sm text-neutral-400 font-light max-w-md leading-relaxed">
              Real AI solutions, engineered for real requirements.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo("prev")}
              className="wc-nav-btn w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-neutral-900/40 text-[#8A8A8A] hover:text-white hover:border-white/20 transition-all active:scale-95"
            >
              ‹
            </button>
            <button
              onClick={() => navigateTo("next")}
              className="wc-nav-btn w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-neutral-900/40 text-[#8A8A8A] hover:text-white hover:border-white/20 transition-all active:scale-95"
            >
              ›
            </button>
          </div>
        </div>

        {/* 3D Perspective Stage Container */}
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={handleDragEnd}
          onWheel={onWheel}
          className="wc-stage-container cursor-grab active:cursor-grabbing"
        >
          <div className="wc-carousel-stage">
            {workItems.map((work, idx) => {
              const primaryStat = work.results[0];
              const isCentered = idx === activeIndex;
              return (
                <div
                  key={idx}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  onClick={() => handleCardClick(idx)}
                  className="wc-card-wrapper"
                >
                  {/* Card top */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[9px] font-mono text-[#8A8A8A] uppercase tracking-wider">
                      <span className="bg-white/5 border border-white/5 px-2 py-0.5 rounded text-[#C4C4C4] font-medium">{work.category}</span>
                      <span>{work.year}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#F2F2F2] leading-tight">
                      {work.title}
                    </h3>
                    
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {work.summary}
                    </p>
                  </div>

                  {/* Card bottom */}
                  <div className="border-t border-white/5 pt-5 flex justify-between items-end">
                    <div className="space-y-0.5">
                      <span className="text-[8px] uppercase tracking-widest text-[#8A8A8A] block">
                        {primaryStat[1]}
                      </span>
                      <span className="text-2xl font-black text-[#C4C4C4]">
                        {primaryStat[0]}
                      </span>
                    </div>

                    {isCentered && (
                      <button className="wc-modal-trigger-btn w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center border border-white/5 text-[#F2F2F2] hover:bg-neutral-700 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Drag Hint */}
          <AnimatePresence>
            {showDragHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 text-center text-[10px] font-mono tracking-widest text-[#8A8A8A] pointer-events-none uppercase"
              >
                Drag or scroll to explore
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="flex justify-center items-center gap-3">
          {workItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setShowDragHint(false);
                // Calculate short delta to target index
                let angleDiff = ((idx * angleStep) + currentRotation.current) % (2 * Math.PI);
                if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
                if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
                targetRotation.current -= angleDiff;
              }}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === activeIndex ? "w-8 bg-[#F2F2F2]" : "w-2 bg-white/10"
              }`}
            />
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal Overlay */}
      <AnimatePresence>
        {selectedWork && (
          <WorkModal
            work={selectedWork}
            onClose={() => setSelectedWork(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// -------------------------------------------------------------
// WorkModal Detail Popup Component (matching Alket designs)
// -------------------------------------------------------------
interface WorkModalProps {
  work: WorkItem;
  onClose: () => void;
}

function WorkModal({ work, onClose }: WorkModalProps) {
  useEffect(() => {
    // Lock underlying page scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      
      {/* Backdrop blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal card */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-neutral-900 border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden relative shadow-2xl z-10 flex flex-col max-h-[90vh] md:max-h-[85vh] text-[#F2F2F2]"
      >
        
        {/* Header bar */}
        <div className="border-b border-white/5 p-6 md:p-8 flex justify-between items-start gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#8A8A8A]">
              <span className="flex items-center gap-1.5"><FolderGit2 className="w-3.5 h-3.5" />{work.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{work.client}</span>
              <span>•</span>
              <span>{work.year}</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              {work.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white/20 bg-neutral-800/80 flex items-center justify-center hover:bg-neutral-800 transition-all hover:rotate-90 duration-300"
          >
            <X className="w-5 h-5 text-neutral-400 hover:text-white" />
          </button>
        </div>

        {/* Modal content body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8 flex-1 scrollbar-thin scrollbar-color-[#3A3A3A] scrollbar-track-[#0A0A0A]">
          
          {/* Cover photo placeholder / image */}
          <div className="w-full h-48 md:h-64 rounded-2xl bg-neutral-950/60 border border-white/5 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent z-10" />
            <div className="text-center space-y-2 relative z-20">
              <span className="text-[10px] font-mono tracking-widest text-[#8A8A8A] uppercase">DEPLOYED SYSTEM</span>
              <p className="text-lg font-bold text-neutral-300">{work.title}</p>
            </div>
          </div>

          {/* Grid section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Left/Middle Column (Challenge and Solution) */}
            <div className="md:col-span-2 space-y-8">
              
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#8A8A8A] font-bold">
                  Core Summary
                </h4>
                <p className="text-sm md:text-base font-light text-neutral-300 leading-relaxed">
                  {work.summary}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#8A8A8A] font-bold">
                  The Problem
                </h4>
                <p className="text-sm md:text-base font-light text-neutral-300 leading-relaxed">
                  {work.problem}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#8A8A8A] font-bold">
                  The Solution Deployed
                </h4>
                <p className="text-sm md:text-base font-light text-neutral-300 leading-relaxed">
                  {work.solution}
                </p>
              </div>

            </div>

            {/* Right Column (Stats / Stack) */}
            <div className="space-y-8">
              
              {/* Results Stats */}
              <div className="space-y-4">
                <h5 className="text-[10px] font-mono text-[#8A8A8A] uppercase tracking-widest font-bold">
                  Verified Outcomes
                </h5>
                <div className="space-y-3">
                  {work.results.map((res, idx) => (
                    <div
                      key={idx}
                      className="border border-white/5 rounded-2xl p-4 bg-neutral-950/40"
                    >
                      <span className="text-[8px] uppercase tracking-widest text-[#8A8A8A] block mb-1">
                        {res[1]}
                      </span>
                      <span className="text-xl font-extrabold text-[#C4C4C4]">
                        {res[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Stack */}
              <div className="space-y-3 border-t border-white/5 pt-6">
                <h5 className="text-[10px] font-mono text-[#8A8A8A] uppercase tracking-widest font-bold">
                  Engine Parameters
                </h5>
                <div className="flex flex-wrap gap-2">
                  {work.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-neutral-950 border border-white/5 text-[#8A8A8A] text-[10px] tracking-wide rounded-full px-3.5 py-1 font-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 p-6 bg-neutral-950/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full font-bold text-xs bg-neutral-800 text-[#F2F2F2] border border-white/10 hover:border-white/20 transition-all hover:bg-neutral-700/60 active:scale-[0.98]"
          >
            Close Case Study
          </button>
        </div>

      </motion.div>
    </div>
  );
}
