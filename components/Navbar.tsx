"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 h-20 flex items-center transition-all duration-500 ${
        scrolled
          ? "bg-neutral-900/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
        {/* Branding logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          {/* Custom SVG Node Network Icon */}
          <svg
            className="w-7 h-7 text-[#F2F2F2] transition-transform duration-500 group-hover:rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="4" cy="12" r="2" />
            <circle cx="20" cy="12" r="2" />
            <circle cx="12" cy="4" r="2" />
            <circle cx="12" cy="20" r="2" />
            <line x1="6" y1="12" x2="10" y2="12" stroke="currentColor" />
            <line x1="14" y1="12" x2="18" y2="12" stroke="currentColor" />
            <line x1="12" y1="6" x2="12" y2="10" stroke="currentColor" />
            <line x1="12" y1="14" x2="12" y2="18" stroke="currentColor" />
            <line x1="6.4" y1="6.4" x2="10.6" y2="10.6" stroke="currentColor" strokeDasharray="2 2" />
            <line x1="13.4" y1="13.4" x2="17.6" y2="17.6" stroke="currentColor" strokeDasharray="2 2" />
          </svg>
          <span className="text-xl font-extrabold tracking-[0.25em] text-[#8A8A8A] group-hover:text-[#F2F2F2] transition-colors duration-500">
            ALKET
          </span>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => {
              const buySec = document.getElementById("buy-now-section");
              if (buySec) buySec.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative px-6 py-2.5 rounded-full font-bold text-xs bg-neutral-800 text-[#F2F2F2] overflow-hidden group transition-all active:scale-[0.98] border border-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <span className="relative z-10">Get Your AI Solution</span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </header>
  );
}
