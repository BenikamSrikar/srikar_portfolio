"use client";
import { useEffect, useState } from "react";

export default function PageLoader({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000); // Loader displays for 2 seconds

    const unmountTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500); 

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-all duration-500 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none translate-y-[-20px]" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,7,18,1)_0%,rgba(0,0,0,1)_80%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-fuchsia-500 border-b-indigo-500 border-l-transparent animate-spin" />
        </div>
        <h2 className="mt-6 text-sm font-mono tracking-[0.3em] uppercase bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent animate-pulse">
          Initializing Portfolio
        </h2>
      </div>
    </div>
  );
}