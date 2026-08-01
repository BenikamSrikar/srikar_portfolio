"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const profileRef = useRef(null);
  const cardsRef = useRef(null);
  const aboutTextRef = useRef(null);
  const meTextRef = useRef(null);
  const rightContentRef = useRef(null);

  // Structural DOM References for Slot Machine Digit Displays
  const cgpaRef = useRef(null);
  const majorRef = useRef(null);
  const hackRef = useRef(null);
  const certRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    try {
      // Set initial states - with safety checks
      if (aboutTextRef.current) gsap.set(aboutTextRef.current, { opacity: 0, y: 15 });
      if (meTextRef.current) gsap.set(meTextRef.current, { opacity: 0, y: 15 });
      if (profileRef.current) gsap.set(profileRef.current, { opacity: 0, scale: 0.95 });
      if (rightContentRef.current) gsap.set(rightContentRef.current, { opacity: 0, y: 20 });
      
      const cardWrappers = section.querySelectorAll(".stat-card-wrapper");
      if (cardWrappers.length > 0) {
        gsap.set(cardWrappers, { scale: 0.9, opacity: 0 });
      }

      // Simple fade-in animations with IntersectionObserver
      const handleIntersection = (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = "true";
            
            // Animate title
            if (aboutTextRef.current) {
              gsap.to(aboutTextRef.current, { opacity: 1, y: 0, duration: 0.4, delay: 0 });
            }
            if (meTextRef.current) {
              gsap.to(meTextRef.current, { opacity: 1, y: 0, duration: 0.4, delay: 0.1 });
            }
            
            // Animate profile
            if (profileRef.current) {
              gsap.to(profileRef.current, { opacity: 1, scale: 1, duration: 0.5, delay: 0.2 });
            }
            
            // Animate right content
            if (rightContentRef.current) {
              gsap.to(rightContentRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.3 });
            }
            
            // Animate cards
            const cards = entry.target.querySelectorAll(".stat-card-wrapper");
            if (cards.length > 0) {
              gsap.to(cards, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                delay: 0.5,
                stagger: 0.08,
                ease: "back.out(1.4)"
              });
            }
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      });

      observer.observe(section);

      return () => {
        observer.disconnect();
      };
    } catch (error) {
      console.error('About animation error:', error);
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col items-center justify-center py-24 px-6 md:px-16 lg:px-24 font-sans antialiased overflow-hidden" style={{ position: 'relative' }}>
      
      {/* Orange overlay that animates */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'transparent' }} ref={(el) => { if (el && sectionRef.current) sectionRef.current.overlayRef = el; }}></div>
      
      {/* INLINE CORE KEYFRAME STYLES FOR FLICKER EFFECT */}
      <style>{`
        @keyframes keynoteFlicker {
          0% { opacity: 0.1; filter: blur(1px); }
          15% { opacity: 0.8; }
          30% { opacity: 0.2; }
          45% { opacity: 1; filter: blur(0px); }
          60% { opacity: 0.4; }
          75% { opacity: 0.9; }
          100% { opacity: 1; }
        }
        .animate-flicker-load {
          animation: keynoteFlicker 0.45s ease-in-out forwards;
        }
      `}</style>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        
        {/* EDITORIAL SECTION ANCHOR WITH SPLIT ANIMATION */}
        <div className="w-full mb-16 md:mb-24 text-center overflow-hidden">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            <TextReveal text="About Me." className="justify-center" />
          </h2>
        </div>

        {/* NEW LAYOUT: Equal width - Photo left with margin, Content right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full">
          
          {/* LEFT COLUMN: Profile Icon with left margin */}
          <div className="flex flex-col overflow-hidden pl-0 lg:pl-12">
            <div 
              ref={profileRef} 
              className="w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-white rounded-3xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-200/60 overflow-hidden group flex items-center justify-center"
            >
              {/* User SVG Icon */}
              <svg 
                className="w-3/4 h-3/4 text-orange-500 transition-transform duration-700 ease-out group-hover:scale-105"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTENT + CARDS */}
          <div ref={rightContentRef} className="flex flex-col space-y-8">
            
            {/* Name and Intro */}
            <div className="space-y-6 text-left">
              <h3 className="about-title text-3xl sm:text-4xl md:text-5xl font-semibold text-black tracking-tight leading-tight">
                Benikam Srikar
              </h3>

              <div className="h-[2px] w-12 bg-orange-600 rounded-full" />

              {/* New passionate student text */}
              <p className="about-para about-para-1 text-[#424245] text-base md:text-lg font-normal leading-relaxed tracking-tight">
                I'm a passionate student and aspiring software developer with a keen interest in generative AI and problem solving. Skilled in full-stack development and always eager to learn, I enjoy tackling complex challenges and transforming ideas into impactful applications. My journey in technology is driven by curiosity, continuous learning, and the desire to create solutions that positively influence people's lives.
              </p>
            </div>

            {/* Stats Cards */}
            <div ref={cardsRef} className="grid grid-cols-2 gap-3">
              {[ 
                { ref: cgpaRef, label: "Current B.Tech CGPA", val: "8.45" }, 
                { ref: majorRef, label: "Indie Projects", val: "1" }, 
                { ref: null, label: "Featured Projects", val: "3" }, 
                { ref: hackRef, label: "Hackathons", val: "5" }, 
                { ref: certRef, label: "Certifications", val: "4" } 
              ].map((stat, i) => {
                const isCert = stat.label === "Certifications";
                return (
                  <div key={i} className={`stat-card-wrapper overflow-hidden rounded-2xl bg-orange-600 ${isCert ? "md:col-span-2" : ""}`}>
                    <div className={`stat-card flex flex-col ${isCert ? "items-center justify-center text-center py-10" : "items-start p-4"} bg-white border border-slate-200/60 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-colors hover:border-slate-300`}>
                      <span className={`text-[9px] text-[#86868b] font-semibold uppercase tracking-wider mb-1.5 ${isCert ? "w-full" : ""}`}>{stat.label}</span>
                      <div className="stat-number text-2xl md:text-3xl font-black font-mono tracking-tighter flex items-center justify-center">
                        <span ref={stat.ref}>{stat.val}</span>
                        {stat.suffix && <span className="text-blue-600 ml-0.5 font-sans font-bold text-xl">{stat.suffix}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}