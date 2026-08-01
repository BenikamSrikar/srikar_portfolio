"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Layout, Database, Cpu, Cloud, Palette, BookOpen, Code2 } from 'lucide-react';
import TextReveal from './TextReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const skillData = [
  {
    title: "Core CS Knowledge",
    icon: <BookOpen size={20} />,
    skills: [
      { name: 'DSA', logo: 'https://cdn.simpleicons.org/leetcode/FFA116' },
      { name: 'DBMS', logo: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'Operating Systems', logo: 'https://cdn.simpleicons.org/linux/FCC624' },
      { name: 'Computer Networks', logo: 'https://cdn.simpleicons.org/wifi/000000' },
      { name: 'Machine Learning', logo: 'https://cdn.simpleicons.org/scikitlearn/F7931E' },
      { name: 'Deep Learning', logo: 'https://cdn.simpleicons.org/pytorch/EE4C2C' },
      { name: 'Software Project Management', logo: 'https://cdn.simpleicons.org/jira/0052CC' }
    ]
  },
  {
    title: "Productive Development Skills",
    icon: <Code2 size={20} />,
    skills: [
      { name: 'Web Development', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'App Development', logo: 'https://cdn.simpleicons.org/flutter/02569B' },
      { name: 'ML-Model Development', logo: 'https://cdn.simpleicons.org/tensorflow/FF6F00' }
    ]
  },
  {
    title: "Creative Skills",
    icon: <Palette size={20} />,
    skills: [
      { name: 'Video Compositing', logo: 'https://cdn.simpleicons.org/adobepremierepro/9999FF' },
      { name: 'Match Moving', logo: 'https://cdn.simpleicons.org/blender/F5792A' },
      { name: 'Camera Tracking', logo: 'https://cdn.simpleicons.org/autodesk/06A6D7' },
      { name: 'Model Texturing', logo: 'https://cdn.simpleicons.org/substancedesigner/000000' },
      { name: 'Animation', logo: 'https://cdn.simpleicons.org/adobeaftereffects/9999FF' }
    ]
  }
];

export default function Skills() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section id="skills" className="min-h-screen bg-orange-600/[0.03] py-24 px-8 flex flex-col items-center">
      
      <div id="skills-header" className="mb-24 px-10 overflow-hidden">
        <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter uppercase">
          <TextReveal text="SKILLS" className="justify-center text-orange-600" />
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
                <div key={skill.name} className="group relative px-5 py-3 rounded-2xl border border-black/5 hover:border-orange-600 bg-slate-50 transition-all">
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