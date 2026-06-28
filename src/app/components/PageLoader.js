"use client";
import { useEffect, useState } from "react";

export default function PageLoader({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => setIsFadingOut(true), 3500);
    const unmountTimer = setTimeout(() => { if (onComplete) onComplete(); }, 4000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-all duration-500 ease-in-out ${isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes spin-reverse { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        
        .spinner-outer { animation: spin 2s linear infinite; border-top-color: #000; }
        .spinner-inner { animation: spin-reverse 1.5s linear infinite; border-bottom-color: #666; }
      `}</style>

      <div className="relative flex items-center justify-center">
        {/* Outer Spinner */}
        <div className="absolute w-20 h-20 border-4 border-black/10 rounded-full spinner-outer"></div>
        
        {/* Inner Spinner */}
        <div className="w-12 h-12 border-4 border-black/10 rounded-full spinner-inner"></div>
      </div>

      <h2 className="mt-16 text-sm font-mono tracking-[0.3em] uppercase text-black animate-pulse">
        Initializing Portfolio
      </h2>
    </div>
  );
}