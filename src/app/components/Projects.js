"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import ImageSplitter from "./ImageSplitter";

// ── shared easing ──────────────────────────────────────────────────────────
const EASE   = [0.4, 0, 0.2, 1];
const SPRING = { type: "spring", stiffness: 260, damping: 28 };
const TWEEN  = { duration: 0.55, ease: EASE };

// ── project data ───────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "SWIFT",
    subtitle: "Secure Wideband Instant File Transfer",
    type: "Solo Project",
    status: "Live",
    desc: "Real-time file transfer platform with zero persistent storage, live upload-download model, and integrated real-time chat.",
    highlights: [
      "Architected a zero-storage file transfer system where transfers happen live between sender and receiver simultaneously — unlike WhatsApp, Gmail, or Telegram which store files server-side; only cryptographic transfer logs are retained as proof-of-transfer.",
      "Improved transfer reliability by ~40% and reduced connection setup time by ~30% through iterative architecture redesign across versions.",
      "Designed a signaling backend using Socket.IO to manage concurrent sessions, peer discovery, and real-time event coordination.",
    ],
    versions: [
      { v: "v1.0", desc: "Core WebRTC-based single-file transfer using room ID-based peer discovery." },
      { v: "v1.2", desc: "Multi-file transfer with ZIP-based chunking for large payloads (>25MB) and Google OAuth 2.0 authentication." },
      { v: "v1.3", desc: "Replaced room-based discovery with email-based host matching, reducing onboarding friction." },
      { v: "v1.4", desc: "Integrated Google Drive fallback for large file transfers (>25MB), increasing delivery rate by ~60%." },
      { v: "v1.5", desc: "Re-architected to live upload-download pipeline — sender uploads in real time while receiver downloads simultaneously with zero server-side storage. Removed Google Drive dependency entirely." },
      { v: "v1.6", desc: "Real-time chat supporting group and individual messaging within rooms, enabling text and link sharing without any third-party dependency." },
    ],
    tags: ["WebRTC", "Socket.IO", "Node.js", "React", "OAuth 2.0"],
    liveLink: "https://swift-file-transfer.vercel.app", // Replace with actual live URL when deployed
    githubLink: "https://github.com/benikam/swift-file-transfer", // Replace with actual GitHub repo
    coverImage: "/images/swift-cover.png",
    accentColor: "220, 38, 38",
  },
  {
    id: 2,
    title: "VEDA",
    subtitle: "Visual Enhancement and Denoising Assistant",
    type: "Research-Oriented Project",
    status: "In Progress",
    desc: "AI-assisted post-processing framework for Blender that enhances Cycles-rendered frames using computer vision and deep learning for professional cinematic quality.",
    highlights: [
      "Identified noise and grain artifacts in complex volumetric (fog) and dynamic (explosive) scenes from personal Blender experimentation; inspired by DNEG's physics-based rendering for Interstellar, developed a practical asynchronous AI post-processing pipeline without modifying Blender's core engine.",
      "Architected a decoupled dual-component architecture (lightweight Blender addon + independent VEDACore background service) to separate rendering from GPU-accelerated AI workloads.",
      "Designed an automated render-event ingestion pipeline featuring file-system monitoring, real-time frame detection, asynchronous transfer, denoising/enhancement, and output to a dedicated enhanced directory.",
      "Implemented a cinematic formatting subsystem supporting professional standards (Cinemascope 35/70mm, IMAX 35/70mm) through automatic resolution and aspect-ratio adaptation.",
      "Integrated and evaluated NAFNet for neural denoising and Real-ESRGAN for super-resolution & restoration — reducing noise while preserving geometric details and artistic intent.",
      "Explored critical systems challenges in process orchestration, inter-process communication, asynchronous workflow management, and GPU inference optimization.",
    ],
    versions: [],
    tags: ["Python", "PyTorch", "Blender", "NAFNet", "Real-ESRGAN", "Computer Vision"],
    liveLink: null,
    githubLink: "https://github.com/benikam/veda-ai-enhancement", // Replace with actual GitHub repo
    accentColor: "99, 102, 241",
    // VEDA specific properties for image splitter as main visual
    beforeImage: "/images/veda/0001.png", // Noisy render - now shown on right
    afterImage: "/images/veda/new.png",   // AI Enhanced - now shown on left
    showImageSplitter: true,
  },
];

// ── ProjectCard ────────────────────────────────────────────────────────────
function ProjectCard({ project, expanded, onToggle }) {
  const ac = project.accentColor;

  return (
    <motion.div
      layout
      transition={{ layout: SPRING }}
      animate={{
        borderColor: expanded ? `rgba(${ac},0.35)` : "rgba(226,232,240,1)",
        boxShadow: expanded
          ? `0 0 0 1.5px rgba(${ac},0.18), 0 12px 48px rgba(${ac},0.2), 0 3px 12px rgba(${ac},0.12)`
          : "0 1px 4px rgba(0,0,0,0.06)",
      }}
      className="rounded-3xl overflow-hidden border bg-white h-full flex flex-col"
      style={{ borderColor: "rgba(226,232,240,1)" }}
    >

      {/* ── Cover image block or Image Splitter ────────────────────────── */}
      {project.coverImage || (project.showImageSplitter && project.beforeImage && project.afterImage) ? (
        <>
          <motion.div
            layout
            animate={{ height: expanded ? 280 : 280 }}
            transition={TWEEN}
            className="relative w-full overflow-hidden flex-shrink-0"
          >
            {/* Regular cover image for projects like SWIFT */}
            {project.coverImage && (
              <>
                {/* Image with zoom */}
                <motion.img
                  src={project.coverImage}
                  alt={`${project.title} cover`}
                  animate={{ scale: expanded ? 1.09 : 1 }}
                  transition={TWEEN}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center center" }}
                />

                {/* Overlay — opacity driven, not gradient-interpolated */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: expanded ? 1 : 0.72 }}
                  transition={TWEEN}
                  style={{
                    background: `linear-gradient(to bottom, rgba(${ac},0.22) 0%, rgba(0,0,0,0.76) 100%)`,
                  }}
                />
                {/* Lighter overlay for collapsed state */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: expanded ? 0 : 1 }}
                  transition={TWEEN}
                  style={{
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.44) 100%)",
                  }}
                />
              </>
            )}

            {/* Image Splitter for VEDA project */}
            {!project.coverImage && project.showImageSplitter && project.beforeImage && project.afterImage && (
              <>
                <div className="absolute inset-0">
                  <ImageSplitter
                    beforeImage={project.beforeImage}
                    afterImage={project.afterImage}
                    beforeLabel="Noisy Render"
                    afterLabel="AI Enhanced"
                    className="w-full h-full"
                    usePlaceholder={false}
                  />
                </div>
                
                {/* Overlay for text readability */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-5"
                  animate={{ opacity: expanded ? 0.2 : 0.3 }}
                  transition={TWEEN}
                  style={{
                    background: `linear-gradient(to bottom, rgba(${ac},0.08) 0%, rgba(0,0,0,0.35) 100%)`,
                  }}
                />
              </>
            )}

            {/* Title — moves from bottom-left to center */}
            <motion.div
              layout
              className="absolute inset-0 flex pointer-events-none z-10"
              animate={{
                alignItems: expanded ? "center" : "flex-end",
                justifyContent: expanded ? "center" : "flex-start",
              }}
              transition={TWEEN}
              style={{ padding: expanded ? 0 : "0 0 14px 18px", textAlign: expanded ? "center" : "left" }}
            >
              <div>
                <motion.h3
                  animate={{ fontSize: expanded ? "2rem" : "1.25rem" }}
                  transition={TWEEN}
                  className="font-black text-white tracking-tight leading-tight"
                  style={{
                    textShadow: expanded
                      ? `0 0 36px rgba(${ac},1), 0 0 14px rgba(${ac},0.7), 0 2px 8px rgba(0,0,0,0.7)`
                      : "0 1px 6px rgba(0,0,0,0.55)",
                  }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  animate={{ opacity: expanded ? 1 : 0.78, fontSize: expanded ? "0.82rem" : "0.68rem" }}
                  transition={TWEEN}
                  className="text-white font-medium italic mt-1"
                  style={{
                    textShadow: expanded ? `0 0 18px rgba(${ac},0.8)` : "none",
                  }}
                >
                  {project.subtitle}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Read More Button — below image, right side */}
          <div className="px-5 py-3 flex justify-end flex-shrink-0">
            <motion.button
              onClick={onToggle}
              whileTap={{ scale: 0.96 }}
              animate={{
                background: expanded ? `rgb(${ac})` : "#3b82f6",
                color: "#ffffff",
                boxShadow: expanded 
                  ? `0 4px 20px rgba(${ac},0.4)` 
                  : "0 4px 20px rgba(59,130,246,0.4)"
              }}
              transition={TWEEN}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold z-20 hover:scale-105 transition-transform duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={expanded ? "less" : "more"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {expanded ? "Show Less" : "Read More"}
                </motion.span>
              </AnimatePresence>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={TWEEN}
                className="flex items-center"
              >
                <ChevronDown size={16} />
              </motion.span>
            </motion.button>
          </div>
        </>

      ) : (
        /* ── No-cover header ──────────────────────────────────────────── */
        <div
          className="relative p-5 pb-0 flex-shrink-0"
          style={{ background: `linear-gradient(135deg, rgba(${ac},0.07) 0%, transparent 65%)`, minHeight: "120px" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">{project.title}</h3>
              <p className="text-slate-500 text-xs font-medium italic mt-0.5">{project.subtitle}</p>
            </div>
            <motion.button
              onClick={onToggle}
              whileTap={{ scale: 0.94 }}
              animate={{
                background: expanded ? `rgba(${ac},0.12)` : "rgba(241,245,249,1)",
              }}
              transition={TWEEN}
              className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold mt-1"
              style={{ color: `rgb(${ac})`, border: `1px solid rgba(${ac},0.22)` }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={expanded ? "less" : "more"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  {expanded ? "Show Less" : "Read More"}
                </motion.span>
              </AnimatePresence>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={TWEEN}
                className="flex items-center"
              >
                <ChevronDown size={12} />
              </motion.span>
            </motion.button>
          </div>
        </div>
      )}

      {/* ── Card body ─────────────────────────────────────────────────── */}
      <div className="px-5 pt-4 pb-2 flex-grow flex flex-col">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
            project.status === "Live"
              ? "text-green-700 bg-green-50 border-green-200"
              : "text-amber-700 bg-amber-50 border-amber-200"
          }`}>
            {project.status}
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
            style={{ color: `rgb(${ac})`, background: `rgba(${ac},0.08)`, borderColor: `rgba(${ac},0.2)` }}
          >
            {project.type}
          </span>
          <div className="ml-auto flex gap-1.5">
            {project.liveLink && project.liveLink !== "#" && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo`}
                className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors"
              >
                <ExternalLink size={13} />
              </a>
            )}
            {project.githubLink && project.githubLink !== "#" && (
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors"
              >
                <Github size={13} />
              </a>
            )}
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed">{project.desc}</p>

        {/* Spacer to push tags to bottom */}
        <div className="flex-grow"></div>

        <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
          {project.tags.map(tag => (
            <span key={tag}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
              style={{ color: `rgb(${ac})`, background: `rgba(${ac},0.07)`, borderColor: `rgba(${ac},0.18)` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Accordion detail panel ─────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 6 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="mx-4 mb-4 rounded-2xl p-4 space-y-4"
              style={{ background: `rgba(${ac},0.04)`, border: `1px solid rgba(${ac},0.12)` }}
            >
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: `rgb(${ac})` }}>
                  Highlights
                </h4>
                <ul className="space-y-1.5">
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.05, ease: EASE }}
                      className="flex gap-2 text-slate-600 text-xs leading-relaxed"
                    >
                      <span className="mt-0.5 flex-shrink-0" style={{ color: `rgb(${ac})` }}>▸</span>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {project.versions.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: `rgb(${ac})` }}>
                    Version History
                  </h4>
                  <div className="space-y-1.5">
                    {project.versions.map((ver, i) => (
                      <motion.div
                        key={ver.v}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.04, ease: EASE }}
                        className="flex gap-3 text-xs"
                      >
                        <span className="font-black flex-shrink-0 w-7" style={{ color: `rgb(${ac})` }}>{ver.v}</span>
                        <span className="text-slate-500 leading-relaxed">{ver.desc}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Projects section ───────────────────────────────────────────────────────
export default function Projects() {
  const [expandedId, setExpandedId] = useState(null);
  const toggle = (id) => setExpandedId(prev => prev === id ? null : id);

  return (
    <div id="projects" className="px-6 md:px-10 pt-20 pb-32 flex flex-col items-center bg-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
          <span className="text-blue-600">My</span> Projects
        </h2>
      </motion.div>

      <motion.div
        layout
        transition={{ layout: SPRING }}
        className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch justify-items-start"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              opacity: { duration: 0.5, delay: index * 0.1 },
              y: { duration: 0.5, delay: index * 0.1 },
              layout: SPRING,
            }}
            className={expandedId === project.id ? "md:col-span-2 lg:col-span-3 h-auto" : "w-full h-full"}
          >
            <ProjectCard
              project={project}
              expanded={expandedId === project.id}
              onToggle={() => toggle(project.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
