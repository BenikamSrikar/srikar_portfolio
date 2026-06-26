"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const educationData = [
  {
    id: 2,
    title: "SSC (Class 10)",
    institution: "Queens International School, Hyderabad",
    period: "Graduated 2022",
    description: "Comprehensive schooling with a focus on science and mathematics. Participated in science fairs and academic competitions.",
    score: "CGPA: 9.9",
    color: "#0891b2",
  },
  {
    id: 3,
    title: "Intermediate (MPC)",
    institution: "Narayana Junior College, Hyderabad",
    period: "2022 – 2024",
    description: "Specialized in Mathematics, Physics, and Chemistry. Developed strong analytical and problem-solving skills that form the foundation of my engineering approach.",
    score: "Percentage: 84.5%",
    color: "#7c3aed",
  },
  {
    id: 1,
    title: "B.Tech in Computer Science and Engineering",
    institution: "Sasi Institute of Technology and Engineering",
    period: "Aug 2023 – May 2027",
    description: "Relevant Coursework: Data Structures, Operating Systems, Computer Networks, DBMS, OOP. Active participant in technical symposiums and hackathon environments.",
    score: "CGPA: 8.45 / 10",
    color: "#2563eb",
  },
];

// ── Desktop Oscilloscope Layout Constants ──────────────────────────────────────────
const BASE_Y = 300;       
const PULSE_HEIGHT = 160; 
const HIGH_Y = BASE_Y - PULSE_HEIGHT; 
const LOW_Y = BASE_Y + PULSE_HEIGHT;  

const SEGMENT = 220;      
const CARD_WIDTH = 320;

const checkpoints = [
  { x: SEGMENT * 1.5, y: HIGH_Y, type: "up" },   
  { x: SEGMENT * 3.5, y: LOW_Y,  type: "down" }, 
  { x: SEGMENT * 5.5, y: HIGH_Y, type: "up" }    
];

const SVG_W = SEGMENT * 7;
const SVG_H = 600;

const pulsePathD = `
  M 0,${BASE_Y} 
  L ${SEGMENT},${BASE_Y} 
  L ${SEGMENT},${HIGH_Y} 
  L ${SEGMENT * 2},${HIGH_Y} 
  L ${SEGMENT * 2},${BASE_Y}
  L ${SEGMENT * 3},${BASE_Y} 
  L ${SEGMENT * 3},${LOW_Y} 
  L ${SEGMENT * 4},${LOW_Y} 
  L ${SEGMENT * 4},${BASE_Y}
  L ${SEGMENT * 5},${BASE_Y} 
  L ${SEGMENT * 5},${HIGH_Y} 
  L ${SEGMENT * 6},${HIGH_Y} 
  L ${SEGMENT * 6},${BASE_Y}
  L ${SVG_W},${BASE_Y}
`;

export default function Education() {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Desktop Horizontal Oscilloscope Scroll Animation ──────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const path = pathRef.current;
    const track = trackRef.current;
    if (!section || !path || !track) return;

    // Create a GSAP Context scoped to our main component reference element
    // This prevents elements from being processed outside the React cycle and stops 'removeChild' crashes
    const ctx = gsap.context(() => {
      const pathLength = path.getTotalLength();
      gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 2}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 1
      }, 0);

      const cards = track.querySelectorAll(".edu-card");
      const cpDots = track.querySelectorAll(".edu-checkpoint");
      const timelineTriggers = [0.22, 0.52, 0.82];

      educationData.forEach((_, i) => {
        const triggerTime = timelineTriggers[i];

        tl.fromTo(cpDots[i],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.15, ease: "back.out(2)" },
          triggerTime
        );

        const isUpward = checkpoints[i].type === "up";
        tl.fromTo(cards[i],
          { opacity: 0, y: isUpward ? -25 : 25 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          triggerTime + 0.05
        );
      });
    }, sectionRef); // Scope targets internally inside our container node reference

    // Clean up all memory addresses, events, and pinned elements inside this scope context seamlessly
    return () => ctx.revert();
  }, [isMobile]);

  // ── 1. Mobile & Tablet Screen ─────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div id="education" className="bg-[#f8faff] font-sans py-16 px-4 min-h-screen relative overflow-hidden">
        <div className="text-center pb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
            My <span className="text-blue-600">Education</span>
          </h2>
          <p className="text-slate-500 mt-2 text-xs sm:text-sm">
            Scroll to journey through my academic path
          </p>
        </div>

        <div className="relative max-w-xl mx-auto pl-8">
          <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-200"></div>
          <div className="space-y-10">
            {educationData.map((item) => (
              <div key={item.id} className="relative">
                <div 
                  className="absolute -left-7 top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm"
                  style={{ background: item.color, boxShadow: `0 0 10px ${item.color}66` }}
                />
                <div 
                  className="bg-white rounded-2xl p-5 shadow-sm border"
                  style={{ borderColor: `${item.color}25` }}
                >
                  <span
                    className="inline-block text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 border"
                    style={{
                      color: item.color,
                      background: `${item.color}10`,
                      borderColor: `${item.color}25`,
                    }}
                  >
                    {item.period}
                  </span>
                  <h3 className="text-sm font-black text-slate-900 mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <h4 className="text-slate-500 text-xs font-semibold mb-3">
                    {item.institution}
                  </h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div
                    className="text-xs font-bold italic border-t pt-2.5"
                    style={{ color: item.color, borderColor: `${item.color}15` }}
                  >
                    {item.score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── 2. Desktop Screen (Oscilloscope / Pulse Theme) ────────────────────────────────
  return (
    <div
      id="education"
      ref={sectionRef}
      className="bg-[#0b0f19] font-sans overflow-hidden relative flex flex-col justify-between"
      style={{ 
        height: "100vh",
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    >
      <div className="w-full text-center pt-12 z-30 pointer-events-none">
        <h2 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase text-white">
          CHRONOLOGY // <span className="text-yellow-400">EDUCATION</span>
        </h2>
        <p className="text-slate-400 mt-2 text-xs uppercase tracking-widest font-mono">
          [ Sweep Trigger Mode: Scroll to Transmit Signals ]
        </p>
      </div>

      <div className="flex-1 w-full flex items-center justify-center relative px-12">
        <div
          ref={trackRef}
          className="relative flex-shrink-0"
          style={{
            width: SVG_W,
            height: SVG_H,
          }}
        >
          <svg
            className="absolute inset-0 pointer-events-none overflow-visible"
            width={SVG_W}
            height={SVG_H}
          >
            <path
              d={pulsePathD}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="miter"
            />
            <path
              ref={pathRef}
              d={pulsePathD}
              fill="none"
              stroke="#facc15"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="miter"
              style={{ filter: "drop-shadow(0px 0px 8px rgba(250, 204, 21, 0.6))" }}
            />
          </svg>

          {educationData.map((item, i) => {
            const cp = checkpoints[i];
            const isUpward = cp.type === "up";
            const calculatedCardY = isUpward ? cp.y + 50 : cp.y - 270; 

            return (
              <div key={item.id}>
                <div
                  className="edu-checkpoint absolute z-20"
                  style={{
                    left: cp.x - 10,
                    top: cp.y - 10,
                    opacity: 0,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full border-4 bg-black border-yellow-400"
                    style={{ filter: "drop-shadow(0px 0px 6px #facc15)" }}
                  />
                </div>

                <div
                  className="absolute"
                  style={{
                    left: cp.x - 1,
                    top: isUpward ? cp.y + 10 : calculatedCardY + 250,
                    width: '2px',
                    height: '40px',
                    background: 'linear-gradient(to bottom, rgba(250,204,21,0.5), transparent)',
                    opacity: 0.6,
                  }}
                />

                <div
                  className="edu-card absolute z-10"
                  style={{
                    left: cp.x - CARD_WIDTH / 2,
                    top: calculatedCardY,
                    width: CARD_WIDTH,
                    opacity: 0,
                  }}
                >
                  <div
                    className="bg-[#121824]/95 backdrop-blur-md rounded-xl p-5 border shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-yellow-400/50 transition-colors duration-300"
                    style={{ borderColor: 'rgba(255,255,255,0.12)' }}
                  >
                    <span
                      className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border mb-3"
                      style={{
                        color: '#facc15',
                        background: 'rgba(250,204,21,0.06)',
                        borderColor: 'rgba(250,204,21,0.25)',
                      }}
                    >
                      {item.period}
                    </span>

                    <h3 className="text-sm font-black text-white mb-1 tracking-tight">
                      {item.title}
                    </h3>
                    <h4 className="text-slate-400 text-xs font-medium mb-3 font-mono">
                      {item.institution}
                    </h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="text-xs font-mono font-bold border-t border-slate-800 pt-2.5 text-yellow-400">
                      {item.score}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full px-12 pb-6 flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest z-10">
        <div>CH_1: ACTIVE // FREQ: 60HZ</div>
        <div>OSCILLOSCOPE VIEWPORT GRID</div>
      </div>
    </div>
  );
}