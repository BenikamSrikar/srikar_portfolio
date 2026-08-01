"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Users, User, Code2, Sparkles, X, FolderGit2, Layer } from "lucide-react";

const allProjects = [
  { 
    id: "jansaarthi", 
    title: "JanSaarthi AI", 
    subtitle: "From Complexity to Clarity", 
    projectType: "Team Project",
    isFeatured: true,
    tags: ["NLP", "Centralized Web System", "Language Translation", "Data Pipeline"],
    techStack: ["HTML", "CSS", "JS", "OpenAI API", "Language Models", "Tailwind CSS"],
    description: "An AI-driven citizen services platform that automates outreach and grievance resolution by matching users to relevant schemes, generating contextual guidance, and streamlining application workflows. The solution improves accessibility, reduces manual support workload, and accelerates case resolution — enabling organizations to scale assistance, increase beneficiary engagement, and make data-driven policy decisions.",
    role: "Frontend Quality Assurance Engineer",
    team: [
      { name: "Bandi Bhargav Chowdary (Team Lead)", url: "https://bhargavchowdary.netlify.app/" },
      { name: "Cheerla Shamith", url: "https://shamith.is-a.dev/" },
      { name: "Benikam Srikar", url: "/" },
      { name: "Susatwik Mannuri", url: "https://susatwik-portfolio.vercel.app/" }
    ],
    bg: "bg-white", 
    textColor: "text-slate-900", 
    image: "/images/projects/jansaarthi/official image.png", 
    github: "https://github.com/BenikamSrikar/JAN-SAARTHI",
    borderColor: "#ea580c",
    gradient: "linear-gradient(145deg, #ea580c15, #ffffff)"
  },
  { 
    id: "swift", 
    title: "SWIFT-Connect", 
    subtitle: "Secure Files & Folder Transfer Room", 
    projectType: "Indie Project",
    isFeatured: false,
    tags: ["Indie Project", "File Transfer", "Peer-to-Peer", "Folder Sync"],
    techStack: ["React", "Supabase", "WebRTC", "Tailwind CSS"],
    description: "SWIFT-Connect is a secure files-and-folders transfer app inspired by Apple AirDrop. It uses a host-participant room model with Google account identification, supports upload/download transfer modes, preserves full folder directory structure, and stores only transfer metadata and logs for history — never the actual files.",
    role: "Indie Project Creator",
    team: [
      { name: "Benikam Srikar (Solo Creator)", url: "/" }
    ],
    bg: "bg-white", 
    textColor: "text-slate-900", 
    image: "/images/projects/jansaarthi/hello.png", 
    github: "https://github.com/BenikamSrikar", 
    live: "#",
    borderColor: "#9333ea",
    gradient: "linear-gradient(145deg, #9333ea15, #ffffff)"
  },
  { 
    id: "library-space", 
    title: "SmartSpace AI",
    subtitle: "Digital Twin — Smart City Library Prototype", 
    projectType: "Team Project",
    isFeatured: true,
    tags: ["Digital Twin", "Smart City", "Prototype"],
    techStack: ["Figma", "Adobe XD", "HTML", "CSS", "React"],
    description: "A prototype digital twin for library space management that turns occupancy data into actionable insights — enabling dynamic desk allocation, peak-hour planning, and efficient resource scheduling. The system demonstrates how predictive utilization maps and zone-level analytics can improve study-area availability, reduce energy and staffing costs, and inform longer-term infrastructure planning.",
    role: "UI/UX Designer — Frontend design (prototype mockups & layout)",
    team: [
      { name: "Bandi Bhargav Chowdary (Team Lead)", url: "https://bhargavchowdary.netlify.app/" },
      { name: "Cheerla Shamith", url: "https://shamith.is-a.dev/" },
      { name: "Benikam Srikar", url: "/" }
    ],
    bg: "bg-white", 
    textColor: "text-slate-900", 
    image: "/images/projects/library space/001.png", 
    github: "https://github.com/cheerlashamith/SmartSpace-AI-Space-Utilization-System", 
    live: "#",
    borderColor: "#2563eb",
    gradient: "linear-gradient(145deg, #2563eb15, #ffffff)"
  },
  { 
    id: "recover-mate", 
    title: "Recover Mate", 
    subtitle: "AI Invoice Recovery Dashboard System", 
    projectType: "Team Project",
    isFeatured: true,
    tags: ["AI", "Messaging Automation", "Twilio", "Invoice Recovery", "Kanban"],
    techStack: ["React", "NodeJS", "Twilio", "Language Models"],
    description: "Recover Mate is an AI-driven invoice recovery assistant that converts Promising, Unpaid, and Paid statuses into actionable outreach. It uses Twilio-powered messaging and automated call workflows backed by language models to follow up with clients, accelerate collections, and reduce manual recovery effort.",
    role: "Quality Assurance Tester",
    team: [
      { name: "Susatwik Mannuri (Team Lead)", url: "https://github.com/susatwik" },
      { name: "Benikam Srikar", url: "/" }
    ],
    bg: "bg-white", 
    textColor: "text-slate-900", 
    image: "/images/projects/recoverymate/001.png", 
    github: "https://github.com/susatwik/RecoverMate", 
    live: "#",
    borderColor: "#059669",
    gradient: "linear-gradient(145deg, #05966915, #ffffff)"
  },
];

const TextReveal = ({ text }) => {
  const letters = text.split("");
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
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

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [clickedCardRect, setClickedCardRect] = useState(null);
  const sectionRef = useRef(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        setClickedCardRect(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCardClick = (project, event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    setClickedCardRect(rect);
    setSelectedProject(project);
  };

  return (
    <section ref={sectionRef} id="projects" className="w-full py-16 px-4 md:px-8 bg-slate-50/50 overflow-x-hidden scroll-mt-10">
      {/* Section Header */}
      <div className="text-center mb-10 overflow-hidden flex flex-col items-center">
        <div className="flex justify-center text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
          <TextReveal text="FEATURED PROJECTS" />
        </div>
        <p className="mt-3 text-sm md:text-base text-slate-500 font-medium max-w-xl">
          Browse my featured projects in a clean grid layout. Click any card to explore full details with smooth transitions.
        </p>
      </div>

      {/* Three Cards per Row Grid Layout */}
      <div className="max-w-[1200px] mx-auto relative px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project, index) => (
            <motion.article
              key={project.id}
              layoutId={`project-card-${project.id}`}
              onClick={(e) => handleCardClick(project, e)}
              className="cursor-pointer group"
              initial={{ 
                opacity: 0,
                y: 60,
                scale: 0.8,
                rotateX: 15
              }}
              whileInView={{ 
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100
              }}
              viewport={{ 
                once: true, 
                margin: "-100px" 
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="relative flex flex-col h-full min-h-[480px] rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                
                {/* Badges */}
                <motion.div 
                  className="absolute top-4 left-4 right-4 flex items-center justify-between z-10"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.15 + 0.3,
                    duration: 0.4
                  }}
                  viewport={{ once: true }}
                >
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg ${
                    project.projectType === "Indie Project" 
                      ? "bg-purple-600 text-white" 
                      : "bg-emerald-600 text-white"
                  }`}>
                    {project.projectType === "Indie Project" ? <User className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                    {project.projectType}
                  </span>

                  {project.isFeatured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-600 text-white shadow-lg">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </motion.div>

                {/* Image with Mask Reveal */}
                <motion.div 
                  layoutId={`project-image-${project.id}`}
                  className="relative w-full h-[240px] overflow-hidden bg-slate-900"
                  initial={{ 
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                  }}
                  whileInView={{ 
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" 
                  }}
                  transition={{ 
                    delay: index * 0.15 + 0.2,
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ once: true }}
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      delay: index * 0.15 + 0.4,
                      duration: 1.2,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.5 }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </motion.div>

                {/* Content with Slide Up Animation */}
                <motion.div 
                  className="flex-1 p-5 bg-white flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.15 + 0.5,
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                >
                  <motion.h3 
                    layoutId={`project-title-${project.id}`}
                    className="text-xl font-black text-slate-900 tracking-tight"
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p 
                    layoutId={`project-subtitle-${project.id}`}
                    className="text-xs font-semibold text-orange-600 mt-1"
                  >
                    {project.subtitle}
                  </motion.p>

                  {/* Tech Stack Preview with Stagger */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack.slice(0, 3).map((tech, techIdx) => (
                      <motion.span 
                        key={techIdx} 
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: index * 0.15 + 0.6 + (techIdx * 0.1),
                          duration: 0.3
                        }}
                        viewport={{ once: true }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.techStack.length > 3 && (
                      <motion.span 
                        className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-orange-100 text-orange-700 border border-orange-200"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: index * 0.15 + 0.9,
                          duration: 0.3
                        }}
                        viewport={{ once: true }}
                      >
                        +{project.techStack.length - 3}
                      </motion.span>
                    )}
                  </div>

                  {/* Brief Description Preview */}
                  <motion.p 
                    className="text-xs text-slate-600 leading-relaxed mt-4 flex-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ 
                      delay: index * 0.15 + 0.7,
                      duration: 0.4
                    }}
                    viewport={{ once: true }}
                  >
                    {project.description.length > 140 
                      ? `${project.description.substring(0, 140)}...` 
                      : project.description}
                  </motion.p>

                  {/* View Details CTA */}
                  <motion.div 
                    className="mt-auto pt-4 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-orange-600 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.15 + 0.8,
                      duration: 0.3
                    }}
                    viewport={{ once: true }}
                  >
                    <span>View Full Details</span>
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Morphing Modal with Layout Animation */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.42, 0, 1, 1] }}
              onClick={() => {
                setSelectedProject(null);
                setClickedCardRect(null);
              }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-lg"
            />

            {/* Modal Body with Morph Effect */}
            <motion.div
              layoutId={`project-card-${selectedProject.id}`}
              initial={clickedCardRect ? {
                width: clickedCardRect.width,
                height: clickedCardRect.height,
                x: clickedCardRect.left - window.innerWidth / 2 + clickedCardRect.width / 2,
                y: clickedCardRect.top - window.innerHeight / 2 + clickedCardRect.height / 2,
              } : {
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                width: 'auto',
                height: 'auto',
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              exit={clickedCardRect ? {
                width: clickedCardRect.width,
                height: clickedCardRect.height,
                x: clickedCardRect.left - window.innerWidth / 2 + clickedCardRect.width / 2,
                y: clickedCardRect.top - window.innerHeight / 2 + clickedCardRect.height / 2,
                opacity: 0,
              } : {
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                duration: 0.4,
                ease: [0.42, 0, 1, 1],
              }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 my-8 flex flex-col max-h-[90vh]"
            >
              {/* Modal Top Header Bar */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 sticky top-0 z-20 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    selectedProject.projectType === "Indie Project" 
                      ? "bg-purple-600 text-white" 
                      : "bg-emerald-600 text-white"
                  }`}>
                    {selectedProject.projectType === "Indie Project" ? <User className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />}
                    {selectedProject.projectType}
                  </span>

                  {selectedProject.isFeatured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600 text-white">
                      <Sparkles className="w-3.5 h-3.5" /> Featured
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setClickedCardRect(null);
                  }}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                
                {/* Hero Image Section with Layout ID */}
                <motion.div 
                  layoutId={`project-image-${selectedProject.id}`}
                  className="w-full h-[240px] md:h-[360px] relative rounded-2xl overflow-hidden bg-slate-900 shadow-md"
                >
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <motion.h2 
                      layoutId={`project-title-${selectedProject.id}`}
                      className="text-2xl md:text-4xl font-black drop-shadow-md"
                    >
                      {selectedProject.title}
                    </motion.h2>
                    <motion.p 
                      layoutId={`project-subtitle-${selectedProject.id}`}
                      className="text-orange-400 text-xs md:text-sm font-semibold drop-shadow mt-0.5"
                    >
                      {selectedProject.subtitle}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded bg-orange-100 text-orange-700 border border-orange-200">
                    TYPE: {selectedProject.projectType}
                  </span>
                  {selectedProject.tags && selectedProject.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Detailed Description */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-orange-500" /> Full Description
                  </span>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal bg-slate-50/80 p-4 md:p-5 rounded-2xl border border-slate-200/80">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Role & Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Role */}
                  <div className="space-y-1.5 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block">
                      Assigned Role
                    </span>
                    <p className="text-sm font-semibold text-slate-800">
                      {selectedProject.role}
                    </p>
                  </div>

                  {/* Team Members */}
                  <div className="space-y-1.5 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-orange-500" /> Team Members
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedProject.team && selectedProject.team.map((member, mIdx) => (
                        <a
                          key={mIdx}
                          href={member.url}
                          target={member.url !== "/" ? "_blank" : "_self"}
                          rel={member.url !== "/" ? "noopener noreferrer" : undefined}
                          className="text-xs font-medium text-slate-700 bg-white hover:bg-orange-500 hover:text-white px-2.5 py-1 rounded-lg border border-slate-200 transition-colors inline-flex items-center gap-1 shadow-sm"
                        >
                          {member.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                {selectedProject.techStack && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Tech Stack:</span>
                    <div className="flex flex-wrap items-center gap-2">
                      {selectedProject.techStack.map((tech, techIdx) => (
                        <span key={techIdx} className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* External Action Links */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    {selectedProject.github && selectedProject.github !== "#" && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-semibold text-xs md:text-sm shadow-md hover:shadow-lg transition-all"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub Repository</span>
                      </a>
                    )}

                    {selectedProject.live && selectedProject.live !== "#" && (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs md:text-sm shadow-sm transition-all"
                      >
                        <ExternalLink className="w-4 h-4 text-orange-600" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setClickedCardRect(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs md:text-sm transition-colors"
                  >
                    Close Details
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}