"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, 
  FileText, 
  ExternalLink, 
  Github, 
  X, 
  Terminal, 
  Layers, 
  Activity, 
  Zap, 
  Cpu 
} from "lucide-react";

// ── Shared Animation Configs ────────────────────────────────────────────────
const SPRING = { type: "spring", stiffness: 300, damping: 30 };
const BACKDROP_ANIM = { opacity: { duration: 0.2 } };
const MODAL_ANIM = {
  initial: { scale: 0.95, opacity: 0, y: 20 },
  animate: { scale: 1, opacity: 1, y: 0, transition: SPRING },
  exit: { scale: 0.95, opacity: 0, y: 15, transition: { duration: 0.2 } }
};

// ── Complete Project & Category Dataset ─────────────────────────────────────
const projectCategories = [
  {
    id: "featured",
    title: "Featured Projects",
    subtitle: "Enterprise, production-ready, & research initiatives",
    icon: <Layers className="w-6 h-6 text-blue-500" />,
    accentColor: "37, 99, 235", // Blue
    projects: [
      {
        id: "jansaarthi",
        title: "JanSaarthi",
        subtitle: "Citizen Grievance & Portal Framework",
        type: "Team Lead",
        status: "Production",
        desc: "A scalable public utility management ecosystem designed to bridge communication gaps between regional administrative bodies and local citizens.",
        tags: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS"],
        highlights: [
          "Architected a secure role-based access management subsystem dealing with multiple operational levels from local operators to nodal monitoring heads.",
          "Implemented optimized concurrent database indexing strategies ensuring live ticket dispatch latencies stay under ~150ms.",
          "Designed data visualizers and localized status tracking interfaces to enhance non-technical citizen user adoption."
        ],
        liveLink: "#",
        githubLink: "#"
      },
      {
        id: "library-space",
        title: "Library Space Utilization System",
        subtitle: "IoT & Computer Vision Analytics Ecosystem",
        type: "Research Project",
        status: "Completed",
        desc: "An intelligent occupancy tracking engine collecting live physical facility spatial load metrics using vision analysis streams and multi-point microcontrollers.",
        tags: ["Python", "OpenCV", "Raspberry Pi", "MQTT", "Flask"],
        highlights: [
          "Deployed standard edge object localization nodes running optimized inference routines directly on micro-computing peripherals.",
          "Configured low-overhead state syncing networks over standard MQTT brokers to avoid local network congestion during peak operational hours.",
          "Generated granular heatmaps and predictive facility load distributions that helped optimize physical zoning arrangements."
        ],
        liveLink: "#",
        githubLink: "#"
      },
      {
        id: "recovery-mate",
        title: "Recovery Mate",
        subtitle: "Clinical Physical Rehabilitation Monitor",
        type: "Collaborative Project",
        status: "Beta testing",
        desc: "A cross-platform mobile ecosystem linking biomechanical tracking telemetry with clinical therapy guidance for sports recovery management.",
        tags: ["React Native", "Node.js", "TensorFlow.js", "Bluetooth LE"],
        highlights: [
          "Configured low-latency telemetry acquisition protocols processing multi-axis inertial data streams directly via local hardware integrations.",
          "Built a local predictive analysis mechanism identifying structural form deviations during home-based therapeutic sessions.",
          "Integrated compliant cloud encryption pipelines providing secure diagnostics logging and remote practitioner updates."
        ],
        liveLink: "#",
        githubLink: "#"
      }
    ]
  },
  {
    id: "indie",
    title: "Indie Projects",
    subtitle: "Custom network software & performance deep-dives",
    icon: <Terminal className="w-6 h-6 text-amber-500" />,
    accentColor: "217, 119, 6", // Amber
    projects: [
      {
        id: "swift",
        title: "SWIFT",
        subtitle: "Secure Wideband Instant File Transfer",
        type: "Solo Project",
        status: "Live",
        desc: "Real-time file transfer platform with zero persistent storage, live upload-download model, and integrated real-time chat.",
        tags: ["WebRTC", "Socket.IO", "Node.js", "React", "OAuth 2.0"],
        highlights: [
          "Architected a zero-storage file transfer system where transfers happen live between sender and receiver simultaneously — avoiding standard cloud-side file logging mechanics entirely.",
          "Improved transmission resilience by ~40% and reduced session handshake times by ~30% via a tailored multi-candidate signaling workflow.",
          "Integrated live concurrent chat environments enabling contextual room synchronization without caching transactional state databases."
        ],
        liveLink: "https://swift-file-transfer.vercel.app",
        githubLink: "https://github.com/benikam/swift-file-transfer"
      },
      {
        id: "veda",
        title: "VEDA",
        subtitle: "Visual Enhancement & Denoising Assistant",
        type: "Research Engine",
        status: "In Progress",
        desc: "AI-assisted post-processing system for rendering environments utilizing deep neural pipelines to reduce complex noise distributions asynchronously.",
        tags: ["Python", "PyTorch", "Blender API", "NAFNet", "Real-ESRGAN"],
        highlights: [
          "Built an external asynchronous asset daemon hooking file monitoring mechanisms without blocking host application processing main loops.",
          "Integrated NAFNet and specialized super-resolution architectures to clear complex volumetric grains while shielding native geometry values.",
          "Created modular resolution configuration algorithms automatically setting targeted dimensions matching historical cinematic aspect ratios."
        ],
        liveLink: null,
        githubLink: "https://github.com/benikam/veda-ai-enhancement"
      }
    ]
  }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Set the first project active whenever a category modal opens
  const handleOpenCategory = (category) => {
    setActiveCategory(category);
    setSelectedProject(category.projects[0]);
  };

  // Prevent background scrolling when modal window is open
  useEffect(() => {
    if (activeCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [activeCategory]);

  return (
    <div id="projects" className="px-4 sm:px-6 md:px-10 pt-20 pb-32 flex flex-col items-center bg-slate-50/50 min-h-screen font-sans">
      
      {/* ── Section Header ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 uppercase italic">
          <span className="text-blue-600">My</span> Portfolio
        </h2>
        <p className="text-sm text-slate-500 mt-2">Select a workspace folder to inspect files</p>
      </motion.div>

      {/* ── Dashboard Grid ────────────────────────────────────────────────── */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {projectCategories.map((cat) => {
          const ac = cat.accentColor;
          return (
            <motion.div
              key={cat.id}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleOpenCategory(cat)}
              className="group cursor-pointer rounded-3xl p-8 bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              style={{
                borderColor: `rgba(${cat.accentColor}, 0.1)`,
              }}
            >
              {/* Subtle background glow element */}
              <div 
                className="absolute -right-12 -top-12 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{ background: `rgb(${ac})` }}
              />

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xl text-slate-800 tracking-tight">{cat.title}</h3>
                    <p className="text-xs text-slate-400 font-medium">{cat.projects.length} Files inside</p>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-8">{cat.subtitle}</p>
              </div>

              {/* Document List Preview Grid */}
              <div className="space-y-2 bg-slate-50/70 p-4 rounded-2xl border border-slate-100/80">
                {cat.projects.map((proj) => (
                  <div key={proj.id} className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                    <FileText size={14} className="text-slate-400 flex-shrink-0" />
                    <span className="truncate">{proj.title}</span>
                    <span className="ml-auto text-[10px] font-bold text-slate-400 uppercase tracking-wider scale-90 px-1.5 py-0.5 rounded bg-white border border-slate-200/60">
                      {proj.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── macOS Notes App Modal Lifecycle ───────────────────────────────── */}
      <AnimatePresence>
        {activeCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={BACKDROP_ANIM}
              onClick={() => setActiveCategory(null)}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-md"
            />

            {/* Main macOS App Container */}
            <motion.div
              variants={MODAL_ANIM}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute w-full max-w-6xl h-[80vh] min-h-[500px] bg-[#f4f5f6] rounded-2xl border border-black/10 shadow-2xl overflow-hidden flex flex-col"
            >
              
              {/* macOS Window Titlebar */}
              <div className="h-12 bg-[#ebebeb] border-b border-slate-300/80 px-4 flex items-center select-none flex-shrink-0 relative">
                {/* Clean Closing Window Button */}
                <div className="flex items-center absolute left-4 z-10">
                  <button 
                    onClick={() => setActiveCategory(null)}
                    className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center group relative"
                  >
                    <X size={8} className="text-[#4c0002] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>

                {/* Window Title Label */}
                <div className="w-full text-center flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
                  <Folder size={14} className="text-slate-400" />
                  <span>Notes — {activeCategory.title}</span>
                </div>
              </div>

              {/* macOS Body Split Layout */}
              <div className="flex flex-1 overflow-hidden w-full">
                
                {/* Left Sidebar: File list items */}
                <div className="w-64 sm:w-72 bg-[#e1e2e4]/60 border-r border-slate-300/60 overflow-y-auto p-2 space-y-1 select-none flex-shrink-0">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                    Notes
                  </div>
                  {activeCategory.projects.map((proj) => {
                    const isSelected = selectedProject?.id === proj.id;
                    return (
                      <div
                        key={proj.id}
                        onClick={() => setSelectedProject(proj)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? "bg-[#ffbd2e]/20 border border-[#dfa223]/30 shadow-sm" 
                            : "hover:bg-slate-200/50 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <FileText size={14} className={isSelected ? "text-[#b27d0f]" : "text-slate-400"} />
                          <h4 className={`text-xs font-bold truncate ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                            {proj.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 pl-5 font-medium">
                          {proj.subtitle}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Right Panel: Clean Solid White Canvas Layout */}
                <div className="flex-1 bg-white relative overflow-y-auto px-8 py-10 sm:px-12">
                  
                  <AnimatePresence mode="wait">
                    {selectedProject ? (
                      <motion.div
                        key={selectedProject.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.18 }}
                        className="relative z-10 max-w-3xl text-slate-800"
                      >
                        {/* Meta Tags Bar */}
                        <div className="flex flex-wrap items-center gap-2 font-sans mb-4 scale-95 origin-left">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600">
                            {selectedProject.type}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700">
                            {selectedProject.status}
                          </span>
                          
                          {/* Code Repos & Deployment Hyperlinks */}
                          <div className="ml-auto flex items-center gap-3 font-medium">
                            {selectedProject.liveLink && selectedProject.liveLink !== "#" && (
                              <a 
                                href={selectedProject.liveLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-sans font-bold"
                              >
                                <ExternalLink size={12} />
                                Live Demo
                              </a>
                            )}
                            {selectedProject.githubLink && selectedProject.githubLink !== "#" && (
                              <a 
                                href={selectedProject.githubLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 text-xs text-slate-600 hover:underline font-sans font-bold"
                              >
                                <Github size={12} />
                                GitHub
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Project Heading Title Line */}
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans mb-1">
                          {selectedProject.title}
                        </h1>
                        <p className="text-base text-slate-400 font-sans font-semibold italic border-b border-dashed border-slate-200 pb-4 mb-6">
                          {selectedProject.subtitle}
                        </p>

                        {/* Summary Block */}
                        <div className="mb-8 font-sans text-sm font-medium leading-relaxed text-slate-600 border-l-2 border-slate-300 pl-4 py-1 italic">
                          {selectedProject.desc}
                        </div>

                        {/* Core Implementation Technical Highlights */}
                        <div className="mb-8 font-sans">
                          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                            Specifications
                          </h3>
                          <ul className="space-y-3">
                            {selectedProject.highlights.map((item, idx) => (
                              <li key={idx} className="flex gap-2.5 text-xs text-slate-600 leading-relaxed font-medium">
                                <span className="text-amber-500 flex-shrink-0 mt-0.5">▪</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies Tags Footing */}
                        <div className="font-sans border-t border-slate-100 pt-6">
                          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                            Metadata Index Tags
                          </h3>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedProject.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200/60 px-2 py-1 rounded-md"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                      </motion.div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-300 font-sans text-xs font-semibold">
                        Select a file snippet from the catalog sidebar
                      </div>
                    )}
                  </AnimatePresence>

                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}