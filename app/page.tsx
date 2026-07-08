"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { solutions } from "@/data/solutions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Founders from "@/components/Founders";
import RunningTicker from "@/components/RunningTicker";
import SolutionScroll from "@/components/SolutionScroll";
import SolutionTextOverlays from "@/components/SolutionTextOverlays";
import WorkCarousel from "@/components/WorkCarousel";
import { ChevronLeft, ChevronRight, Terminal, Clock, Shield, Sparkles } from "lucide-react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeSolution = solutions[currentIndex];

  // 1. Reset scroll position on active solution change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentIndex]);

  // 2. Transition background gradient based on active solution
  useEffect(() => {
    document.documentElement.style.setProperty("--bg-gradient", activeSolution.gradient);
  }, [currentIndex, activeSolution.gradient]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? solutions.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === solutions.length - 1 ? 0 : prev + 1));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Consultation request received for ${activeSolution.name}. Our AI architects will contact you within 2 hours.`);
  };

  return (
    <div className="relative min-h-screen text-[#F2F2F2] select-none bg-[#0A0A0A]">
      <Navbar />

      {/* Main Solution Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSolution.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* A. SCROLLYTELLING VIEWPORTS */}
          <div className="relative w-full">
            <SolutionScroll solution={activeSolution} />
            <SolutionTextOverlays solution={activeSolution} />
          </div>

          {/* B. SOLUTIONS DETAIL LAYER */}
          <section className="relative z-30 px-6 py-24 md:py-32 bg-black/80 border-t border-white/5 backdrop-blur-md">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
              
              {/* Product stats and details */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C4C4C4] rounded-full animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#8A8A8A] font-bold">
                    SYSTEM PARAMETERS
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-[#F2F2F2]">
                  {activeSolution.detailsSection.title}
                </h2>
                
                {/* Stats Cards grid with responsive font scaling */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {activeSolution.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="border border-white/10 rounded-2xl p-3 sm:p-4 bg-neutral-900/40 flex flex-col justify-between h-24 sm:h-28 hover:border-white/20 transition-all duration-300"
                    >
                      <span className="text-[8px] sm:text-[10px] text-[#8A8A8A] uppercase tracking-wider font-semibold leading-tight">{stat.label}</span>
                      <span className="text-lg sm:text-2xl font-extrabold text-[#C4C4C4]">{stat.val}</span>
                    </div>
                  ))}
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 text-sm text-neutral-300 border-t border-white/5 pt-6">
                  {activeSolution.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Terminal className="w-4 h-4 text-[#8A8A8A] shrink-0" />
                      <span className="font-light text-sm tracking-wide">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Editorial / Explanatory text */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="space-y-6 md:pt-14"
              >
                <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light">
                  {activeSolution.detailsSection.description}
                </p>
                <div className="border-l-2 border-[#C4C4C4] pl-4 py-2 bg-neutral-950/20 rounded-r-lg">
                  <p className="text-xs font-mono text-[#C4C4C4] uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Requirement-Led Deployment
                  </p>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed font-light">
                    Every engine is customized from your source schema and interface parameters. We do not use off-the-shelf wrappers or generic templates.
                  </p>
                </div>
              </motion.div>

            </div>
          </section>

          {/* C. DRIFT PREVENTION & TRANSPARENCY SECTION */}
          <section className="relative z-30 px-6 py-28 bg-[#0A0A0A]/95 border-t border-white/5">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 border border-white/10 px-4 py-1.5 rounded-full bg-white/5 text-[10px] text-[#C4C4C4] font-bold uppercase tracking-widest"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Deterministic Testing Suite Enabled</span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold tracking-tight text-[#F2F2F2]"
              >
                {activeSolution.freshnessSection.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light"
              >
                {activeSolution.freshnessSection.description}
              </motion.p>
            </div>
          </section>

          {/* C2. 3D SINE WAVE PORTFOLIO SHOWCASE CAROUSEL */}
          <WorkCarousel />

          {/* D. CONSULTATION & QUOTE SECTION */}
          <section
            id="buy-now-section"
            className="relative z-30 px-6 py-24 md:py-32 bg-[#0F0F0F] border-t border-white/5"
          >
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              
              {/* Product Pricing info */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <span className="text-xs font-mono uppercase tracking-widest text-[#8A8A8A] font-bold">
                  // INVESTMENT STRUCTURE
                </span>
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-[#F2F2F2]">
                  {activeSolution.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-[#F2F2F2]">
                    {activeSolution.buyNowSection.price}
                  </span>
                  <span className="text-neutral-500 text-xs font-light">{activeSolution.buyNowSection.unit}</span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed max-w-md font-light">
                  Tailored integration mapping. All solution agreements include continuous deployment loops, model drift testing, and dedicated architect hours.
                </p>

                {/* Parameters pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeSolution.buyNowSection.processingParams.map((param, i) => (
                    <span
                      key={i}
                      className="bg-neutral-900 border border-white/5 rounded-full px-3.5 py-1 text-xs font-medium text-[#C4C4C4]"
                    >
                      {param}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Consultation / Consultation Form Container */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-neutral-900/60 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-sm"
              >
                <h4 className="font-bold text-lg tracking-tight text-[#F2F2F2]">Request Architecture Blueprint</h4>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#8A8A8A] mb-1 font-mono font-bold">Your Name</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-[#F2F2F2] focus:outline-none focus:border-[#C4C4C4] transition-all font-light"
                      placeholder="e.g. Alexis Carter"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#8A8A8A] mb-1 font-mono font-bold">Email Address</label>
                    <input
                      type="email"
                      className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-[#F2F2F2] focus:outline-none focus:border-[#C4C4C4] transition-all font-light"
                      placeholder="alexis@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#8A8A8A] mb-1 font-mono font-bold">Requirement Description</label>
                    <textarea
                      rows={3}
                      className="w-full bg-neutral-950 border border-white/10 rounded-lg px-3.5 py-2 text-sm text-[#F2F2F2] focus:outline-none focus:border-[#C4C4C4] transition-all font-light resize-none"
                      placeholder="What is your current pipeline pain point?"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold bg-[#F2F2F2] text-black hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Request AI Audit</span>
                  </button>
                </form>

                {/* Shipping & Support info */}
                <div className="space-y-3 text-xs text-neutral-400 border-t border-white/5 pt-4">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#8A8A8A] shrink-0 mt-0.5" />
                    <span className="font-light text-[11px] leading-relaxed">{activeSolution.buyNowSection.deliveryPromise}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-[#8A8A8A] shrink-0 mt-0.5" />
                    <span className="font-light text-[11px] leading-relaxed">{activeSolution.buyNowSection.returnPolicy}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* E. NEXT BLEND SLANTED CTA */}
          <section className="relative z-10 border-t border-white/5 overflow-hidden">
            <button
              onClick={handleNext}
              className="w-full py-24 px-6 bg-gradient-to-r from-neutral-950 to-neutral-900 hover:from-neutral-900 hover:to-neutral-800 transition-all flex flex-col items-center justify-center gap-3 relative group"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#8A8A8A] group-hover:text-white transition-colors uppercase font-bold">
                EXPLORE THE NEXT FRAMEWORK
              </span>
              <span className="text-3xl md:text-5xl font-extrabold flex items-center gap-3 tracking-tight group-hover:scale-102 transition-all duration-500 text-[#F2F2F2]">
                <span>Discover {solutions[(currentIndex + 1) % solutions.length].name}</span>
                <ChevronRight className="w-7 h-7 text-[#C4C4C4] group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </section>
        </motion.div>
      </AnimatePresence>

      {/* F. STATIC INTERFACE CONTROLS */}
      {/* 1. Left/Right Navigation arrows */}
      <button
        onClick={handlePrev}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-neutral-800 hover:border-white/30 transition-all active:scale-90 group"
      >
        <ChevronLeft className="w-5 h-5 text-[#8A8A8A] group-hover:text-[#F2F2F2] group-hover:-translate-x-0.5 transition-all" />
      </button>

      <button
        onClick={handleNext}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-neutral-800 hover:border-white/30 transition-all active:scale-90 group"
      >
        <ChevronRight className="w-5 h-5 text-[#8A8A8A] group-hover:text-[#F2F2F2] group-hover:translate-x-0.5 transition-all" />
      </button>

      {/* 2. Bottom Capsule indicator menu */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-neutral-900/70 border border-white/10 rounded-full px-5 py-2.5 flex gap-4 backdrop-blur-xl shadow-2xl">
        {solutions.map((sol, idx) => (
          <button
            key={sol.id}
            onClick={() => setCurrentIndex(idx)}
            className={`text-[10px] font-bold uppercase tracking-wider transition-all relative py-1 px-3 rounded-full ${
              idx === currentIndex ? "text-black" : "text-[#8A8A8A] hover:text-white"
            }`}
          >
            {idx === currentIndex && (
              <motion.div
                layoutId="active-capsule"
                className="absolute inset-0 bg-[#F2F2F2] rounded-full z-[-1]"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            {sol.name}
          </button>
        ))}
      </div>

      <RunningTicker />
      <Founders />
      <Footer />
    </div>
  );
}
