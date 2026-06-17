"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const educationData = [
  {
    id: 1,
    title: "B.Tech in Computer Science and Engineering",
    institution: "Sasi Institute of Technology and Engineering",
    period: "Aug 2023 – May 2027",
    description: "Relevant Coursework: Data Structures, Operating Systems, Computer Networks, DBMS, OOP. Active participant in technical symposiums and hackathon environments.",
    score: "CGPA: 8.45 / 10",
    color: "#2563eb",
  },
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
];

// ── SVG sine-wave path dimensions ──────────────────────────────────────────
// The track runs horizontally. Cards sit on peaks and troughs of the wave.
// Total width = number of items * step, height = 2 * amplitude + padding
const STEP      = 380;   // horizontal distance between cards
const AMP       = 80;    // wave amplitude (peak-to-trough / 2)
const CARD_HEIGHT = 240; // approximate card height
const SVG_W     = STEP * (educationData.length + 0.5);
const SVG_H     = AMP * 2 + CARD_HEIGHT + 120; // increased height to accommodate cards fully
const MID_Y     = SVG_H / 2;     // centre of the wave

// Card vertical anchor: alternates above/below the mid line
const cardY = (i) => (i % 2 === 0 ? MID_Y - AMP - 130 : MID_Y + AMP + 20);

// Dot sits exactly on the sine wave
const dotY  = (i) => (i % 2 === 0 ? MID_Y - AMP : MID_Y + AMP);
const dotX  = (i) => STEP * 0.5 + STEP * i;

// Build a smooth SVG sine-wave path across all dots
function buildWavePath() {
  const points = educationData.map((_, i) => ({ x: dotX(i), y: dotY(i) }));
  // extend a bit before first and after last
  const startX = dotX(0) - STEP * 0.5;
  const endX   = dotX(educationData.length - 1) + STEP * 0.5;

  let d = `M ${startX} ${MID_Y}`;
  // curve through each dot with cubic bezier
  points.forEach((p, i) => {
    const prev = i === 0 ? { x: startX, y: MID_Y } : points[i - 1];
    const cpX = (prev.x + p.x) / 2;
    d += ` C ${cpX} ${prev.y} ${cpX} ${p.y} ${p.x} ${p.y}`;
  });
  // continue to end
  const last = points[points.length - 1];
  const cpX  = (last.x + endX) / 2;
  d += ` C ${cpX} ${last.y} ${cpX} ${MID_Y} ${endX} ${MID_Y}`;
  return d;
}

const WAVE_PATH = buildWavePath();

export default function Education() {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);   // the wide horizontal strip
  const pathRef     = useRef(null);   // the SVG path for stroke animation

  // ── Vertical scroll with centered path animation ──────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    const path    = pathRef.current;
    if (!section || !track || !path) return;

    // Animate SVG stroke draw from left to right
    const pathLen = path.getTotalLength();
    gsap.set(path, { strokeDasharray: pathLen, strokeDashoffset: pathLen });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.5}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Draw the sine wave
    tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);

    // Cards and dots — each appears exactly when the wave drawing reaches it
    const cards = track.querySelectorAll(".edu-card");
    const dots  = track.querySelectorAll(".edu-dot");

    educationData.forEach((_, i) => {
      // Wave reaches dot i at roughly this progress point in the timeline
      const waveArrival = (i + 0.55) / (educationData.length + 0.5);

      // Dot pops in right as wave reaches it
      tl.fromTo(dots[i],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.06, ease: "back.out(2.5)" },
        waveArrival
      );

      // Card fades in just after the dot
      tl.fromTo(cards[i],
        { opacity: 0, y: i % 2 === 0 ? 16 : -16 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        waveArrival + 0.04
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

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
        className="text-center pt-16 pb-4 px-6"
      >
        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
          My <span className="text-blue-600">Education</span>
        </h2>
        <p className="text-slate-500 mt-2 text-xs md:text-sm">
          Scroll to journey through my academic path
        </p>
      </motion.div>

      {/* ── Centered path container ── */}
      <div className="flex items-center justify-center w-full" style={{ height: `calc(100vh - 180px)` }}>
        <div
          ref={trackRef}
          className="relative flex-shrink-0"
          style={{
            width: SVG_W,
            height: SVG_H,
            maxHeight: '100%',
          }}
        >
        {/* ── SVG sine-wave ── */}
        <svg
          width={SVG_W}
          height={SVG_H}
          className="absolute inset-0 pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#2563eb" stopOpacity="0.3" />
              <stop offset="50%"  stopColor="#7c3aed" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Background wave (faint, always visible) */}
          <path
            d={WAVE_PATH}
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth="2"
            opacity="0.25"
          />

          {/* Animated draw wave */}
          <path
            ref={pathRef}
            d={WAVE_PATH}
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* ── Education cards ── */}
        {educationData.map((item, i) => (
          <div key={item.id}>
            {/* Dot on wave */}
            <div
              className="edu-dot absolute z-20"
              style={{
                left: dotX(i) - 10,
                top:  dotY(i) - 10,
                opacity: 0,
              }}
            >
              <div
                className="w-5 h-5 rounded-full border-4 border-white shadow-md"
                style={{ background: item.color, boxShadow: `0 0 12px ${item.color}88` }}
              />
            </div>

            {/* Connector line from dot to card */}
            <svg
              className="absolute pointer-events-none"
              style={{ left: dotX(i) - 1, top: Math.min(dotY(i), cardY(i) + 90), overflow: "visible" }}
              width="2"
              height={Math.abs(dotY(i) - (cardY(i) + 90))}
            >
              <line
                x1="1" y1="0"
                x2="1" y2={Math.abs(dotY(i) - (cardY(i) + 90))}
                stroke={item.color}
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.5"
              />
            </svg>

            {/* Card */}
            <div
              className="edu-card absolute z-10"
              style={{
                left:  dotX(i) - 160,
                top:   cardY(i),
                width: 320,
                opacity: 0,
              }}
            >
              <div
                className="bg-white rounded-2xl p-5 shadow-sm border"
                style={{ borderColor: `${item.color}30` }}
              >
                {/* Period badge */}
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 border"
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
        ))}
        </div>
      </div>
    </div>
  );
}
