"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Eye, Network } from "lucide-react";

interface Founder {
  name: string;
  role: string;
  image: string;
  tagline: string;
  bio: string;
  bgName: string;
  specs: [string, string][];
}

const founders: Founder[] = [
  {
    name: "Axel Alket",
    role: "Grand Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    tagline: "Visual Singularity Architect",
    bio: "Axel founded Alket at the center of the first digital singularity. He specializes in folding complex UI architectures into intuitive 3D spaces, bridging the divide between high-dimensional machine models and tactile human perception.",
    bgName: "AXEL",
    specs: [
      ["Singularity Scale", "1.4x"],
      ["Vector Easing", "Linear-Lerp"],
      ["Architect Level", "L11-Matrix"]
    ]
  },
  {
    name: "Luna Void",
    role: "Neural Strategist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    tagline: "Multi-Dimensional Neuro-Architect",
    bio: "Luna maps the neural patterns of users across eleven dimensions. Her strategies ensure Alket's automated pipelines and content engines resonate with the subconscious mind, ensuring deterministic conversion rates with zero cognitive friction.",
    bgName: "LUNA",
    specs: [
      ["Neural Latency", "<2ms"],
      ["Conversion Index", "0.98"],
      ["Subconscious Target", "Beta-Band"]
    ]
  }
];

export default function Founders() {
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

  return (
    <section className="relative z-30 px-6 py-28 bg-[#0A0A0A] border-t border-white/5 overflow-hidden">
      
      {/* Portal keyframe animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rotatePortal {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .founder-portal {
          position: relative;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          overflow: hidden;
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
        }
        @media (min-width: 640px) {
          .founder-portal {
            width: 250px;
            height: 250px;
          }
        }
        .portal-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 104%;
          height: 104%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: conic-gradient(from 0deg, transparent, transparent, rgba(255,255,255,0.03), rgba(255,255,255,0.45));
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
        }
        .founder-portal:hover .portal-ring {
          opacity: 1;
          animation: rotatePortal 2.5s linear infinite;
        }
        .portal-scanline {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.08), transparent);
          pointer-events: none;
          z-index: 10;
          animation: scanline 3s linear infinite;
        }
        .glitch-noise {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0);
          background-size: 8px 8px;
          opacity: 0.12;
          pointer-events: none;
          z-index: 9;
        }
      `}} />

      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C4C4C4] rounded-full animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#8A8A8A] font-bold">
              THE CONSTRUCTORS
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#F2F2F2]">
            Meet the founders
          </h2>
          <p className="text-sm text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
            The engineering minds charting Alket's automated pipelines.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 justify-items-center">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedFounder(founder)}
              className="flex flex-col items-center text-center space-y-6 group cursor-pointer"
            >
              {/* Portal Picture Frame */}
              <div className="founder-portal shadow-2xl relative">
                {/* Conic rotating border ring */}
                <div className="portal-ring" />
                
                {/* Image mask */}
                <div className="absolute inset-[3px] bg-[#121212] rounded-full overflow-hidden z-10">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  {/* Digital Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all pointer-events-none" />
                  
                  {/* Hologram scanlines & static */}
                  <div className="portal-scanline" />
                  <div className="glitch-noise" />
                </div>
              </div>

              {/* Founder Meta */}
              <div className="space-y-1.5">
                <h3 className="text-2xl font-bold text-[#F2F2F2] tracking-tight group-hover:text-white transition-colors">
                  {founder.name}
                </h3>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#8A8A8A]">
                  {founder.role}
                </p>
              </div>

              {/* Tagline */}
              <p className="text-xs font-light text-neutral-400 max-w-xs leading-relaxed">
                "{founder.tagline}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Founder Details Modal */}
      <AnimatePresence>
        {selectedFounder && (
          <FounderModal
            founder={selectedFounder}
            onClose={() => setSelectedFounder(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// -------------------------------------------------------------
// Founder Modal component
// -------------------------------------------------------------
interface FounderModalProps {
  founder: Founder;
  onClose: () => void;
}

function FounderModal({ founder, onClose }: FounderModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-neutral-900 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden relative shadow-2xl z-10 flex flex-col max-h-[85vh] text-[#F2F2F2]"
      >
        
        {/* Giant Slow-Moving Background Name Tag */}
        <div className="absolute inset-x-0 top-1/4 select-none pointer-events-none overflow-hidden z-0 h-44 flex items-center">
          <motion.span
            initial={{ x: "-20%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="text-[120px] font-black text-white/[0.015] tracking-[0.2em] leading-none whitespace-nowrap block"
          >
            {founder.bgName} {founder.bgName}
          </motion.span>
        </div>

        {/* Header */}
        <div className="border-b border-white/5 p-6 sm:p-8 flex justify-between items-start gap-4 relative z-10">
          <div className="space-y-1">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A8A8A] font-bold">FOUNDING ENGINEER</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {founder.name}
            </h2>
            <p className="text-xs text-neutral-400 font-mono tracking-wider">{founder.role}</p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white/20 bg-neutral-800/80 flex items-center justify-center hover:bg-neutral-800 transition-all hover:rotate-90 duration-300 shrink-0"
          >
            <X className="w-5 h-5 text-neutral-400 hover:text-white" />
          </button>
        </div>

        {/* Body content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1 scrollbar-thin scrollbar-color-[#3A3A3A] scrollbar-track-[#0A0A0A] relative z-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-start">
            
            {/* Circular picture portal */}
            <div className="flex justify-center sm:justify-start">
              <div className="w-32 h-32 rounded-full overflow-hidden border border-white/10 p-1 bg-neutral-950">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Biography details */}
            <div className="sm:col-span-2 space-y-4">
              <p className="text-sm font-semibold text-[#C4C4C4] italic font-light">
                "{founder.tagline}"
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                {founder.bio}
              </p>
            </div>

          </div>

          {/* Core Specs metrics */}
          <div className="border-t border-white/5 pt-6 mt-6">
            <h4 className="text-[10px] font-mono text-[#8A8A8A] uppercase tracking-widest font-bold mb-4">
              Matrix Specifications
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {founder.specs.map((spec, idx) => (
                <div
                  key={idx}
                  className="border border-white/5 rounded-2xl p-4 bg-neutral-950/40 text-center"
                >
                  <span className="text-[8px] uppercase tracking-widest text-[#8A8A8A] block mb-1">
                    {spec[1]}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-[#C4C4C4]">
                    {spec[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-white/5 p-5 bg-neutral-950/40 flex justify-end relative z-10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full font-bold text-xs bg-neutral-800 text-[#F2F2F2] border border-white/10 hover:border-white/20 transition-all hover:bg-neutral-700/60 active:scale-[0.98]"
          >
            Close Matrix Details
          </button>
        </div>

      </motion.div>
    </div>
  );
}
