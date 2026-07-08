"use client";

import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-white/5 py-20 px-6 relative z-10 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-[#F2F2F2]"
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
            </svg>
            <span className="font-extrabold text-lg tracking-[0.2em] text-[#F2F2F2]">
              ALKET
            </span>
          </div>
          <p className="text-xs text-[#8A8A8A] max-w-xs leading-relaxed font-light">
            Engineered intelligence, tailored precisely around your workflow. We design, optimize, and deploy custom-trained AI solutions for modern enterprises.
          </p>
        </div>

        {/* Solutions Links */}
        <div className="space-y-4">
          <h4 className="font-bold text-xs tracking-wider uppercase text-neutral-300">Solutions</h4>
          <ul className="space-y-2 text-xs text-[#8A8A8A]">
            <li><a href="#buy-now-section" className="hover:text-white transition-colors">AI Automation</a></li>
            <li><a href="#buy-now-section" className="hover:text-white transition-colors">Generative AI Suite</a></li>
            <li><a href="#buy-now-section" className="hover:text-white transition-colors">Data Intelligence</a></li>
            <li><a href="#buy-now-section" className="hover:text-white transition-colors">Bespoke Engagements</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h4 className="font-bold text-xs tracking-wider uppercase text-neutral-300">Support</h4>
          <ul className="space-y-2 text-xs text-[#8A8A8A]">
            <li><a href="#" className="hover:text-white transition-colors">Architecture Audits</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Service Level Agreements</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Engineering</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-4">
          <h4 className="font-bold text-xs tracking-wider uppercase text-neutral-300">Stay ahead of AI</h4>
          <p className="text-xs text-[#8A8A8A] font-light">Get quarterly insights on model drift, fine-tuning audits, and agentic workflows.</p>
          {subscribed ? (
            <p className="text-xs text-[#C4C4C4] font-medium animate-pulse">Email successfully registered.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-[#C4C4C4] text-white placeholder-neutral-500"
                required
              />
              <button
                type="submit"
                className="bg-neutral-800 hover:bg-neutral-700 text-[#F2F2F2] border border-white/10 text-xs font-bold px-4 py-2 rounded-lg transition-all active:scale-95 hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 font-light">
        <p>&copy; {new Date().getFullYear()} Alket Inc. All rights reserved.</p>
        <p className="mt-4 md:mt-0 uppercase tracking-widest text-[10px]">INTELLIGENCE, ENGINEERED.</p>
      </div>
    </footer>
  );
}
