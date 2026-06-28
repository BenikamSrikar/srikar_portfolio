"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef(null);
  const profileRef = useRef(null);
  const cardsRef = useRef(null);

  // Structural DOM References for Slot Machine Digit Displays
  const cgpaRef = useRef(null);
  const majorRef = useRef(null);
  const hackRef = useRef(null);
  const certRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Left Column Entrance Vector
        gsap.from(profileRef.current, { 
          x: -100, 
          opacity: 0, 
          duration: 1.2, 
          ease: "power4.out", 
          scrollTrigger: { trigger: profileRef.current, start: "top 90%" } 
        });
        
        // Right Headings Entrance Vector
        gsap.from(".about-title", { 
          y: 40, 
          opacity: 0, 
          duration: 1, 
          ease: "power3.out", 
          scrollTrigger: { trigger: ".about-title", start: "top 90%" } 
        });
        
        // Text Framework Paragraph Fades
        gsap.from(".about-para", { 
          opacity: 0, 
          y: 25, 
          duration: 1, 
          ease: "power2.out", 
          stagger: 0.15, 
          scrollTrigger: { trigger: ".about-para-1", start: "top 85%" } 
        });

        // Cards Matrix Subtle Shift & Apply Hardware Flickering Style Class dynamically
        const cards = gsap.utils.toArray(".stat-card");
        gsap.fromTo(cards, 
          { y: 30, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.08, 
            ease: "power3.out", 
            scrollTrigger: { trigger: cardsRef.current, start: "top 95%" },
            onComplete: () => {
              // Append flickering engine once cards arrive
              cards.forEach(card => card.classList.add("animate-flicker-load"));
            }
          }
        );

        // --- THE BRIEFCASE LOCKER CRYPTO COUNTER LOGIC ---
        const runLockerAnimation = (ref, targetString) => {
          const element = ref.current;
          if (!element) return;

          const targetChars = targetString.split("");
          const cyclesPerPosition = 18; 
          const frameRate = 40; 
          let currentCycle = 0;

          const interval = setInterval(() => {
            const currentOutput = targetChars.map((char, index) => {
              if (isNaN(parseInt(char))) return char;
              
              if (currentCycle < cyclesPerPosition + index * 4) {
                return Math.floor(Math.random() * 10).toString();
              }
              return char;
            });

            element.innerText = currentOutput.join("");
            currentCycle++;

            if (currentCycle >= cyclesPerPosition + targetChars.length * 4) {
              clearInterval(interval);
              element.innerText = targetString; 
            }
          }, frameRate);
        };

        // ScrollTrigger Orchestration mapping execution for Slot Counters
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 95%",
          onEnter: () => {
            // Initiate the rolling effect slightly delayed to sync up with the visual loading flicker
            setTimeout(() => {
              runLockerAnimation(cgpaRef, "8.45");
              runLockerAnimation(majorRef, "2");
              runLockerAnimation(hackRef, "2");
              runLockerAnimation(certRef, "4");
            }, 300);
          }
        });

      }, sectionRef);
    }, 100);
    
    return () => { 
      clearTimeout(timeoutId); 
      ScrollTrigger.getAll().forEach(t => t.kill()); 
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col items-center justify-center py-24 px-6 md:px-16 lg:px-24 font-sans antialiased overflow-hidden">
      
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
        
        {/* EDITORIAL SECTION ANCHOR */}
        <div className="w-full mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-black">
            About <span className="text-blue-600">Me.</span>
          </h2>
        </div>

        {/* ASYMMETRICAL COLUMN CONTROL PLATFORM */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start w-full">
          
          {/* COLUMN 1: LEFT ANCHOR (AVATAR + STATS BOXES DIRECTLY BELOW IT) */}
          <div ref={profileRef} className="md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-stretch gap-6 sticky top-10">
            {/* PROFILE AVATAR BLOCK PANEL */}
            <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-full md:h-auto md:aspect-square bg-white rounded-3xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-200/60 overflow-hidden group mx-auto">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100 relative">
                <img 
                  src="/images/profile.png" 
                  alt="Benikam Srikar" 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000";
                  }}
                />
              </div>
            </div>

            {/* BOXES REPOSITIONED DIRECTLY BELOW THE AVATAR IMAGE WITH FONT AND TIMING ENHANCEMENTS */}
            <div ref={cardsRef} className="grid grid-cols-2 gap-3 w-full max-w-sm md:max-w-none mx-auto pt-2">
              {[ 
                { ref: cgpaRef, label: "Current B.Tech CGPA", val: "0.00" }, 
                { ref: majorRef, label: "Core Projects Shipped", val: "0" }, 
                { ref: hackRef, label: "Hackathons Logged", val: "0", suffix: "+" }, 
                { ref: certRef, label: "Certifications", val: "0" } 
              ].map((stat, i) => (
                <div key={i} className="stat-card flex flex-col items-start bg-white border border-slate-200/60 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-colors hover:border-slate-300">
                  <span className="text-[9px] text-[#86868b] font-semibold uppercase tracking-wider mb-1.5">{stat.label}</span>
                  <div className="text-2xl md:text-3xl font-black font-mono tracking-tighter text-black flex items-center">
                    <span ref={stat.ref}>{stat.val}</span>
                    {stat.suffix && <span className="text-blue-600 ml-0.5 font-sans font-bold text-xl">{stat.suffix}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: THE NARRATIVE CONTENT CONTAINER */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col space-y-12">
            
            <div className="space-y-6 text-left">
              <h3 className="about-title text-3xl sm:text-4xl md:text-5xl font-semibold text-black tracking-tight leading-tight">
                Benikam Srikar
              </h3>

              <div className="h-[2px] w-12 bg-blue-600 rounded-full mb-8" />

              <p className="about-para about-para-1 text-[#424245] text-lg sm:text-xl font-normal leading-relaxed tracking-tight">
                I am a <span className="text-black font-semibold">Full-Stack Software Engineer</span> specialized in building <span className="text-blue-600 font-semibold italic">resilient real-time architectures</span>, peer-to-peer systems, and data pipelines. Driven by a meticulous approach to software design, I focus on bridging the gap between low-level system efficiency and premium user interaction.
              </p>

              <p className="about-para about-para-2 text-[#424245] text-base md:text-lg font-normal leading-relaxed border-l-3 border-blue-600 pl-6 py-1 bg-white/40 rounded-r-xl pr-4 shadow-sm border border-l-0 border-slate-200/40">
                From engineering a zero-storage P2P data engine through <span className="text-black font-semibold italic">six technical iterations</span> to co-authoring high-accuracy ML studies with international research teams reaching <span className="text-blue-600 font-bold tracking-tight bg-blue-50 px-1.5 py-0.5 rounded">99.47% accuracy</span>, I build custom web infrastructure with high operational reliability and an uncompromising quality standard.
              </p>

              <div className="about-para about-para-3 text-[#86868b] text-sm sm:text-base leading-relaxed pt-2">
                <span className="text-black font-semibold block mb-2 text-xs uppercase tracking-wider text-slate-400">Research Focus Areas:</span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    "Distributed Systems", "Computer Graphics", "Computer Vision", 
                    "Machine Learning", "Visual Computing", "Real-Time Systems", 
                    "Human-Computer Interaction", "AI-assisted Content Creation"
                  ].map((interest) => (
                    <span key={interest} className="bg-white border border-slate-200 text-[#1d1d1f] text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}