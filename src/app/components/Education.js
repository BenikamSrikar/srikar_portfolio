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

// ── Timeline dimensions ──────────────────────────────────────────
const STEP = 400; // horizontal distance between checkpoints
const TIMELINE_Y = 100; // vertical position of the horizontal line
const CARD_WIDTH = 320;
const CARD_TOP_MARGIN = 60; // space between checkpoint and card top

const SVG_W = STEP * (educationData.length + 1);
const SVG_H = 600; // enough height for cards hanging below

const checkpointX = (i) => STEP * (i + 0.8);
const cardX = (i) => checkpointX(i) - CARD_WIDTH / 2;
const cardY = TIMELINE_Y + CARD_TOP_MARGIN;

export default function Education() {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);   // the wide horizontal strip
  const pathRef     = useRef(null);   // the SVG path for stroke animation

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Horizontal timeline scroll animation ──────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const track   = trackRef.current;
    const line    = trackRef.current?.querySelector('.timeline-line');
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

    // Animate timeline line from left to right
    tl.fromTo(line,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", duration: 0.6, transformOrigin: "left center" },
      0
    );

    // Show all checkpoints and cards
    const cards = track.querySelectorAll(".edu-card");
    const checkpoints = track.querySelectorAll(".edu-checkpoint");

    educationData.forEach((_, i) => {
      // Checkpoints appear
      tl.fromTo(checkpoints[i],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2.5)" },
        0.2 + (i * 0.15)
      );

      // Cards drop down from checkpoints
      tl.fromTo(cards[i],
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0.3 + (i * 0.15)
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

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

      {/* ── Centered timeline container ── */}
      <div className="flex items-start justify-center w-full px-8 pt-8" style={{ height: `calc(100vh - 140px)` }}>
        <div
          ref={trackRef}
          className="relative flex-shrink-0"
          style={{
            width: SVG_W,
            height: SVG_H,
          }}
        >
          {/* ── Horizontal Timeline Line ── */}
          <div
            className="timeline-line absolute bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400"
            style={{
              left: 0,
              top: TIMELINE_Y,
              width: '100%',
              height: '4px',
              transformOrigin: 'left center',
            }}
          />

          {/* ── Checkpoints and Cards ── */}
          {educationData.map((item, i) => (
            <div key={item.id}>
              {/* Checkpoint Circle */}
              <div
                className="edu-checkpoint absolute z-20"
                style={{
                  left: checkpointX(i) - 12,
                  top: TIMELINE_Y - 12,
                  opacity: 0,
                }}
              >
                <div
                  className="w-6 h-6 rounded-full border-4 border-white shadow-lg"
                  style={{ 
                    background: item.color, 
                    boxShadow: `0 0 0 3px ${item.color}40, 0 4px 12px ${item.color}60` 
                  }}
                />
              </div>

              {/* Vertical Connector Line */}
              <div
                className="absolute"
                style={{
                  left: checkpointX(i) - 1,
                  top: TIMELINE_Y + 6,
                  width: '2px',
                  height: CARD_TOP_MARGIN - 6,
                  background: `linear-gradient(to bottom, ${item.color}, ${item.color}40)`,
                  opacity: 0.4,
                }}
              />

              {/* Card */}
              <div
                className="edu-card absolute z-10"
                style={{
                  left: cardX(i),
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
          ))}
        </div>
      </div>
    </div>
  );
}
