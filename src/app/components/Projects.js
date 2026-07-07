"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const allProjects = [
  { 
    id: "jansaarthi", 
    title: "JanSaarthi AI", 
    subtitle: "From Complexity to Clarity", 
    hoverSubtitle: "AI — From Complexity to Clarity",
    isFeatured: true,
    tags: ["NLP", "Centralized Web System", "Language Translation", "Data Pipeline"],
    techStack: ["HTML", "CSS", "JS", "OpenAI API", "Language Models", "Tailwind CSS"],
    description: "An AI-driven citizen services platform that automates outreach and grievance resolution by matching users to relevant schemes, generating contextual guidance, and streamlining application workflows. The solution improves accessibility, reduces manual support workload, and accelerates case resolution — enabling organizations to scale assistance, increase beneficiary engagement, and make data-driven policy decisions.",
    role: "Frontend Quality Assurance Engineer",
    team: [
      { name: "Bandi Bhargav Chowdary (Team Leader)", url: "https://bhargavchowdary.netlify.app/" },
      { name: "Cheerla Shamith", url: "https://shamith.is-a.dev/" },
      { name: "Benikam Srikar", url: "/" },
      { name: "Susatwik Mannuri", url: "https://susatwik-portfolio.vercel.app/" }
    ],
    bg: "bg-sky-100", 
    textColor: "text-slate-900", 
    image: "/images/projects/jansaarthi/official image.png", 
    github: "https://github.com/BenikamSrikar/JAN-SAARTHI"
  },
  { 
    id: "swift", 
    title: "SWIFT-Connect", 
    subtitle: "Indie Project — Secure Files & Folder Transfer Room", 
    tags: ["Indie Project", "File Transfer", "Peer-to-Peer", "Folder Sync"],
    techStack: ["React", "Supabase"],
    description: "SWIFT-Connect is a secure files-and-folders transfer app inspired by Apple AirDrop. It uses a host-participant room model with Google account identification, supports upload/download transfer modes, preserves full folder directory structure, and stores only transfer metadata and logs for history — never the actual files.",
    role: "Indie Project Creator",
    bg: "bg-sky-100", 
    textColor: "text-slate-900", 
    image: "/images/projects/jansaarthi/hello.png", 
    github: "#", 
    live: "#" 
  },
  { 
    id: "library-space", 
    title: "SmartSpace-AI-Space-Utilization-System",
    subtitle: "Digital Twin — Smart City Library Prototype", 
    isFeatured: true,
    tags: ["Digital Twin", "Smart City", "Prototype"],
    techStack: ["Figma", "Adobe XD", "HTML", "CSS", "React"],
    description: "A prototype digital twin for library space management that turns occupancy data into actionable insights — enabling dynamic desk allocation, peak-hour planning, and efficient resource scheduling. The system demonstrates how predictive utilization maps and zone-level analytics can improve study-area availability, reduce energy and staffing costs, and inform longer-term infrastructure planning.",
    role: "UI/UX Designer — Frontend design (prototype mockups & layout)",
    bg: "bg-zinc-900", 
    textColor: "text-white", 
    image: "/images/projects/library space/001.png", 
    github: "https://github.com/cheerlashamith/SmartSpace-AI-Space-Utilization-System", 
    live: "#",
    team: [
      { name: "Bandi Bhargav Chowdary (Team Leader)", url: "https://bhargavchowdary.netlify.app/" },
      { name: "Cheerla Shamith", url: "https://shamith.is-a.dev/" },
      { name: "Benikam Srikar", url: "/" }
    ]
  },
  { 
    id: "recover-mate", 
    title: "Recover Mate", 
    subtitle: "AI Invoice Recovery Dashboard System", 
    isFeatured: true,
    tags: ["AI", "Messaging Automation", "Twilio", "Invoice Recovery", "Kanban"],
    techStack: ["React", "NodeJS", "Twilio", "Language Models"],
    description: "Recover Mate is an AI-driven invoice recovery assistant that converts Promising, Unpaid, and Paid statuses into actionable outreach. It uses Twilio-powered messaging and automated call workflows backed by language models to follow up with clients, accelerate collections, and reduce manual recovery effort.",
    role: "Quality Assurance Tester",
    team: [
      { name: "Susatwik Mannuri (Team Lead and Application Developer)", url: "https://github.com/susatwik" },
      { name: "Benikam Srikar", url: "/" }
    ],
    bg: "bg-sky-100", 
    textColor: "text-slate-900", 
    image: "/images/projects/recoverymate/001.png", 
    github: "https://github.com/susatwik/RecoverMate", 
    live: "#" 
  },
];

const TextReveal = ({ text }) => {
  const letters = text.split("");
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const child = {
    visible: { opacity: 1, rotateX: 0, y: 0, transition: { type: "spring", stiffness: 120, damping: 10 } },
    hidden: { opacity: 0, rotateX: -90, y: 10 }
  };
  return (
    <motion.div style={{ display: "flex", perspective: "500px" }} variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {letters.map((letter, i) => (
        <motion.span variants={child} key={i} style={{ display: "inline-block" }}>{letter === " " ? "\u00A0" : letter}</motion.span>
      ))}
    </motion.div>
  );
};

function TagCarousel({ tags }) {
  const controls = useAnimation();
  const [paused, setPaused] = useState(false);
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const [repeatCount, setRepeatCount] = useState(1);

  useEffect(() => {
    const updateRepeatCount = () => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const contentWidth = measureRef.current?.scrollWidth ?? 0;
      if (!containerWidth || !contentWidth) return;
      const count = Math.max(1, Math.ceil(containerWidth / contentWidth));
      setRepeatCount(count);
    };
    updateRepeatCount();
    window.addEventListener("resize", updateRepeatCount);
    return () => window.removeEventListener("resize", updateRepeatCount);
  }, [tags]);

  useEffect(() => {
    if (paused) { controls.stop(); return; }
    controls.start({ x: ["0%", "-50%"], transition: { duration: 14, ease: "linear", repeat: Infinity } });
  }, [paused, controls]);

  const repeatedTags = Array.from({ length: repeatCount }, () => tags).flat();
  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div ref={measureRef} className="pointer-events-none absolute left-0 top-0 opacity-0 whitespace-nowrap flex items-center gap-2">
        {tags.map((tag, idx) => <span key={`${tag}-measure-${idx}`} className="text-[10px] md:text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800">{tag}</span>)}
      </div>
      <motion.div animate={controls} className="flex min-w-[200%] items-center gap-2 whitespace-nowrap">
        {[...repeatedTags, ...repeatedTags].map((tag, idx) => (
          <span key={`${tag}-${idx}`} className="text-[10px] md:text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800">{tag}</span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [expandedCard, setExpandedCard] = useState(null);
  const sectionRef = useRef(null);

  const toggleExpand = (id) => setExpandedCard(expandedCard === id ? null : id);

  return (
    <section ref={sectionRef} id="projects" className="w-full py-20 px-4 md:px-10 bg-orange-600/[0.03] overflow-x-hidden scroll-mt-10">
      <div className="text-center mb-16 overflow-hidden flex justify-center text-5xl md:text-7xl font-black tracking-tighter text-slate-900">
        <TextReveal text="PROJECTS" />
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col gap-10 items-center relative">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 overflow-visible relative">
          <AnimatePresence mode="popLayout">
            {allProjects.map((proj) => {
              const isExpanded = expandedCard === proj.id;
              return (
                <motion.div key={proj.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="project-card-wrapper w-full h-full overflow-visible relative">
                  {proj.id === 'jansaarthi' && (
                    <div className={`absolute inset-0 rounded-xl bg-transparent pointer-events-none z-0 transition-all duration-500 ease-out ${isExpanded ? "opacity-100 scale-[1.01] shadow-[0_-20px_40px_-15px_rgba(234,88,12,0.35),0_20px_40px_-15px_rgba(22,163,74,0.35)]" : "opacity-0 scale-95"}`} />
                  )}
                  <motion.div whileHover={{ scale: 0.995 }} className={`relative project-card ${proj.bg} ${proj.textColor} h-[550px] md:h-[650px] rounded-xl overflow-hidden shadow-sm z-10`}>
                    {proj.isFeatured && (
                      <span className={`absolute top-4 right-4 z-30 rounded-full bg-orange-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 ${isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>Featured Project</span>
                    )}
                    <div className="h-[60%] w-full overflow-hidden relative bg-slate-50">
                      <img src={proj.image} alt={`${proj.title} preview`} className={`h-full w-full transition-transform duration-700 ${proj.id === "recovery-mate" ? "object-cover object-top" : "object-cover"} ${isExpanded && proj.id !== "recovery-mate" ? "scale-105" : ""}`} />
                    </div>
                    <div className={`absolute left-0 right-0 bottom-0 z-0 bg-white transition-all duration-500 ease-out ${isExpanded ? "top-0 rounded-t-none" : "top-[58%] rounded-t-xl"}`} />
                    <div className={`absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-6 text-center transition-all duration-500 ease-out ${isExpanded ? "top-0 justify-start gap-4 overflow-y-auto py-8 h-full" : "top-[58%] justify-between py-4 h-[42%]"}`}>
                      <div className="transition-all duration-500 w-full flex flex-col items-center">
                        <h2 className={`mb-0.5 text-2xl font-extrabold tracking-tight transition-colors duration-300 md:text-3xl ${isExpanded ? "text-orange-600" : "text-slate-900"}`}>{proj.title}</h2>
                        <p className="text-xs font-medium text-slate-500 md:text-sm px-4 mb-2 line-clamp-1">
                          <span className={proj.hoverSubtitle && isExpanded ? "hidden" : "inline"}>{proj.subtitle}</span>
                          {proj.hoverSubtitle && isExpanded && <span className="inline text-orange-600 font-semibold italic opacity-100 translate-y-0 transition-all duration-500 ease-out">{proj.hoverSubtitle}</span>}
                        </p>
                        {proj.tags && <TagCarousel tags={proj.tags} />}
                      </div>
                      {isExpanded && proj.description && (
                        <div className="flex flex-col items-center w-full transition-all duration-500 mt-4">
                          <div className="w-full max-w-2xl rounded-[32px] bg-white/95 border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.12)] p-6 space-y-8">
                            <div className="space-y-4"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-600">Overview</p><p className="text-sm leading-7 text-slate-700">{proj.description}</p></div>
                            {proj.techStack && <div className="space-y-3"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Tech stack</p><div className="flex flex-wrap gap-2">{proj.techStack.map((tech, idx) => <span key={idx} className="rounded-2xl bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200">{tech}</span>)}</div></div>}
                            {proj.role && <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 mb-2">Role</p><p className="text-sm font-semibold text-slate-800">{proj.role}</p></div>}
                            {proj.team && <div className="space-y-3"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Team</p><div className="flex flex-wrap gap-2">{proj.team.map((member, idx) => <a key={idx} href={member.url} target={member.url === "/" ? "_self" : "_blank"} rel="noopener noreferrer" className="inline-flex items-center rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600">{member.name}</a>)}</div></div>}
                          </div>
                        </div>
                      )}
                      <div className={`w-full mt-2 pb-1 ${isExpanded ? 'flex flex-col items-center gap-2' : 'flex items-center gap-4'}`}>
                        {!isExpanded ? (
                          <div className="w-full flex items-center gap-4">
                            <div className="flex-shrink-0">{proj.github && <a href={proj.github} target={proj.github !== "#" ? "_blank" : "_self"} rel={proj.github !== "#" ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition-all hover:bg-orange-600 text-xs md:text-sm">GitHub</a>}</div>
                            <div className="flex-1" /><div className="flex-shrink-0"><button onClick={() => toggleExpand(proj.id)} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-orange-600 text-xs md:text-sm"><span>View Details</span></button></div>
                          </div>
                        ) : (
                          <>
                            <div className={`flex gap-4 transition-all duration-300 ${isExpanded ? "opacity-100 translate-y-0" : "opacity-90"}`}>
                              {proj.github && proj.github !== "#" && <a href={proj.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2 font-semibold text-white transition-all hover:bg-orange-600 text-xs md:text-sm">GitHub</a>}
                              {proj.live && proj.live !== "#" && <a href={proj.live} className="inline-block rounded-xl border border-slate-300 bg-white px-5 py-2 font-semibold text-slate-800 transition-all hover:bg-slate-100 text-xs md:text-sm">Live Demo</a>}
                            </div>
                            <button onClick={() => toggleExpand(proj.id)} className={`text-xs font-bold tracking-wider uppercase border-b-2 transition-colors duration-200 pt-1 pb-0.5 ${isExpanded ? "text-orange-600 border-orange-600 hover:text-orange-700" : "text-slate-800 border-slate-800 hover:text-orange-600 hover:border-orange-600"}`}>{isExpanded ? "✕ Close Details" : "View Details"}</button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}