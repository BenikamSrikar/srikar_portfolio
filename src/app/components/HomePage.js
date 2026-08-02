"use client";
import { useRef } from "react";
import { Github, Linkedin, ExternalLink, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import ModelView from "./ModelView";
import DecryptedText from "./DecryptedText";
import RotatingText from "./RotatingText";

export default function HomePage({ startAnimation }) {
  const containerRef = useRef(null);
  
  return (
    <section className="relative w-full min-h-screen flex items-center bg-orange-600/[0.03] overflow-hidden">
      {/* Container forced to flex row on large screens to keep ModelView on the right */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-8 px-6 sm:px-12 py-10 z-10">
        
        {/* Content Column */}
        <div ref={containerRef} className="flex-1 flex flex-col items-start font-jetbrains-mono w-full xl:max-w-xl">
          <div className="mb-8 w-full">
            {/* "Welcome to my" and "PORTFOLIO" */}
            <h1 className="font-bold text-black uppercase leading-tight">
              <DecryptedText
                text="WELCOME TO MY"
                speed={80}
                maxIterations={20}
                sequential={true}
                revealDirection="start"
                animateOn="view"
                className="text-3xl sm:text-4xl md:text-5xl"
                encryptedClassName="text-gray-400"
              />
              <br />
              <DecryptedText
                text="PORTFOLIO"
                speed={80}
                maxIterations={20}
                sequential={true}
                revealDirection="start"
                animateOn="view"
                className="text-orange-600 text-5xl sm:text-6xl md:text-7xl"
                encryptedClassName="text-orange-300"
              />
            </h1>
          </div>
          
          <div className="mb-8 flex items-center gap-3 flex-wrap">
            <span className="text-2xl sm:text-3xl font-semibold text-black">I&apos;m</span>
            <RotatingText
              texts={[
                'Frontend Developer',
                'UI/UX Designer', 
                'Full-stack Developer',
                'ML Engineer',
                'Systems Engineer'
              ]}
              mainClassName="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold text-xl sm:text-2xl"
              staggerFrom="first"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              staggerDuration={0.015}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              rotationInterval={3000}
            />
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
                <a href="#contact" className="p-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors">
                    <Mail size={20} />
                </a>
            </div>
          </div>
        </div>

        {/* ModelView Column - Forced to stay on right on large screens */}
        <div className="w-full xl:w-[60%] h-[400px] xl:h-[700px] flex items-center justify-center">
          <ModelView 
            startAnimation={true} 
            staticMode={false} 
            useVideoTexture={true}
          />
        </div>
      </div>
    </section>
  );
}