"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll } from "framer-motion";
import { Solution } from "@/data/solutions";

interface SolutionScrollProps {
  solution: Solution;
}

export default function SolutionScroll({ solution }: SolutionScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);
  const imageObjects = useRef<HTMLImageElement[]>([]);
  
  const totalFrames = 240;

  // 1. Scroll progress tracker for the solution section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Preload the 240 image frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];
    setImagesLoaded(false);
    setLoadPercent(0);

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      
      // Load frames directly from the public images folder
      img.src = `/images/ezgif-frame-${frameNum}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        setLoadPercent(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          imageObjects.current = loadedImages;
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        setLoadPercent(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          imageObjects.current = loadedImages;
          setImagesLoaded(true);
        }
      };

      loadedImages.push(img);
    }
  }, [solution.id]);

  // 3. Smooth Rendering Loop with LERP interpolation
  useEffect(() => {
    if (!imagesLoaded || imageObjects.current.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let active = true;
    let targetFrame = 0;
    let currentFrame = 0;

    // Handle high-DPI screens and resizing
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.clientHeight * (window.devicePixelRatio || 1);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Sync target frame to scroll progress
    const unsubscribeScroll = scrollYProgress.on("change", (latest) => {
      targetFrame = latest * (totalFrames - 1);
    });

    // Draw frame to canvas with grayscale filter and vignetting
    const drawFrame = (index: number) => {
      const img = imageObjects.current[index];
      if (!img || !img.complete) return;

      // Reset and fill with rich black base
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Preserve aspect ratio (cover)
      const imageRatio = 1280 / 720;
      const canvasRatio = canvas.width / canvas.height;
      let drawWidth, drawHeight, drawX, drawY;

      if (canvasRatio < imageRatio) {
        // Portrait or tall viewports (like mobile): match height and crop sides
        drawHeight = canvas.height;
        drawWidth = canvas.height * imageRatio;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
      } else {
        // Landscape or wide viewports: match width and crop top/bottom
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageRatio;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

      // Vignette effect drawing to mask edges and emphasize center content relative to visible viewport
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const minRadius = Math.min(canvas.width, canvas.height) * 0.15;
      const maxRadius = Math.max(canvas.width, canvas.height) * 0.65;

      const gradient = ctx.createRadialGradient(
        centerX, centerY, minRadius,
        centerX, centerY, maxRadius
      );
      gradient.addColorStop(0, "rgba(10, 10, 10, 0)");
      gradient.addColorStop(0.4, "rgba(10, 10, 10, 0.2)");
      gradient.addColorStop(0.8, "rgba(10, 10, 10, 0.85)");
      gradient.addColorStop(1, "#0A0A0A"); // Fade completely into Alket near-black background

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Render loop
    const loop = () => {
      if (!active) return;

      // Smooth easing factor
      const ease = 0.07;
      currentFrame += (targetFrame - currentFrame) * ease;

      if (Math.abs(currentFrame - targetFrame) < 0.005) {
        currentFrame = targetFrame;
      }

      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(currentFrame))
      );
      
      drawFrame(frameIndex);
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    return () => {
      active = false;
      unsubscribeScroll();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [imagesLoaded, scrollYProgress, solution.id]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] pointer-events-none">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black/10 z-20">
        {!imagesLoaded ? (
          <div className="absolute flex flex-col items-center justify-center gap-3 text-[#F2F2F2] pointer-events-auto">
            <span className="font-mono text-xs tracking-widest text-[#C4C4C4] uppercase">
              Initializing AI Engine Sequence
            </span>
            <div className="relative w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute h-full left-0 top-0 bg-[#C4C4C4] transition-all duration-300"
                style={{ width: `${loadPercent}%` }}
              />
            </div>
            <span className="font-extrabold text-sm">{loadPercent}%</span>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain pointer-events-auto mix-blend-screen transition-all duration-300"
            style={{ 
              filter: "grayscale(1) contrast(1.15) brightness(0.85)" 
            }}
          />
        )}
      </div>
    </div>
  );
}
