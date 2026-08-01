"use client";
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Layout, Database, Cpu, Cloud, Palette } from 'lucide-react';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const skillData = [
  { title: "Frontend", icon: <Layout size={20} />, skills: [{ name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB' }, { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/000000' }, { name: 'Tailwind', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' }] },
  { title: "Backend", icon: <Database size={20} />, skills: [{ name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/339933' }, { name: 'Express', logo: 'https://cdn.simpleicons.org/express/000000' }, { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1' }, { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A033' }] },
  { title: "AI / ML", icon: <Cpu size={20} />, skills: [{ name: 'PyTorch', logo: 'https://cdn.simpleicons.org/pytorch/EE4C2C' }, { name: 'TensorFlow', logo: 'https://cdn.simpleicons.org/tensorflow/FF6F00' }] },
  { title: "Infrastructure", icon: <Cloud size={20} />, skills: [{ name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032' }, { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED' }, { name: 'AWS', logo: 'https://cdn.simpleicons.org/amazonaws/FF9900' }] },
  { title: "Creative", icon: <Palette size={20} />, skills: [{ name: 'Blender', logo: 'https://cdn.simpleicons.org/blender/F5792A' }, { name: 'After Effects', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg' }] }
];

export default function ToolsandFrameworks() {
  const containerRef = useRef(null);
  const headerRef = useRef([]);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation - simpler, faster
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.03, 
          ease: "power2.out",
          scrollTrigger: { 
            trigger: "#tools-header", 
            start: "top 85%",
            once: true
          }
        }
      );

      // Card Animations - simplified
      cardRefs.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: { 
                trigger: card, 
                start: "top 90%",
                once: true
              }
            }
          );
        }
      });
    }, containerRef);

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const headerText = "TOOLS & FRAMEWORKS";

  return (
    <section ref={containerRef} id="toolsandframeworks" className="min-h-screen bg-orange-600/[0.03] py-24 px-8 flex flex-col items-center">
      
      <div id="tools-header" className="mb-24 px-10 overflow-hidden">
        <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter uppercase">
          <TextReveal text="TOOLS & FRAMEWORKS" className="justify-center text-orange-600" />
        </h2>
      </div>

      <div className="w-full max-w-5xl space-y-8 pb-32">
        {skillData.map((data, i) => (
          <div key={data.title} ref={el => cardRefs.current[i] = el} className="bg-white p-10 rounded-[2rem] border border-black/5 shadow-xl flex items-center gap-10">
            <div className="w-48 shrink-0 flex items-center gap-4 font-bold text-slate-800 text-lg">
              <div className="p-4 bg-orange-600/5 rounded-2xl text-orange-600">{data.icon}</div>
              {data.title}
            </div>

            <div className="flex-1 flex flex-wrap gap-4 border-l border-black/5 pl-10">
              {data.skills.map((skill) => (
                <div key={skill.name} className="group relative px-5 py-3 rounded-2xl border border-black/5 hover:border-orange-600 bg-slate-50 transition-all flex items-center gap-3">
                  <img src={skill.logo} alt={skill.name} className="w-6 h-6 object-contain" />
                  <span className="font-semibold text-slate-700 text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}