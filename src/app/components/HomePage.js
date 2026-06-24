'use client';
import { useRef, useEffect, useMemo } from "react";
import ModelView from "./ModelView";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TypeAnimation } from 'react-type-animation';

export default function HomePage() {
  const containerRef = useRef(null);
  const morphTextRef = useRef(null);
  const gridRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  const roles = useMemo(() => [
    "Software Engineer.",
    "Backend Developer.",
    "System Designer.",
    "Real-time Systems.",
  ], []);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut", duration: 1.2 }
    });

    tl.from(".hp-animate-top", {
      y: -30,
      opacity: 0,
      stagger: 0.12,
    }, 0.2)
    .from(".hp-animate-fade", {
      opacity: 0,
      duration: 1,
    }, 0.45)
    .from(".hp-animate-left", {
      x: -40,
      opacity: 0,
    }, 0.55)
    .from(".hp-animate-bottom", {
      y: 30,
      opacity: 0,
      ease: "back.out(1.7)",
    }, 0.75)
    .from(".hp-model-fade", {
      opacity: 0,
      y: 20,
      duration: 1.4,
    }, 0.35);

  }, { scope: containerRef });

  // Raindrops animation with blue text
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = grid.offsetWidth;
    canvas.height = grid.offsetHeight;
    canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;
    
    grid.appendChild(canvas);

    // Create fewer raindrops - less dense
    const dropCount = Math.floor(canvas.width / 100);
    const drops = Array(dropCount).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 1 + Math.random() * 1.5, // Slow speed
      opacity: Math.random() * 0.5 + 0.3
    }));

    const binary = '01';
    let animationId;

    const draw = () => {
      // Clear canvas with white background
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blue color for binary text
      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 10px monospace'; // Small font size
      ctx.shadowColor = 'rgba(59, 130, 246, 0.3)';
      ctx.shadowBlur = 4;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        // Random binary digit
        const text = binary[Math.floor(Math.random() * binary.length)];
        
        // Set opacity for fade effect
        ctx.globalAlpha = drop.opacity;
        ctx.fillText(text, drop.x, drop.y);
        ctx.globalAlpha = 1;

        // Move drop down slowly
        drop.y += drop.speed;

        // Reset drop position when it goes off screen
        if (drop.y > canvas.height) {
          drop.y = -20;
          drop.x = Math.random() * canvas.width;
          drop.opacity = Math.random() * 0.5 + 0.3;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    // Handle resize
    const handleResize = () => {
      canvas.width = grid.offsetWidth;
      canvas.height = grid.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  // Morph cut text animation – desktop only
  useEffect(() => {
    let currentRoleIndex = 0;
    let morphing = false;
    let animationFrameId = null;
    let intervalId = null;

    const morphText = () => {
      if (morphing || !morphTextRef.current) return;

      morphing = true;
      const currentText = roles[currentRoleIndex];
      const nextRoleIndex = (currentRoleIndex + 1) % roles.length;
      const nextText = roles[nextRoleIndex];

      const maxLength = Math.max(currentText.length, nextText.length);
      const startTime = Date.now();
      const morphDuration = 2000;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / morphDuration, 1);

        if (progress >= 1) {
          morphTextRef.current.textContent = nextText;
          currentRoleIndex = nextRoleIndex;
          morphing = false;
          return;
        }

        let morphedText = '';
        for (let i = 0; i < maxLength; i++) {
          const currentChar = currentText[i] || ' ';
          const nextChar = nextText[i] || ' ';
          const staggerDelay = i * 0.025;
          const charProgress = Math.max(0, Math.min(1, (progress * 1.3) - staggerDelay));
          const eased = charProgress < 0.5
            ? 2 * charProgress * charProgress
            : 1 - Math.pow(-2 * charProgress + 2, 2) / 2;

          if (currentChar === nextChar) {
            morphedText += currentChar;
          } else if (eased < 0.2) {
            morphedText += currentChar;
          } else if (eased < 0.5) {
            if (Math.random() > 0.7) {
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-';
              morphedText += chars[Math.floor(Math.random() * chars.length)];
            } else {
              morphedText += currentChar;
            }
          } else if (eased < 0.8) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-';
            morphedText += chars[Math.floor(Math.random() * chars.length)];
          } else if (eased < 0.95) {
            if (Math.random() > 0.6) {
              morphedText += nextChar;
            } else {
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-';
              morphedText += chars[Math.floor(Math.random() * chars.length)];
            }
          } else {
            morphedText += nextChar;
          }
        }

        if (morphTextRef.current) {
          morphTextRef.current.textContent = morphedText;
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    const initialDelay = setTimeout(() => {
      morphText();
      intervalId = setInterval(morphText, 4500);
    }, 2500);

    return () => {
      clearTimeout(initialDelay);
      if (intervalId) clearInterval(intervalId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [roles]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-screen h-screen bg-white overflow-hidden"
    >
      {/* Binary Rainfall Background */}
      <div 
        ref={gridRef}
        className="absolute inset-0 w-full h-full overflow-hidden z-0"
      />

      <style>{`
        @keyframes tileFade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Full screen 2-column layout */}
      <div className="relative flex w-screen h-screen z-10">
        {/* Text content on left - 50% width */}
        <div className="w-1/2 flex flex-col items-start justify-center px-16">
          <h2 className="hp-animate-top welcome-glow text-xl font-medium text-slate-600 mb-6">
            Welcome to my portfolio
          </h2>

          <h1 className="hp-animate-top text-6xl font-extrabold text-blue-600 leading-tight mb-6">
            Hi, I&apos;m a
          </h1>

          <div className="hp-animate-fade mb-6">
            <span
              ref={morphTextRef}
              className="text-3xl font-bold text-blue-500 inline-block font-mono tracking-wider"
            >
              Software Engineer.
            </span>
          </div>

          <p className="hp-animate-left text-slate-700 text-base leading-relaxed max-w-md mb-8">
            I specialize in designing scalable backend architectures, REST APIs, and real-time applications.
            My focus involves event-driven systems, WebRTC communication, and AI-integrated solutions.
          </p>

          <div className="hp-animate-bottom flex gap-4">
            <a href="#about">
              <button className="bg-white text-blue-700 font-semibold py-3 px-12 rounded-full border-2 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.15)] hover:bg-blue-600 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 active:scale-95">
                Explore &rarr;
              </button>
            </a>
            <a href="/resume.pdf" download="Benikam_Srikar_Resume.pdf">
              <button className="bg-orange-500 text-white font-semibold py-3 px-12 rounded-full border-2 border-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:bg-orange-600 hover:border-orange-700 transition-all duration-300 hover:scale-105 active:scale-95">
                Download Resume
              </button>
            </a>
          </div>
        </div>

        {/* Model on right - 50% width */}
        <div className="w-1/2 flex items-center justify-center px-16">
          <div className="hp-model-fade w-full h-full flex items-center justify-center">
            <ModelView />
          </div>
        </div>
      </div>
    </section>
  );
}