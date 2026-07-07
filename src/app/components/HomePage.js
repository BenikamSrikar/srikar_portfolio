"use client";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, ExternalLink, Download } from "lucide-react";
import ModelView from "./ModelView";

export default function HomePage({ startAnimation }) {
  const [index, setIndex] = useState(0);
  const [article, setArticle] = useState("a");
  const prevArticleRef = useRef("a");

  const skills = [
    { title: "Frontend Developer", article: "a", desc: "Crafting responsive and accessible interfaces.", icon: "🎨" },
    { title: "Frontend QA Engineer", article: "a", desc: "Ensuring pixel-perfect and bug-free experiences.", icon: "🧪" },
    { title: "UI/UX Designer", article: "a", desc: "Focusing on user-centric design and interactions.", icon: "🖋️" },
    { title: "Systems Engineer", article: "a", desc: "Optimizing low-level system performance.", icon: "⚙️" },
    { title: "Machine Learning Engineer", article: "an", desc: "Developing scalable AI and ML pipelines.", icon: "🤖" },
    { title: "Network App Developer", article: "a", desc: "Building robust high-performance network protocols.", icon: "🌐" },
    { title: "Distributed Systems Eng", article: "a", desc: "Architecting resilient and scalable clusters.", icon: "☁️" },
    { title: "Full-stack Developer", article: "a", desc: "Building end-to-end web applications.", icon: "💻" },
    { title: "Blockchain Enthusiast", article: "a", desc: "Exploring decentralized cryptographic systems.", icon: "⛓️" },
    { title: "AI Engineer", article: "an", desc: "Designing intelligent autonomous agents.", icon: "🧠" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        const nextIndex = (prev + 1) % skills.length;
        const nextArticle = skills[nextIndex].article;
        if (nextArticle !== prevArticleRef.current) {
          setArticle(nextArticle);
          prevArticleRef.current = nextArticle;
        }
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center bg-orange-600/[0.03] overflow-hidden">
      {/* Container forced to flex row on large screens to keep ModelView on the right */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-8 px-6 sm:px-12 py-10 z-10">
        
        {/* Content Column */}
        <div className="flex-1 flex flex-col items-start font-jetbrains-mono w-full xl:max-w-xl">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 leading-tight">
            Hi, I&apos;m <AnimatePresence mode="wait">
              <motion.span 
                key={article}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-orange-600 lowercase"
              >
                {article}
              </motion.span>
            </AnimatePresence>
          </h1>

          <div className="w-full bg-[#FFF9F5] border border-orange-200/50 rounded-2xl shadow-xl overflow-hidden mb-6">
            <div className="px-4 py-3 border-b border-orange-200/30 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-2 text-[10px] uppercase font-bold text-orange-800/40 tracking-wider">Srikar_Expertise_Feed.app</div>
            </div>

            <div className="relative h-[130px] px-6 overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  className="absolute inset-x-6 py-6 flex gap-4 items-center"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white border border-orange-100 flex items-center justify-center text-xl shadow-sm">
                    {skills[index].icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{skills[index].title}</h3>
                    <p className="text-sm text-slate-600 leading-tight mt-0.5">{skills[index].desc}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <p className="text-gray-700 text-sm max-w-xl mb-8 leading-relaxed">
            Designing scalable backend architectures, REST APIs, and AI-integrated solutions.
            <br />
            Building resilient software systems with real-time workflows and smooth user experiences.
          </p>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-wrap items-center gap-4">
                <motion.a href="#projects" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-black bg-white text-black font-semibold px-6 py-3 transition-all duration-300">
                <span className="absolute inset-x-0 bottom-0 h-0 bg-orange-600 transition-all duration-300 ease-out group-hover:h-full" />
                <ExternalLink size={18} className="relative z-10 group-hover:text-white" />
                <span className="relative z-10 transition-colors duration-300 ease-out group-hover:text-white">View Projects</span>
                </motion.a>
                <motion.a href="/resume/srikar_resume.pdf" download className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-black bg-black text-white font-semibold px-6 py-3 transition-all duration-300">
                <span className="absolute inset-x-0 bottom-0 h-0 bg-orange-600 transition-all duration-300 ease-out group-hover:h-full" />
                <Download size={18} className="relative z-10" />
                <span className="relative z-10 transition-colors duration-300 ease-out">Download Resume</span>
                </motion.a>
            </div>
            <div className="flex gap-4">
                <a href="https://github.com/BenikamSrikar" target="_blank" className="p-3 bg-black text-white rounded-full hover:bg-orange-600 transition-colors">
                    <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/benikam-srikar-81987429b/" target="_blank" className="p-3 bg-[#0A66C2] text-white rounded-full hover:bg-orange-600 transition-colors">
                    <Linkedin size={20} />
                </a>
            </div>
          </div>
        </div>

        {/* ModelView Column - Forced to stay on right on large screens */}
        <div className="w-full xl:w-[60%] h-[400px] xl:h-[700px] flex items-center justify-center">
          <ModelView startAnimation={true} staticMode={false} useVideoTexture={true} />
        </div>
      </div>
    </section>
  );
}