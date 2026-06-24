"use client";
import { motion } from "framer-motion";
import { Briefcase, FileCode2, Landmark, LineChart } from "lucide-react";

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

export default function Experience() {
  return (
    <section 
      id="experience" 
      className="w-full min-h-screen bg-slate-50 text-slate-800 py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-100/30 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-100/30 blur-[100px] rounded-full pointer-events-none" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 sm:mb-24"
      >
        <span className="text-blue-600 font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2 block">
          Timeline of Milestones
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
          Professional <span className="text-blue-600">Experience</span>
        </h2>
        <p className="text-slate-500 mt-2 text-xs sm:text-sm md:text-base">
          A vertical journey of my professional experiences, research projects, and system architectures
        </p>
      </motion.div>

      {/* Timeline Wrapper */}
      <div className="relative max-w-6xl mx-auto">
        {/* Central Vertical Line */}
        <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-1 bg-slate-200 rounded-full">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-blue-600 via-purple-600 to-amber-500 rounded-full opacity-60" />
        </div>

        {/* Timeline Items */}
        <div className="space-y-12 md:space-y-16">
          {experienceData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={item.id} 
                className="relative flex flex-col md:flex-row items-stretch w-full"
              >
                {/* Card Content */}
                <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end' : 'md:justify-start md:order-2'} pl-16 md:pl-0 md:px-8`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
                    className="w-full max-w-lg bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 relative group"
                    style={{ borderLeftWidth: `6px`, borderLeftColor: item.color }}
                  >
                    {/* Type badge */}
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

                    {/* Heading */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3 gap-1">
                      <h3 className="text-lg md:text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                        {item.role}
                      </h3>
                      <span className="text-[10px] md:text-xs font-bold text-slate-400 whitespace-nowrap bg-slate-50 border px-2 py-0.5 rounded-md">
                        {item.period}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-600 mb-4 flex items-center gap-1.5">
                      {item.company}
                    </h4>

                    {/* Detail bullets */}
                    <ul className="space-y-2 text-xs md:text-[13px] text-slate-500 leading-relaxed list-none pl-0">
                      {item.details.map((detail, idx) => (
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

                {/* Timeline Icon Node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-4 z-10 flex items-center justify-center">
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

                {/* Empty side space for layout alignment */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
