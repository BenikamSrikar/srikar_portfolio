"use client";
import { useEffect, useState } from "react";

export default function PageLoader({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3500); 

    const unmountTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4000); 

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
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,7,18,1)_0%,rgba(0,0,0,1)_80%)] pointer-events-none" />

      {/* Changed to a standard HTML style tag to prevent hydration class-mismatches */}
      <style>{`
        @keyframes logoLoop {
          0%, 25% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          30%, 58% {
            opacity: 0;
            transform: scale(0.8) rotate(-10deg);
          }
          63%, 92% {
            opacity: 0;
            transform: scale(0.8) rotate(10deg);
          }
          97%, 100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes ubuntuLoop {
          0%, 25% {
            opacity: 0;
            transform: scale(0.8) rotate(10deg);
          }
          33%, 58% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          63%, 100% {
            opacity: 0;
            transform: scale(0.8) rotate(-10deg);
          }
        }

        @keyframes appleLoop {
          0%, 58% {
            opacity: 0;
            transform: scale(0.8) rotate(-10deg);
          }
          66%, 91% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          96%, 100% {
            opacity: 0;
            transform: scale(0.8) rotate(10deg);
          }
        }

        .animate-windows { animation: logoLoop 3.5s infinite ease-in-out; }
        .animate-ubuntu { animation: ubuntuLoop 3.5s infinite ease-in-out; }
        .animate-apple { animation: appleLoop 3.5s infinite ease-in-out; }
      `}</style>

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-20 h-20 flex items-center justify-center">
          
          {/* 1. Windows Logo */}
          <svg
            className="absolute w-16 h-16 text-cyan-400 fill-current animate-windows"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h11.5v11.5H0zM12.5 0H24v11.5H12.5zM0 12.5h11.5V24H0zM12.5 12.5H24V24H12.5z" />
          </svg>

          {/* 2. Ubuntu Logo */}
          <svg
            className="absolute w-16 h-16 text-orange-500 fill-current opacity-0 animate-ubuntu"
            viewBox="0 0 24 24"
          >
            <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm0 3.31a1.81 1.81 0 1 1-1.81 1.81A1.81 1.81 0 0 1 12 3.31zM4.75 9.3a1.65 1.65 0 1 1-1.12 2.07 1.65 1.65 0 0 1 1.12-2.07zm1.78 1.48a3.15 3.15 0 0 0 .15 2.45l-1.39.8a4.77 4.77 0 0 1-.22-3.8l1.46.55zm4.81-5.18a4.8 4.8 0 0 1 3.55 1.6l-1.32.92a3.18 3.18 0 0 0-2.35-1.07 3.24 3.24 0 0 0-1 .16l-.55-1.46a4.9 4.9 0 0 1 1.67-.15zm6.54 2.87a1.65 1.65 0 1 1 .53 2.27 1.65 1.65 0 0 1-.53-2.27zm-1.12 1.93a3.18 3.18 0 0 0-2.2 1.1l-1.31-.93a4.83 4.83 0 0 1 3.35-1.67l.16 1.5zm-5.41 1.6a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13zm.88 3.52a3.22 3.22 0 0 0 2.22-1.07l1.31.92a4.85 4.85 0 0 1-3.37 1.65l-.16-1.5zm-3.69-.37a3.16 3.16 0 0 0 2.2.14l.55 1.46a4.8 4.8 0 0 1-3.35-.22l.6-1.38z" />
          </svg>

          {/* 3. Apple Logo */}
          <svg
            className="absolute w-16 h-16 text-white fill-current opacity-0 animate-apple"
            viewBox="0 0 24 24"
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z" />
          </svg>

        </div>

        <h2 className="mt-6 text-sm font-mono tracking-[0.3em] uppercase bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent animate-pulse">
          Initializing Portfolio
        </h2>
      </div>
    </div>
  );
}