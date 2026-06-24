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

// ── Horizontal sine wave dimensions ──────────────────────────────────────────
const STEP = 450; // horizontal distance between checkpoints
const WAVE_AMPLITUDE = 120; // vertical amplitude of sine wave
const WAVE_CENTER_Y = 280; // vertical center of the sine wave
const CARD_WIDTH = 320;
const CARD_HEIGHT = 300;

const SVG_W = STEP * (educationData.length + 1);
const SVG_H = 600;

// Calculate sine wave position for each checkpoint
const calculateWavePosition = (index) => {
  const x = STEP * (index + 0.8);
  const y = WAVE_CENTER_Y + Math.sin(index * (Math.PI / (educationData.length - 1))) * WAVE_AMPLITUDE;
  return { x, y };
};

const checkpointX = (i) => STEP * (i + 0.8);
const cardX = (i) => checkpointX(i) - CARD_WIDTH / 2;
const cardY = WAVE_CENTER_Y + WAVE_AMPLITUDE + 80; // cards positioned below the wave

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

  // ── Horizontal sine wave scroll animation ──────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    const line = trackRef.current?.querySelector('.wave-line');
    const path = pathRef.current;
    if (!section || !track || !line) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * 1.5}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate wave line path
    if (path) {
      const pathLength = path.getTotalLength();
      tl.fromTo(
        path,
        { strokeDasharray: pathLength, strokeDashoffset: pathLength },
        { strokeDashoffset: 0, ease: "none", duration: 0.6 },
        0
      );
    }

    // Show all checkpoints and cards
    const cards = track.querySelectorAll(".edu-card");
    const checkpoints = track.querySelectorAll(".edu-checkpoint");

    educationData.forEach((_, i) => {
      // Checkpoints appear
      tl.fromTo(
        checkpoints[i],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2.5)" },
        0.2 + i * 0.15
      );

      // Cards drop down from checkpoints
      tl.fromTo(
        cards[i],
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0.3 + i * 0.15
      );
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
      className="bg-[#f8faff] font-sans overflow-visible relative"
      style={{ minHeight: "100vh" }}
    >
      {/* Section heading — stays at top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-center pt-16 pb-4 px-4 sm:px-6"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
          My <span className="text-blue-600">Education</span>
        </h2>
        <p className="text-slate-500 mt-2 text-xs sm:text-sm md:text-base">
          Scroll to journey through my academic path
        </p>
      </motion.div>

      {/* ── Centered horizontal sine wave container ── */}
      <div className="flex items-center justify-center w-full px-8 pt-8" style={{ height: `calc(100vh - 140px)` }}>
        <div
          ref={trackRef}
          className="relative flex-shrink-0"
          style={{
            width: SVG_W,
            height: SVG_H,
          }}
        >
          {/* ── Sine Wave Line (SVG) ── */}
          <svg
            className="wave-line absolute w-full h-full"
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            preserveAspectRatio="none"
            style={{ left: 0, top: 0 }}
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {/* Generate sine wave path */}
            <path
              ref={pathRef}
              d={`M 0 ${WAVE_CENTER_Y} ${educationData
                .map((_, i) => {
                  const { x, y } = calculateWavePosition(i);
                  return `L ${x} ${y}`;
                })
                .join(' ')}`}
              stroke="url(#waveGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1"
            />
          </svg>

          {/* ── Checkpoints and Cards ── */}
          {educationData.map((item, i) => {
            const { x, y } = calculateWavePosition(i);
            return (
              <div key={item.id}>
                {/* Checkpoint Circle */}
                <div
                  className="edu-checkpoint absolute z-20"
                  style={{
                    left: x - 12,
                    top: y - 12,
                    opacity: 0,
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

                {/* Vertical Connector Line from checkpoint to card */}
                <div
                  className="absolute"
                  style={{
                    left: x - 1,
                    top: y + 6,
                    width: '2px',
                    height: 70,
                    background: `linear-gradient(to bottom, ${item.color}, ${item.color}40)`,
                    opacity: 0.4,
                  }}
                />

                {/* Card */}
                <div
                  className="edu-card absolute z-10"
                  style={{
                    left: x - CARD_WIDTH / 2,
                    top: cardY,
                    width: CARD_WIDTH,
                    opacity: 0,
                  }}
                >
                  <div
                    className="bg-white rounded-2xl p-5 shadow-lg border-2 hover:shadow-xl transition-shadow duration-300"
                    style={{ borderColor: `${item.color}30` }}
                  >
                    {/* Period badge */}
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border"
                      style={{
                        color: item.color,
                        background: `${item.color}12`,
                        borderColor: `${item.color}30`,
                      }}
                    >
                      {item.period}
                    </span>

                    <h3 className="text-base font-black text-slate-900 mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <h4 className="text-slate-500 text-xs font-medium mb-3">
                      {item.institution}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div
                      className="text-xs font-bold italic border-t pt-2.5"
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
