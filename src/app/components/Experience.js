"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, FileCode2, Landmark, LineChart, GraduationCap } from "lucide-react";

const experienceData = [
  {
    id: 1,
    role: "Data Analytics Intern",
    company: "Deloitte Australia (Forage)",
    period: "May 2026",
    type: "Work Experience",
    icon: <Briefcase size={20} />,
    color: "#2563eb",
    cardAlignment: "justify-start md:pl-24",
    yOffset: "0px",
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
    cardAlignment: "justify-end md:pr-24",
    yOffset: "40px",
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
    cardAlignment: "justify-start md:pl-32",
    yOffset: "40px",
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
    cardAlignment: "justify-end md:pr-28",
    yOffset: "40px",
    details: [
      "Engineered real-time AI-powered digital twin dashboards processing continuous sensor data streams for occupancy tracking.",
      "Designed heatmap-based visualization system to analyze usage patterns and spatial distribution.",
      "Developed intelligent room recommendation system and responsive UI with dynamic updates and alerts."
    ]
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="w-full min-h-screen bg-slate-50 text-slate-800 py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden md:bg-gradient-to-b md:from-black md:to-[#191970]"
    >
      {/* Mobile/Tablet background layout accents (Left untouched) */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-100/30 blur-[100px] rounded-full pointer-events-none md:hidden" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-100/30 blur-[100px] rounded-full pointer-events-none md:hidden" />

      {/* Desktop Space Theme Ambient Blurs */}
      <div className="hidden md:block absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-12 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-40 bg-purple-500 rounded-full filter blur-3xl" />
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 sm:mb-24 relative z-10"
      >
        <span className="text-blue-600 md:text-blue-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2 block">
          Timeline of Milestones
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900 md:text-white">
          Professional <span className="text-blue-600 md:text-yellow-400">Experience</span>
        </h2>
        <p className="text-slate-500 md:text-slate-300 mt-2 text-xs sm:text-sm md:text-base font-medium">
          A vertical journey of my professional experiences, research projects, and system architectures
        </p>
      </motion.div>

      {/* ========================================================================= */}
      {/* 1. DESKTOP VIEW: SCROLL-TRIGGERED CURVED TIMELINE PATH                    */}
      {/* ========================================================================= */}
      <div className="hidden md:block relative max-w-5xl mx-auto min-h-[1400px] z-10">
        
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0" 
          viewBox="0 0 1000 1400" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Faded Background Path Track */}
          <path 
            d="M 500 0 C 750 250, 800 350, 500 550 C 200 750, 150 850, 500 1050 C 750 1200, 700 1300, 500 1400" 
            fill="none" 
            stroke="#1e293b" 
            strokeWidth="16" 
            strokeLinecap="round"
          />
          {/* Active Glowing Scroll-Triggered Path */}
          <motion.path 
            d="M 500 0 C 750 250, 800 350, 500 550 C 200 750, 150 850, 500 1050 C 750 1200, 700 1300, 500 1400" 
            fill="none" 
            stroke="#38bdf8" 
            strokeWidth="12" 
            strokeLinecap="round"
            style={{ pathLength }}
            className="drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]"
          />
        </svg>

        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="absolute right-[12%] bottom-16 z-20 flex flex-col items-center bg-slate-900 border-4 border-blue-500 p-4 rounded-3xl shadow-xl max-w-[160px] text-center"
        >
          <div className="bg-blue-500 p-3 rounded-full text-white mb-2 shadow-inner">
            <GraduationCap size={32} />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-200">Graduation Academy</span>
        </motion.div>

        <div className="relative space-y-12 w-full h-full pt-10">
          {experienceData?.map((item) => (
            <div 
              key={item.id} 
              className={`flex w-full ${item.cardAlignment || ""}`}
              style={{ marginTop: item.yOffset || "0px" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 70 }}
                className="bg-slate-900/90 backdrop-blur-xs border-4 border-slate-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 w-full max-w-md relative group text-slate-100"
              >
                <div 
                  className="absolute -top-7 left-8 w-14 h-14 rounded-full border-4 border-slate-900 flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>

                <div className="pt-6">
                  <span 
                    className="inline-block text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 border"
                    style={{
                      color: item.color,
                      backgroundColor: `${item.color}15`,
                      borderColor: `${item.color}35`
                    }}
                  >
                    {item.type}
                  </span>
                  
                  <h3 className="text-base font-black leading-tight mb-1 group-hover:text-sky-400 transition-colors">
                    {item.role}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight mb-3">
                    {item.company} • {item.period}
                  </p>

                  <ul className="text-left space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-3 list-none pl-0">
                    {item.details?.map((detail, idx) => (
                      <li key={idx} className="relative pl-4">
                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE & TABLET VIEW: STRAIGHT TIMELINE (Completely Untouched)           */}
      {/* ========================================================================= */}
      <div className="block md:hidden relative max-w-6xl mx-auto">
        <div className="absolute left-[19px] top-2 bottom-2 w-1 bg-slate-200 rounded-full">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-blue-600 via-purple-600 to-amber-500 rounded-full opacity-60" />
        </div>

        <div className="space-y-12">
          {experienceData?.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={item.id} 
                className="relative flex flex-col items-stretch w-full"
              >
                <div className="w-full pl-16">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
                    className="w-full max-w-lg bg-white border border-slate-100 rounded-3xl p-6 shadow-sm relative group"
                    style={{ borderLeftWidth: `6px`, borderLeftColor: item.color }}
                  >
                    <span 
                      className="inline-block text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 border"
                      style={{
                        color: item.color,
                        backgroundColor: `${item.color}10`,
                        borderColor: `${item.color}25`
                      }}
                    >
                      {item.type}
                    </span>

                    <div className="flex flex-col justify-between mb-3 gap-1">
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                        {item.role}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap max-w-max bg-slate-50 border px-2 py-0.5 rounded-md">
                        {item.period}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-600 mb-4 flex items-center gap-1.5">
                      {item.company}
                    </h4>

                    <ul className="space-y-2 text-xs text-slate-500 leading-relaxed list-none pl-0">
                      {item.details?.map((detail, idx) => (
                        <li key={idx} className="relative pl-4">
                          <span 
                            className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                <div className="absolute left-0 top-4 z-10 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
                    className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center text-white shadow-md cursor-pointer hover:scale-110 transition-transform duration-200"
                    style={{ 
                      backgroundColor: item.color,
                      boxShadow: `0 0 15px ${item.color}50`
                    }}
                  >
                    {item.icon}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}