"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, FileCode2, Landmark, LineChart } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experienceData = [
  {
    id: 1,
    role: "Data Analytics Intern",
    company: "Deloitte Australia (Forage)",
    period: "May 2026",
    type: "Work Experience",
    icon: <Briefcase size={20} />,
    color: "#2563eb",
    details: [
      "Completed Deloitte's Data Analytics Virtual Experience Program involving practical data analysis and forensic technology tasks.",
      "Analyzed datasets to identify trends, anomalies, and actionable business insights using data-driven methodologies.",
      "Applied forensic technology concepts to investigate data irregularities and support analytical decision-making.",
      "Interpreted findings and communicated recommendations through structured business reporting.",
      "Strengthened analytical thinking, data interpretation, and consulting-oriented problem-solving skills."
    ]
  },
  {
    id: 2,
    role: "Lead Researcher & Developer",
    company: "VEDA (Visual Enhancement and Denoising Assistant)",
    period: "In Progress",
    type: "Research & System Design",
    icon: <FileCode2 size={20} />,
    color: "#7c3aed",
    details: [
      "AI-assisted post-processing framework for Blender Cycles renders using computer vision and deep learning.",
      "Architected a decoupled dual-component system consisting of a Blender addon and an independent core service.",
      "Designed automated render-event ingestion with file-system monitoring and asynchronous processing.",
      "Integrated NAFNet for denoising and Real-ESRGAN for super-resolution and cinematic aspect-ratio adaptation."
    ]
  },
  {
    id: 3,
    role: "Solo Creator & Architect",
    company: "SWIFT (Secure Wideband Instant File Transfer)",
    period: "2024 – 2026",
    type: "Systems Development",
    icon: <Landmark size={20} />,
    color: "#0891b2",
    details: [
      "Architected a zero-storage live file transfer platform using WebRTC P2P and Socket.IO signaling, reducing server dependency by 90%.",
      "Redesigned signaling across versions, improving reliability by 40% and connection setup time by 30%.",
      "Implemented OAuth 2.0 and file validation layers restricting video transfers to 50MB and .mp4 format."
    ]
  },
  {
    id: 4,
    role: "System Designer",
    company: "Library Space Utilization Analytics System",
    period: "2024",
    type: "Team Project",
    icon: <LineChart size={20} />,
    color: "#eab308",
    details: [
      "Engineered real-time AI-powered digital twin dashboards processing continuous sensor data streams for occupancy tracking.",
      "Designed heatmap-based visualization system to analyze usage patterns and spatial distribution.",
      "Developed intelligent room recommendation system and responsive UI with dynamic updates and alerts."
    ]
  }
];

const allData = [
  {
    id: 1,
    type: "education",
    title: "SSC (Class 10)",
    institution: "Queens International School, Hyderabad",
    period: "Graduated 2022",
    description: "Comprehensive schooling with a focus on science and mathematics. Participated in science fairs and academic competitions.",
    score: "CGPA: 9.9",
    color: "#0891b2",
  },
  {
    id: 2,
    type: "education",
    title: "Intermediate (MPC)",
    institution: "Narayana Junior College, Hyderabad",
    period: "2022 – 2024",
    description: "Specialized in Mathematics, Physics, and Chemistry. Developed strong analytical and problem-solving skills that form the foundation of my engineering approach.",
    score: "Percentage: 84.5%",
    color: "#7c3aed",
  },
  {
    id: 3,
    type: "education",
    title: "B.Tech in Computer Science and Engineering",
    institution: "Sasi Institute of Technology and Engineering",
    period: "Aug 2023 – May 2027",
    description: "Relevant Coursework: Data Structures, Operating Systems, Computer Networks, DBMS, OOP. Active participant in technical symposiums and hackathon environments.",
    score: "CGPA: 8.45 / 10",
    color: "#2563eb",
  }
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
  { x: SEGMENT * 5.5, y: HIGH_Y, type: "up" },
  // Professional Experience checkpoints after B.Tech
  { x: SEGMENT * 7.5, y: LOW_Y, type: "down" },
  { x: SEGMENT * 9.5, y: HIGH_Y, type: "up" },
  { x: SEGMENT * 11.5, y: LOW_Y, type: "down" },
  { x: SEGMENT * 13.5, y: HIGH_Y, type: "up" }
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

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const path = pathRef.current;
    const track = trackRef.current;
    if (!section || !path || !track) return;

    const ctx = gsap.context(() => {
      const pathLength = path.getTotalLength();
      gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 3}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);

      const cards = track.querySelectorAll(".edu-card");
      const expCards = track.querySelectorAll(".exp-card");
      const cpDots = track.querySelectorAll(".edu-checkpoint");
      const expDots = track.querySelectorAll(".exp-checkpoint");
      const timelineTriggers = [0.15, 0.30, 0.45, 0.60, 0.75, 0.85, 0.95];

      allData.filter(item => item.type === 'education').forEach((_, i) => {
        const triggerTime = timelineTriggers[i];
        tl.fromTo(cpDots[i], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.15, ease: "back.out(2)" }, triggerTime);
        const isUpward = checkpoints[i].type === "up";
        tl.fromTo(cards[i], { opacity: 0, y: isUpward ? -25 : 25 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, triggerTime + 0.05);
      });

      allData.filter(item => item.type === 'experience').forEach((_, i) => {
        const triggerTime = timelineTriggers[i + 3];
        tl.fromTo(expDots[i], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.15, ease: "back.out(2)" }, triggerTime);
        const isUpward = checkpoints[i + 3].type === "up";
        tl.fromTo(expCards[i], { opacity: 0, y: isUpward ? -25 : 25 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, triggerTime + 0.05);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <div id="education" className="bg-[#f8faff] font-sans py-16 px-4 min-h-screen relative overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-black">
            <span className="text-blue-600">EDUCATION</span>
          </h2>
        </div>
        <div className="space-y-6">
          {allData.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-5 border shadow-sm">
              {item.type === "education" ? (
                <>
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border mb-3" style={{ color: item.color, background: `${item.color}10`, borderColor: `${item.color}25` }}>{item.period}</span>
                  <h3 className="text-sm font-black text-black mb-1 tracking-tight">{item.title}</h3>
                  <h4 className="text-gray-600 text-xs font-medium mb-3 font-mono">{item.institution}</h4>
                  <p className="text-gray-600 text-[11px] leading-relaxed mb-3">{item.description}</p>
                  <div className="text-xs font-mono font-bold border-t border-gray-200 pt-2.5" style={{ color: item.color }}>{item.score}</div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
                      {item.icon}
                    </div>
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border" style={{ color: item.color, background: `${item.color}10`, borderColor: `${item.color}25` }}>{item.expType}</span>
                  </div>
                  <h3 className="text-sm font-black text-black mb-1 tracking-tight">{item.role}</h3>
                  <h4 className="text-gray-600 text-xs font-medium mb-3 font-mono">{item.company} • {item.period}</h4>
                  <ul className="text-left space-y-2 text-xs text-gray-600 border-t border-gray-200 pt-3 list-none pl-0">
                    {item.details?.map((detail, idx) => (
                      <li key={idx} className="relative pl-4">
                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      id="education"
      ref={sectionRef}
      className="bg-white font-sans overflow-hidden relative flex flex-col justify-between"
      style={{ height: "100vh" }}
    >
      <div 
        className="absolute bottom-0 left-0 w-full h-48 pointer-events-none z-40"
        style={{ background: "linear-gradient(to bottom, transparent, white)" }}
      />

      <div className="w-full text-center pt-12 z-30 pointer-events-none">
        <h2 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase text-black">
          <span className="text-blue-600">EDUCATION</span> & <span className="text-purple-600">EXPERIENCE</span>
        </h2>
        <p className="text-gray-500 mt-2 text-xs uppercase tracking-widest font-mono">
          [ Sweep Trigger Mode: Scroll to Transmit Signals ]
        </p>
      </div>

      <div className="flex-1 w-full flex items-center justify-center relative px-12">
        <div ref={trackRef} className="relative flex-shrink-0" style={{ width: SVG_W, height: SVG_H }}>
          <svg className="absolute inset-0 pointer-events-none overflow-visible" width={SVG_W} height={SVG_H}>
            <path d={pulsePathD} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="miter" />
            <path ref={pathRef} d={pulsePathD} fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="miter" style={{ filter: "drop-shadow(0px 0px 8px rgba(37, 99, 235, 0.6))" }} />
          </svg>

          {allData.filter(item => item.type === 'education').map((item, i) => {
            const cp = checkpoints[i];
            const isUpward = cp.type === "up";
            const calculatedCardY = isUpward ? cp.y + 50 : cp.y - 270; 

            return (
              <div key={item.id}>
                <div className="edu-checkpoint absolute z-20" style={{ left: cp.x - 10, top: cp.y - 10, opacity: 0 }}>
                  <div className="w-5 h-5 rounded-full border-4 bg-white border-blue-600" style={{ filter: "drop-shadow(0px 0px 6px #2563eb)" }} />
                </div>
                <div className="absolute" style={{ left: cp.x - 1, top: isUpward ? cp.y + 10 : calculatedCardY + 250, width: '2px', height: '40px', background: 'linear-gradient(to bottom, rgba(37,99,235,0.5), transparent)', opacity: 0.6 }} />
                <div className="edu-card absolute z-10" style={{ left: cp.x - CARD_WIDTH / 2, top: calculatedCardY, width: CARD_WIDTH, opacity: 0 }}>
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-5 border shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:border-blue-600/50 transition-colors duration-300" style={{ borderColor: 'rgba(0,0,0,0.12)' }}>
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border mb-3" style={{ color: '#2563eb', background: 'rgba(37,99,235,0.06)', borderColor: 'rgba(37,99,235,0.25)' }}>{item.period}</span>
                    <h3 className="text-sm font-black text-black mb-1 tracking-tight">{item.title}</h3>
                    <h4 className="text-gray-600 text-xs font-medium mb-3 font-mono">{item.institution}</h4>
                    <p className="text-gray-600 text-[11px] leading-relaxed mb-3">{item.description}</p>
                    <div className="text-xs font-mono font-bold border-t border-gray-200 pt-2.5 text-blue-600">{item.score}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Professional Experience Cards as hanging cards */}
          {allData.filter(item => item.type === 'experience').map((item, i) => {
            const cp = checkpoints[i + 3];
            const isUpward = cp.type === "up";
            const calculatedCardY = isUpward ? cp.y + 50 : cp.y - 270;

            return (
              <div key={item.id}>
                <div className="exp-checkpoint absolute z-20" style={{ left: cp.x - 10, top: cp.y - 10, opacity: 0 }}>
                  <div className="w-5 h-5 rounded-full border-4 bg-white border-purple-600" style={{ filter: "drop-shadow(0px 0px 6px #9333ea)" }} />
                </div>
                <div className="absolute" style={{ left: cp.x - 1, top: isUpward ? cp.y + 10 : calculatedCardY + 250, width: '2px', height: '40px', background: 'linear-gradient(to bottom, rgba(147,51,234,0.5), transparent)', opacity: 0.6 }} />
                <div className="exp-card absolute z-10" style={{ left: cp.x - CARD_WIDTH / 2, top: calculatedCardY, width: CARD_WIDTH, opacity: 0 }}>
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-5 border shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:border-purple-600/50 transition-colors duration-300" style={{ borderColor: 'rgba(0,0,0,0.12)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: item.color }}>
                        {item.icon}
                      </div>
                      <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border" style={{ color: item.color, background: `${item.color}10`, borderColor: `${item.color}25` }}>{item.expType}</span>
                    </div>
                    <h3 className="text-sm font-black text-black mb-1 tracking-tight">{item.role}</h3>
                    <h4 className="text-gray-600 text-xs font-medium mb-3 font-mono">{item.company} • {item.period}</h4>
                    <ul className="text-left space-y-2 text-xs text-gray-600 border-t border-gray-200 pt-3 list-none pl-0">
                      {item.details?.map((detail, idx) => (
                        <li key={idx} className="relative pl-4">
                          <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full px-12 pb-6 flex justify-between text-[10px] font-mono text-gray-500 uppercase tracking-widest z-10">
        <div>CH_1: ACTIVE // FREQ: 60HZ</div>
        <div>OSCILLOSCOPE VIEWPORT GRID</div>
      </div>
    </div>
  );
}