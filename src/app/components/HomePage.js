'use client';
import { useRef, useEffect } from "react";
import ModelView from "./ModelView";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HomePage() {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const videoRef = useRef(null);
  const morphTextRef = useRef(null);

  const roles = [
    "Software Engineer.",
    "Backend Developer.",
    "System Designer.",
    "Real-time Systems.",
  ];

  useGSAP(() => {
    // 1. Slow down the actual video playback speed (0.75x speed)
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; 
    }

    const tl = gsap.timeline({ 
      defaults: { ease: "power3.inOut", duration: 1.2 } 
    });

    // Text animations start immediately on load
    tl.to(leftPanelRef.current, {
      width: "50%",
      duration: 1.5,
      ease: "expo.inOut"
    }, 0)
    .from(".animate-top", {
      y: -30,
      opacity: 0,
      stagger: 0.1,
    }, 0.2)
    .from(".animate-fade", {
      opacity: 0,
    }, 0.4)
    .from(".animate-left", {
      x: -50,
      opacity: 0,
    }, 0.5)
    .from(".animate-bottom", {
      y: 30,
      opacity: 0,
      ease: "back.out(1.7)",
    }, 0.7)
    // Video/model animations run in parallel
    .add(() => {
      videoRef.current?.play();
    }, 0.5) 
    .fromTo(videoRef.current, 
      { opacity: 0 },
      { opacity: 0.9, duration: 2 },
      0.5
    );

  }, { scope: containerRef });

  // Morph cut text animation - smooth and seamless character morphing
  useEffect(() => {
    let currentRoleIndex = 0;
    let morphing = false;
    let animationFrameId = null;

    const morphText = () => {
      if (morphing || !morphTextRef.current) return;
      
      morphing = true;
      const currentText = roles[currentRoleIndex];
      const nextRoleIndex = (currentRoleIndex + 1) % roles.length;
      const nextText = roles[nextRoleIndex];
      
      const maxLength = Math.max(currentText.length, nextText.length);
      const startTime = Date.now();
      const morphDuration = 2000; // 2 seconds for ultra-smooth morphing
      
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
          
          // Calculate smooth per-character progress with gentle wave stagger
          const staggerDelay = i * 0.025; // Reduced stagger for smoother wave
          const charProgress = Math.max(0, Math.min(1, (progress * 1.3) - staggerDelay));
          
          // Smooth easing function for character transition
          const eased = charProgress < 0.5
            ? 2 * charProgress * charProgress
            : 1 - Math.pow(-2 * charProgress + 2, 2) / 2;
          
          if (currentChar === nextChar) {
            morphedText += currentChar;
          } else if (eased < 0.2) {
            // Show current character
            morphedText += currentChar;
          } else if (eased < 0.5) {
            // Early morphing - blend between current and random
            if (Math.random() > 0.7) {
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-';
              morphedText += chars[Math.floor(Math.random() * chars.length)];
            } else {
              morphedText += currentChar;
            }
          } else if (eased < 0.8) {
            // Mid morphing - more random characters
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-';
            morphedText += chars[Math.floor(Math.random() * chars.length)];
          } else if (eased < 0.95) {
            // Late morphing - blend between random and next
            if (Math.random() > 0.6) {
              morphedText += nextChar;
            } else {
              const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-';
              morphedText += chars[Math.floor(Math.random() * chars.length)];
            }
          } else {
            // Final - show next character
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

    // Start morphing after initial delay
    const initialDelay = setTimeout(() => {
      morphText();
      const interval = setInterval(morphText, 4500); // 4.5 seconds between transitions
      return () => clearInterval(interval);
    }, 2500);

    return () => {
      clearTimeout(initialDelay);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [roles]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen pt-16 bg-[#f8faff] overflow-hidden"
    >

      <div className="relative z-10 hidden lg:flex h-[85vh] w-full items-center">
        <div 
          ref={leftPanelRef}
          className="w-1/2 flex flex-col justify-center px-0 lg:px-16 space-y-6 mt-10 border-r border-slate-200 overflow-hidden whitespace-nowrap"
        >
          <h2 className="animate-top welcome-glow text-lg md:text-2xl font-medium text-slate-500">
            Welcome to my portfolio
          </h2>
          
          <h1 className="animate-top text-5xl md:text-7xl font-extrabold text-blue-600">
            Hi, I'm a
          </h1>

          <div className="animate-fade">
            <span 
              ref={morphTextRef}
              className="text-2xl md:text-3xl font-bold text-amber-500 inline-block font-mono tracking-wider"
            >
              Software Engineer.
            </span>
          </div>

          <p className="animate-left text-slate-600 max-w-md md:max-w-lg text-sm md:text-base whitespace-normal leading-relaxed">
            I specialize in designing scalable backend architectures, REST APIs, and real-time applications. 
            My focus involves event-driven systems, WebRTC communication, and AI-integrated solutions.
          </p>
          
          <div className="animate-bottom pt-4">
            <a href="#about">
              <button className="bg-white text-blue-700 font-semibold py-3 px-10 rounded-full border-2 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.15)] hover:bg-blue-600 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 active:scale-95">
                Explore →
              </button>
            </a>
          </div>
        </div>

        <div className="flex-1 h-full flex items-center justify-center relative">
          <div className="w-full h-full">
             <ModelView />
          </div>
        </div>
      </div>
    </section>
  );
}