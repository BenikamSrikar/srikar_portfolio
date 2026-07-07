"use client";
import { useEffect, useState } from "react";

export default function PageLoader({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => setIsFadingOut(true), 2700);
    const unmountTimer = setTimeout(() => { if (onComplete) onComplete(); }, 3200);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-orange-500/5 transition-all duration-500 ease-in-out ${isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <style>{`
        .hello-path {
          fill: none;
          stroke: #000;
          stroke-width: 12;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: draw-hello 2.2s ease forwards;
        }

        @keyframes draw-hello {
          to { stroke-dashoffset: 0; }
        }

        .loader-subtext {
          opacity: 0;
          animation: fadeIn 1s ease 1.8s forwards;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>

      <div className="flex flex-col items-center justify-center gap-4 px-6">
        <svg viewBox="0 0 720 180" className="w-[360px] max-w-full">
          <path
            className="hello-path"
            d="M70 95c18-35 60-71 107-27 20 19 25 49 14 78-8 18-23 28-45 27-14 0-23-4-32-13-14-14-11-34-2-48 13-18 34-28 56-22 22 7 41 30 42 57 1 20-8 40-25 48-13 6-28 7-42 3-20-6-34-26-34-46"
          />
          <path
            className="hello-path"
            d="M210 96c24-34 52-38 83-21 18 10 27 28 29 48 1 22-7 40-25 48-16 7-33 6-47-3-31-18-34-47-23-72 3-7 8-13 12-18"
          />
          <path
            className="hello-path"
            d="M300 97c24-36 45-43 71-35 14 4 26 12 35 23 16 20 20 57-3 74-13 10-27 12-42 9-14-2-26-11-30-25"
          />
          <path
            className="hello-path"
            d="M388 80c11-19 38-31 63-17 18 10 23 32 17 50-7 22-28 35-50 40-18 4-35 0-47-12"
          />
          <path
            className="hello-path"
            d="M482 78c10-11 29-16 42-7 7 5 9 13 8 20-2 23-22 41-43 46-12 3-24 2-34-4"
          />
        </svg>
        <p className="loader-subtext text-xs uppercase tracking-[0.4em] text-black/80">
          Loading Portfolio
        </p>
      </div>
    </div>
  );
}