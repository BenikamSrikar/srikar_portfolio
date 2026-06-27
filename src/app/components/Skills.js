'use client';
import { useEffect, useRef, useState } from 'react';
import { Terminal, Layout, Database, Cpu, Cloud, Box, Film, Palette, Scissors, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const skillData = {
  'Languages': {
    icon: <Terminal size={14} />, bg: '#e8f0fe', border: '#93c5fd',
    skills: [
      { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
      { name: 'TypeScript',  logo: 'https://cdn.simpleicons.org/typescript/3178C6' },
      { name: 'Python',      logo: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'C++',         logo: 'https://cdn.simpleicons.org/cplusplus/00599C' },
    ],
  },
  'Frontend': {
    icon: <Layout size={14} />, bg: '#eff6ff', border: '#bfdbfe',
    skills: [
      { name: 'React',    logo: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Next.js',  logo: 'https://cdn.simpleicons.org/nextdotjs/000000' },
      { name: 'Tailwind', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    ],
  },
  'Backend': {
    icon: <Database size={14} />, bg: '#f0f7ff', border: '#93c5fd',
    skills: [
      { name: 'Node.js',    logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
      { name: 'Express',    logo: 'https://cdn.simpleicons.org/express/000000' },
      { name: 'Socket.IO',  logo: 'https://cdn.simpleicons.org/socketdotio/000000' },
      { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'MongoDB',    logo: 'https://cdn.simpleicons.org/mongodb/47A033' },
      { name: 'REST APIs',  logo: 'https://cdn.simpleicons.org/insomnia/5849b3' },
    ],
  },
  'AI / ML': {
    icon: <Cpu size={14} />, bg: '#faf5ff', border: '#d8b4fe',
    skills: [
      { name: 'PyTorch',    logo: 'https://cdn.simpleicons.org/pytorch/EE4C2C' },
      { name: 'TensorFlow', logo: 'https://cdn.simpleicons.org/tensorflow/FF6F00' },
    ],
  },
  'Tools & Infra': {
    icon: <Cloud size={14} />, bg: '#f0fdf9', border: '#6ee7b7',
    skills: [
      { name: 'Git',      logo: 'https://cdn.simpleicons.org/git/F05032' },
      { name: 'Docker',   logo: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'AWS',      logo: 'https://cdn.simpleicons.org/amazonaws/FF9900' },
      { name: 'Supabase', logo: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
      { name: 'WebRTC',   logo: 'https://cdn.simpleicons.org/webrtc/333333' },
      { name: 'Linux',    logo: 'https://cdn.simpleicons.org/linux/FCC624' },
      { name: 'GCloud',   logo: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
    ],
  },
};

export default function Skills() {
  const [isMobile, setIsMobile] = useState(false);
  
  // State handling accordions for mobile view (initially all closed)
  const [openSections, setOpenSections] = useState({
    tech: true,
    creative: false,
    soft: false,
  });

  const sectionRef = useRef(null);
  const techStackRef = useRef(null);
  const softSkillsRef = useRef(null);
  const containersRef = useRef(null);
  const titleBarRef = useRef(null);
  const bottomBarRef = useRef(null);
  const softSkillsTitleBarRef = useRef(null);
  const softSkillsBottomBarRef = useRef(null);
  const creativeSkillsRef = useRef(null);
  const creativeSkillsTitleBarRef = useRef(null);
  const creativeSkillsBottomBarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const section  = sectionRef.current;
    const techStack = techStackRef.current;
    const softSkills = softSkillsRef.current;
    const containers = containersRef.current;
    const titleBar = titleBarRef.current;
    const bottomBar = bottomBarRef.current;
    const softTitleBar = softSkillsTitleBarRef.current;
    const softBottomBar = softSkillsBottomBarRef.current;
    const creativeSkills = creativeSkillsRef.current;
    const creativeTitleBar = creativeSkillsTitleBarRef.current;
    const creativeBottomBar = creativeSkillsBottomBarRef.current;
    
    if (!section || !techStack || !softSkills || !containers) return;

    gsap.set(techStack, { scale: 1, borderRadius: '24px', transformOrigin: 'center center' });
    gsap.set(softSkills, { opacity: 0, y: '100%', x: 0 });
    gsap.set(creativeSkills, { opacity: 0, y: '100%', x: 0 });
    gsap.set(titleBar, { opacity: 1 });
    gsap.set(bottomBar,{ opacity: 1 });
    gsap.set(softTitleBar, { opacity: 0 });
    gsap.set(softBottomBar, { opacity: 0 });
    gsap.set(creativeTitleBar, { opacity: 0 });
    gsap.set(creativeBottomBar, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * 1.8}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to({}, { duration: 0.15 }, 0);

    tl.to(softSkills, {
      opacity: 1,
      y: '10%',
      duration: 0.3,
      ease: 'power2.out',
    }, 0.15);

    tl.to(softTitleBar,  { opacity: 1, duration: 0.2, ease: 'power2.out' }, 0.25);
    tl.to(softBottomBar, { opacity: 1, duration: 0.2, ease: 'power2.out' }, 0.25);

    tl.to(creativeSkills, {
      opacity: 1,
      y: '20%',
      duration: 0.3,
      ease: 'power2.out',
    }, 0.45);

    tl.to(creativeTitleBar,  { opacity: 1, duration: 0.2, ease: 'power2.out' }, 0.55);
    tl.to(creativeBottomBar, { opacity: 1, duration: 0.2, ease: 'power2.out' }, 0.55);

    tl.to({}, { duration: 0.25 }, 0.75);

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [isMobile]);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (isMobile) {
    return (
      <div id="skills" className="bg-[#f0f4ff] font-sans py-16 px-4 min-h-screen">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2 mb-10 text-center">
          <span className="text-3xl font-black italic tracking-tighter uppercase text-blue-600">
            Skills
          </span>
          <span className="text-3xl font-black italic tracking-tighter uppercase text-slate-900">
            & Technologies
          </span>
        </div>

        {/* Content Wrapper */}
        <div className="max-w-2xl mx-auto space-y-4">
          
          {/* Tech Stack Accordion Section */}
          <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">
            <button 
              onClick={() => toggleSection('tech')}
              className="w-full flex items-center justify-between p-5 text-left font-black text-xs tracking-[0.25em] text-blue-500 uppercase hover:bg-slate-50 transition-colors"
            >
              <span>TECH STACK</span>
              <ChevronDown size={18} className={`transform transition-transform duration-200 text-slate-400 ${openSections.tech ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openSections.tech ? 'max-h-[2000px] border-t border-slate-100 p-5 md:p-6' : 'max-h-0'}`}>
              <div className="space-y-6">
                {Object.entries(skillData).map(([category, data]) => (
                  <div key={category} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-md text-blue-700 bg-blue-50">
                        {data.icon}
                      </span>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-700">
                        {category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-blue-50/20"
                          style={{ borderColor: data.border }}
                        >
                          <img src={skill.logo} alt={skill.name} className="w-4 h-4 object-contain" />
                          <span className="text-[11px] font-semibold text-slate-700">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Creative Skill Stack Accordion Section */}
          <div className="bg-white border border-amber-100 rounded-2xl shadow-sm overflow-hidden">
            <button 
              onClick={() => toggleSection('creative')}
              className="w-full flex items-center justify-between p-5 text-left font-black text-xs tracking-[0.25em] text-amber-500 uppercase hover:bg-slate-50 transition-colors"
            >
              <span>CREATIVE SKILLS</span>
              <ChevronDown size={18} className={`transform transition-transform duration-200 text-slate-400 ${openSections.creative ? 'rotate-180' : ''}`} />
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openSections.creative ? 'max-h-[1500px] border-t border-slate-100 p-5 md:p-6' : 'max-h-0'}`}>
              <div className="grid grid-cols-1 gap-4">
                <div className="border-b border-slate-100 pb-4">
                  <h4 className="text-xs font-black uppercase text-slate-700 mb-2">3D Animation</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-200 bg-amber-50/20">
                      <img src="https://cdn.simpleicons.org/blender/F5792A" alt="Blender" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700">Blender</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-200 bg-amber-50/20">
                      <img src="https://cdn.simpleicons.org/houdini/FF7A00" alt="Houdini" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700">Houdini</span>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-100 pb-4">
                  <h4 className="text-xs font-black uppercase text-slate-700 mb-2">Video Composition</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-violet-200 bg-violet-50/20">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg" alt="After Effects" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700">After Effects</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-violet-200 bg-violet-50/20">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Natron_icon.svg" alt="Natron" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700">Natron</span>
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-100 pb-4">
                  <h4 className="text-xs font-black uppercase text-slate-700 mb-2">Concept Art</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-pink-200 bg-pink-50/20">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg" alt="Photoshop" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700">Photoshop</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-pink-200 bg-pink-50/20">
                      <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/midjourney.png" alt="Midjourney" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700">Midjourney</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase text-slate-700 mb-2">Video Editing</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50/20">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg" alt="Premiere Pro" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700">Premiere Pro</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50/20">
                      <img src="https://cdn.simpleicons.org/davinciresolve/1A1A1A" alt="DaVinci Resolve" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700">DaVinci Resolve</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Soft Skills Accordion Section */}
          <div className="bg-white border border-purple-100 rounded-2xl shadow-sm overflow-hidden">
            <button 
              onClick={() => toggleSection('soft')}
              className="w-full flex items-center justify-between p-5 text-left font-black text-xs tracking-[0.25em] text-purple-500 uppercase hover:bg-slate-50 transition-colors"
            >
              <span>SOFT SKILLS</span>
              <ChevronDown size={18} className={`transform transition-transform duration-200 text-slate-400 ${openSections.soft ? 'rotate-180' : ''}`} />
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openSections.soft ? 'max-h-[1500px] border-t border-slate-100 p-5 md:p-6' : 'max-h-0'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Communication", desc: "Clear articulation of concepts to stakeholders" },
                  { title: "Group Discussion", desc: "Active team participation and collaboration" },
                  { title: "Problem Solving", desc: "Analytical approach to complex challenges" },
                  { title: "Teamwork", desc: "Collaborative mindset for collective goals" },
                  { title: "Adaptability", desc: "Quick learner with evolving requirements" },
                  { title: "Time Management", desc: "Efficient prioritization and scheduling" },
                  { title: "Leadership", desc: "Initiative to guide and mentor team members" },
                  { title: "Critical Thinking", desc: "Logical analysis and thoughtful decision making" }
                ].map((s) => (
                  <div key={s.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <h4 className="text-[11px] font-black text-slate-800 mb-1 uppercase tracking-wider">{s.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div
      id="skills"
      ref={sectionRef}
      className="bg-[#f0f4ff] font-sans"
      style={{ height: '100vh' }}
    >
      {/* Header */}
      <div className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 z-30 flex flex-col sm:flex-row items-center gap-2 sm:gap-8 px-4">
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter uppercase text-blue-600">
          Skills
        </span>
        <div className="hidden sm:block w-px h-8 bg-slate-300"></div>
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
          Technologies
        </span>
      </div>

      {/* Full-viewport scene */}
      <div
        className="relative w-full h-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Containers wrapper — holds both windows overlapping */}
        <div
          ref={containersRef}
          className="relative w-full h-full flex items-center justify-center pt-32"
        >
          <div className="relative w-full max-w-5xl h-[70vh] min-h-[600px] max-h-[800px] mt-8">
            {/* Tech Stack Window - Base layer */}
            <div
              ref={techStackRef}
              className="absolute inset-0 w-full h-full flex flex-col overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #ede9fe 100%)',
                boxShadow: '0 8px 40px rgba(37,99,235,0.16), 0 2px 8px rgba(37,99,235,0.10)',
                border: '2px solid #bfdbfe',
                borderRadius: '24px',
              }}
            >
              {/* Window title bar */}
              <div
                ref={titleBarRef}
                className="flex items-center justify-between px-6 py-3 border-b border-blue-200/60"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(8px)',
                  opacity: 0,
                }}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400">
                  TECH STACK REFERENCE
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                </div>
              </div>

              {/* Skill grid */}
              <div className="p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                {Object.entries(skillData).map(([category, data]) => (
                  <div
                    key={category}
                    className="rounded-2xl p-4 md:p-5"
                    style={{
                      background: 'rgba(255,255,255,0.74)',
                      backdropFilter: 'blur(12px)',
                      border: `1.5px solid ${data.border}`,
                      boxShadow: `0 2px 12px ${data.border}55`,
                    }}
                  >
                    <div
                      className="flex items-center gap-2 mb-3 pb-2.5 border-b"
                      style={{ borderColor: data.border }}
                    >
                      <span
                        className="flex items-center justify-center w-6 h-6 rounded-md text-blue-700"
                        style={{ background: data.bg }}
                      >
                        {data.icon}
                      </span>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-700">
                        {category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                          style={{
                            background: data.bg,
                            border: `1px solid ${data.border}`,
                            boxShadow: `2px 2px 0px ${data.border}`,
                          }}
                        >
                          <img src={skill.logo} alt={skill.name} className="w-4 h-4 object-contain" />
                          <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom strip */}
              <div
                ref={bottomBarRef}
                className="mt-auto px-6 py-2.5 flex items-center justify-center border-t border-blue-200/60"
                style={{ background: 'rgba(255,255,255,0.4)', opacity: 0 }}
              >
                <span className="text-[10px] font-bold tracking-widest text-blue-300 uppercase">
                  benikam.srikar · stack reference
                </span>
              </div>
            </div>

            {/* Soft Skills Window - Overlay layer */}
            <div
              ref={softSkillsRef}
              className="absolute inset-0 w-full h-full flex flex-col overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #ede9fe 100%)',
                boxShadow: '0 8px 40px rgba(37,99,235,0.16), 0 2px 8px rgba(37,99,235,0.10)',
                border: '2px solid #bfdbfe',
                borderRadius: '24px',
              }}
            >
              {/* Window title bar */}
              <div
                ref={softSkillsTitleBarRef}
                className="flex items-center justify-between px-6 py-3 border-b border-blue-200/60"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(8px)',
                  opacity: 0,
                }}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400">
                  SOFT SKILLS REFERENCE
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                </div>
              </div>

              {/* Soft Skills Grid */}
              <div className="p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                {[
                  { title: "Communication", desc: "Clear articulation of concepts to stakeholders", icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> },
                  { title: "Group Discussion", desc: "Active team participation and collaboration", icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg> },
                  { title: "Problem Solving", desc: "Analytical approach to complex challenges", icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path></svg> },
                  { title: "Teamwork", desc: "Collaborative mindset for collective goals", icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg> },
                  { title: "Adaptability", desc: "Quick learner with evolving requirements", icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline></svg> },
                  { title: "Time Management", desc: "Efficient prioritization and scheduling", icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> },
                  { title: "Leadership", desc: "Initiative to guide and mentor team members", icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v1H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-3V5a3 3 0 0 0-3-3z"></path><circle cx="12" cy="17" r="1"></circle></svg> },
                  { title: "Critical Thinking", desc: "Logical analysis and thoughtful decision making", icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl p-4 md:p-5"
                    style={{
                      background: 'rgba(255,255,255,0.74)',
                      backdropFilter: 'blur(12px)',
                      border: '1.5px solid #bfdbfe',
                      boxShadow: '0 2px 12px rgba(37,99,235,0.3)',
                    }}
                  >
                    <div
                      className="flex items-center gap-2 mb-3 pb-2.5 border-b"
                      style={{ borderColor: '#bfdbfe' }}
                    >
                      <span
                        className="flex items-center justify-center w-6 h-6 rounded-md text-blue-700"
                        style={{ background: '#e8f0fe' }}
                      >
                        {item.icon}
                      </span>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-700">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom strip */}
              <div
                ref={softSkillsBottomBarRef}
                className="mt-auto px-6 py-2.5 flex items-center justify-center border-t border-blue-200/60"
                style={{ background: 'rgba(255,255,255,0.4)', opacity: 0 }}
              >
                <span className="text-[10px] font-bold tracking-widest text-blue-300 uppercase">
                  benikam.srikar · soft skills reference
                </span>
              </div>
            </div>

            {/* Creative Skills Window - New overlay layer */}
            <div
              ref={creativeSkillsRef}
              className="absolute inset-0 w-full h-full flex flex-col overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #ede9fe 100%)',
                boxShadow: '0 8px 40px rgba(37,99,235,0.16), 0 2px 8px rgba(37,99,235,0.10)',
                border: '2px solid #bfdbfe',
                borderRadius: '24px',
              }}
            >
              {/* Window title bar */}
              <div
                ref={creativeSkillsTitleBarRef}
                className="flex items-center justify-between px-6 py-3 border-b border-blue-200/60"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(8px)',
                  opacity: 0,
                }}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400">
                  CREATIVE SKILL STACK REFERENCE
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                </div>
              </div>

              {/* Creative Skills Grid */}
              <div className="p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* 3D Animation */}
                <div
                  className="rounded-2xl p-4 md:p-5"
                  style={{
                    background: 'rgba(255,255,255,0.74)',
                    backdropFilter: 'blur(12px)',
                    border: '1.5px solid #fcd34d',
                    boxShadow: '0 2px 12px rgba(245,158,11,0.25)',
                  }}
                >
                  <div
                    className="flex items-center gap-2 mb-3 pb-2.5 border-b"
                    style={{ borderColor: '#fcd34d' }}
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-md text-amber-700 bg-amber-100">
                      <Box size={14} />
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-700">
                      3D Animation
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-amber-50/50"
                      style={{ borderColor: '#fcd34d', boxShadow: '2px 2px 0px #fcd34d' }}
                    >
                      <img src="https://cdn.simpleicons.org/blender/F5792A" alt="Blender" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">Blender</span>
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-amber-50/50"
                      style={{ borderColor: '#fcd34d', boxShadow: '2px 2px 0px #fcd34d' }}
                    >
                      <img src="https://cdn.simpleicons.org/houdini/FF7A00" alt="Houdini" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">SideFX Houdini</span>
                    </div>
                  </div>
                </div>

                {/* Video Composition */}
                <div
                  className="rounded-2xl p-4 md:p-5"
                  style={{
                    background: 'rgba(255,255,255,0.74)',
                    backdropFilter: 'blur(12px)',
                    border: '1.5px solid #ddd6fe',
                    boxShadow: '0 2px 12px rgba(139,92,246,0.25)',
                  }}
                >
                  <div
                    className="flex items-center gap-2 mb-3 pb-2.5 border-b"
                    style={{ borderColor: '#ddd6fe' }}
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-md text-violet-700 bg-violet-100">
                      <Film size={14} />
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-700">
                      Video Composition
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-violet-50/50"
                      style={{ borderColor: '#ddd6fe', boxShadow: '2px 2px 0px #ddd6fe' }}
                    >
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg" alt="After Effects" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">After Effects</span>
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-violet-50/50"
                      style={{ borderColor: '#ddd6fe', boxShadow: '2px 2px 0px #ddd6fe' }}
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Natron_icon.svg" alt="Natron" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">Natron</span>
                    </div>
                  </div>
                </div>

                {/* Concept Art */}
                <div
                  className="rounded-2xl p-4 md:p-5"
                  style={{
                    background: 'rgba(255,255,255,0.74)',
                    backdropFilter: 'blur(12px)',
                    border: '1.5px solid #fbcfe8',
                    boxShadow: '0 2px 12px rgba(236,72,153,0.25)',
                  }}
                >
                  <div
                    className="flex items-center gap-2 mb-3 pb-2.5 border-b"
                    style={{ borderColor: '#fbcfe8' }}
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-md text-pink-700 bg-pink-100">
                      <Palette size={14} />
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-700">
                      Concept Art
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-pink-50/50"
                      style={{ borderColor: '#fbcfe8', boxShadow: '2px 2px 0px #fbcfe8' }}
                    >
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg" alt="Photoshop" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">Photoshop</span>
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-pink-50/50"
                      style={{ borderColor: '#fbcfe8', boxShadow: '2px 2px 0px #fbcfe8' }}
                    >
                      <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/midjourney.png" alt="Midjourney" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">Midjourney</span>
                    </div>
                  </div>
                </div>

                {/* Video Editing */}
                <div
                  className="rounded-2xl p-4 md:p-5"
                  style={{
                    background: 'rgba(255, 255, 255, 1)',
                    backdropFilter: 'blur(12px)',
                    border: '1.5px solid #a7f3d0',
                    boxShadow: '0 2px 12px rgba(16,185,129,0.25)',
                  }}
                >
                  <div
                    className="flex items-center gap-2 mb-3 pb-2.5 border-b"
                    style={{ borderColor: '#a7f3d0' }}
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-md text-emerald-700 bg-emerald-100">
                      <Scissors size={14} />
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-700">
                      Video Editing
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-emerald-50/50"
                      style={{ borderColor: '#a7f3d0', boxShadow: '2px 2px 0px #a7f3d0' }}
                    >
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg" alt="Premiere Pro" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">Premiere Pro</span>
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-emerald-50/50"
                      style={{ borderColor: '#a7f3d0', boxShadow: '2px 2px 0px #a7f3d0' }}
                    >
                      <img src="https://cdn.simpleicons.org/davinciresolve/1A1A1A" alt="DaVinci Resolve" className="w-4 h-4 object-contain" />
                      <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">DaVinci Resolve</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom strip */}
              <div
                ref={creativeSkillsBottomBarRef}
                className="mt-auto px-6 py-2.5 flex items-center justify-center border-t border-blue-200/60"
                style={{ background: 'rgba(255, 255, 255, 1)', opacity: 0 }}
              >
                <span className="text-[10px] font-bold tracking-widest text-blue-300 uppercase">
                  benikam.srikar · creative skill stack reference
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}