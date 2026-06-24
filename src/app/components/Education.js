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

// ── Horizontal pulse path dimensions ──────────────────────────────────────────
const CARD_WIDTH = 300;
const CARD_HEIGHT = 260;
const HORIZONTAL_SPACING = 420; // distance between cards horizontally
const CURVE_HEIGHT = 120; // how high/low the curve goes
const WAVE_CENTER_Y = 220; // center vertical position
const TOTAL_WIDTH = educationData.length * HORIZONTAL_SPACING + 300;

// Calculate checkpoint positions
const checkpoints = [
  { x: 150, label: "SSC", direction: "up" },      // First checkpoint - rises UP
  { x: 150 + HORIZONTAL_SPACING, label: "Intermediate", direction: "down" }, // Goes DOWN
  { x: 150 + HORIZONTAL_SPACING * 2, label: "B.Tech", direction: "up" }, // Rises UP
];

export default function Education() {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const wavePathRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Horizontal sine wave stroke animation on scroll ──────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const path = wavePathRef.current;
    if (!section || !path) return;

    // Get path length for stroke animation
    const pathLength = path.getTotalLength();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: () => `+=${window.innerHeight * 2}`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate stroke-dashoffset to fill the wave
    tl.fromTo(
      path,
      { strokeDasharray: pathLength, strokeDashoffset: pathLength },
      { strokeDashoffset: 0, ease: "none" },
      0
    );

    // Animate checkpoints
    const checkpoints = trackRef.current?.querySelectorAll(".edu-checkpoint");
    const cards = trackRef.current?.querySelectorAll(".edu-card");

    educationData.forEach((_, i) => {
      if (checkpoints?.[i]) {
        tl.fromTo(
          checkpoints[i],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2.5)" },
          i * 0.12
        );
      }
      if (cards?.[i]) {
        tl.fromTo(
          cards[i],
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
          i * 0.12
        );
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [isMobile]);

  if (isMobile) {
    return (
      <div id="education" className="bg-[#f8faff] font-sans py-16 px-4 min-h-screen relative overflow-hidden">
        {/* Section heading */}
        <div className="text-center pb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
            My <span className="text-blue-600">Education</span>
          </h2>
          <p className="text-slate-500 mt-2 text-xs sm:text-sm">
            Scroll to journey through my academic path
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-xl mx-auto pl-8">
          {/* Vertical line */}
          <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-200"></div>

          <div className="space-y-10">
            {educationData.map((item) => (
              <div key={item.id} className="relative">
                {/* Timeline dot */}
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

  return (
    <div
      id="education"
      ref={sectionRef}
      className="bg-[#f8faff] font-sans relative w-full"
      style={{ minHeight: "100vh", paddingTop: "60px", paddingBottom: "60px" }}
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4 sm:px-6 mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
          My <span className="text-blue-600">Education</span>
        </h2>
        <p className="text-slate-500 mt-2 text-xs sm:text-sm md:text-base">
          Scroll to journey through my academic path
        </p>
      </motion.div>

      {/* ── Horizontal pulse path container ── */}
      <div className="w-full overflow-x-auto pb-8">
        <div
          ref={trackRef}
          className="relative mx-auto"
          style={{
            width: `${TOTAL_WIDTH}px`,
            height: "500px",
            minWidth: "fit-content",
          }}
        >
          {/* Path SVG with stroke animation */}
          <svg
            className="absolute left-0 top-0 w-full h-full"
            viewBox={`0 0 ${TOTAL_WIDTH} 500`}
            preserveAspectRatio="none"
            style={{ pointerEvents: 'none', zIndex: 1 }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            {/* Path: straight -> up -> down -> up -> straight */}
            <path
              ref={wavePathRef}
              d={`
                M 0 ${WAVE_CENTER_Y}
                L ${checkpoints[0].x} ${WAVE_CENTER_Y}
                Q ${checkpoints[0].x + HORIZONTAL_SPACING / 3} ${WAVE_CENTER_Y - CURVE_HEIGHT}, ${checkpoints[0].x + HORIZONTAL_SPACING / 2} ${WAVE_CENTER_Y - CURVE_HEIGHT}
                L ${checkpoints[1].x} ${WAVE_CENTER_Y - CURVE_HEIGHT}
                Q ${checkpoints[1].x + HORIZONTAL_SPACING / 3} ${WAVE_CENTER_Y}, ${checkpoints[1].x + HORIZONTAL_SPACING / 2} ${WAVE_CENTER_Y + CURVE_HEIGHT}
                L ${checkpoints[2].x} ${WAVE_CENTER_Y + CURVE_HEIGHT}
                Q ${checkpoints[2].x + HORIZONTAL_SPACING / 3} ${WAVE_CENTER_Y}, ${checkpoints[2].x + HORIZONTAL_SPACING / 2} ${WAVE_CENTER_Y}
                L ${TOTAL_WIDTH} ${WAVE_CENTER_Y}
              `}
              stroke="url(#pathGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* ── Education Cards and Checkpoints ── */}
          {educationData.map((item, i) => {
            const checkpoint = checkpoints[i];
            const cardY = checkpoint.direction === "up" 
              ? WAVE_CENTER_Y - CURVE_HEIGHT - 60
              : WAVE_CENTER_Y + CURVE_HEIGHT + 60;

            return (
              <div key={item.id} style={{ position: "relative", height: "100%" }}>
                {/* Checkpoint on path */}
                <div
                  className="edu-checkpoint absolute"
                  style={{
                    left: `${checkpoint.x}px`,
                    top: checkpoint.direction === "up" 
                      ? `${WAVE_CENTER_Y - CURVE_HEIGHT - 12}px`
                      : `${WAVE_CENTER_Y + CURVE_HEIGHT - 12}px`,
                    width: "24px",
                    height: "24px",
                    zIndex: 20,
                    opacity: 0,
                    transform: "translate(-50%, 0)",
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full border-4 border-white shadow-lg"
                    style={{
                      background: item.color,
                      boxShadow: `0 0 0 3px ${item.color}40, 0 4px 12px ${item.color}60`,
                    }}
                  />
                </div>

                {/* Connector line from checkpoint to card */}
                <div
                  style={{
                    position: "absolute",
                    left: `${checkpoint.x - 1}px`,
                    top: checkpoint.direction === "up"
                      ? `${WAVE_CENTER_Y - CURVE_HEIGHT}px`
                      : `${WAVE_CENTER_Y + CURVE_HEIGHT + 6}px`,
                    width: "2px",
                    height: "50px",
                    background: `linear-gradient(to ${checkpoint.direction === "up" ? "top" : "bottom"}, ${item.color}, ${item.color}40)`,
                    opacity: 0.6,
                    zIndex: 5,
                  }}
                />

                {/* Card */}
                <div
                  className="edu-card absolute"
                  style={{
                    left: `${checkpoint.x - CARD_WIDTH / 2}px`,
                    top: `${cardY}px`,
                    width: `${CARD_WIDTH}px`,
                    zIndex: 10,
                    opacity: 0,
                  }}
                >
                  <div
                    className="bg-white rounded-2xl p-5 shadow-lg border-2 hover:shadow-xl transition-shadow duration-300"
                    style={{ borderColor: `${item.color}30` }}
                  >
                    {/* Period badge */}
                    <span
                      className="inline-block text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 border"
                      style={{
                        color: item.color,
                        background: `${item.color}12`,
                        borderColor: `${item.color}30`,
                      }}
                    >
                      {item.period}
                    </span>

                    <h3 className="text-sm font-black text-slate-900 mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <h4 className="text-slate-500 text-xs font-medium mb-2">
                      {item.institution}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div
                      className="text-xs font-bold italic border-t pt-2"
                      style={{ color: item.color, borderColor: `${item.color}20` }}
                    >
                      {item.score}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
