"use client";

import React from "react";

const tickerPhrases = [
  "ALKET SYSTEMS",
  "DETERMINISTIC PIPELINES",
  "GENERATIVE INTEGRATION",
  "NEURAL STRATEGY",
  "REQUIREMENT-LED DEPLOYMENT",
  "PREDICTIVE FORECASTING",
  "LOW-LATENCY INFERENCE"
];

export default function RunningTicker() {
  return (
    <div className="relative z-30 w-full bg-[#0A0A0A] border-t border-b border-white/5 py-6 md:py-8 overflow-hidden">
      
      {/* Edge fading vignettes and infinite translation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marqueeLoop {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .ticker-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
        }
        .ticker-track {
          display: flex;
          white-space: nowrap;
          animation: marqueeLoop 25s linear infinite;
          gap: 3rem;
          padding-right: 3rem;
        }
        @media (min-width: 768px) {
          .ticker-track {
            gap: 5rem;
            padding-right: 5rem;
            animation: marqueeLoop 35s linear infinite;
          }
        }
        /* Gradient edge fades */
        .ticker-fade-overlay::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 15%;
          height: 100%;
          background: linear-gradient(to right, #0A0A0A, transparent);
          z-index: 10;
          pointer-events: none;
        }
        .ticker-fade-overlay::after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          width: 15%;
          height: 100%;
          background: linear-gradient(to left, #0A0A0A, transparent);
          z-index: 10;
          pointer-events: none;
        }
      `}} />

      <div className="ticker-container ticker-fade-overlay">
        {/* Track 1 + Track 2 for seamless loop */}
        <div className="ticker-track">
          {tickerPhrases.map((phrase, idx) => (
            <span
              key={`track1-${idx}`}
              className={`text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-[0.18em] font-sans ${
                idx % 2 === 0
                  ? "text-[#F2F2F2]"
                  : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)]"
              }`}
            >
              {phrase}
            </span>
          ))}
        </div>

        <div className="ticker-track" aria-hidden="true">
          {tickerPhrases.map((phrase, idx) => (
            <span
              key={`track2-${idx}`}
              className={`text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-[0.18em] font-sans ${
                idx % 2 === 0
                  ? "text-[#F2F2F2]"
                  : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)]"
              }`}
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
