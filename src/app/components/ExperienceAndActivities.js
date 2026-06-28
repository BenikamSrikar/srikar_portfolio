"use client";
import { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Layout, 
  Grid,
  Sliders,
  RefreshCw
} from "lucide-react";

const initialCertifications = [
  { id: 1, image: "/images/activities/Hack2skill-Certificate.png", title: "Hack2Skill Certificate" },
  { id: 2, image: "/images/activities/nc_ai_ncat_participation_may_2026_page-0001.jpg", title: "NC AI NCAT Participation" },
  { id: 3, image: "/images/activities/Hackathon.png", title: "Hackathon" }
];

const initialTechnicalCerts = [
  { id: "c1", image: "/images/certs/deloitte.png", title: "Deloitte Certificate" },
  { id: "c2", image: "/images/certs/Oracle1.png", title: "Oracle Certificate 1" },
  { id: "c3", image: "/images/certs/Oracle2.png", title: "Oracle Certificate 2" },
  { id: "c4", image: "/images/certs/mongoDB.png", title: "MongoDB Certificate" }
];

export default function ExperienceAndActivities() {
  // Activities Marquee Carousel State
  const [isPlaying, setIsPlaying] = useState(true);
  const [translateX, setTranslateX] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Keynote Studio Dynamic Certification State
  const [technicalCerts, setTechnicalCerts] = useState(() => {
    // Attempt loading session cached layout before reload fallback
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("keynote_certs_layout");
      if (stored) return JSON.parse(stored);
    }
    return initialTechnicalCerts;
  });

  // Keynote Engine States
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isKeynotePlaying, setIsKeynotePlaying] = useState(false);
  const [keynoteViewMode, setKeynoteViewMode] = useState("slide"); // "slide" | "light-table"
  const [transitionDirection, setTransitionDirection] = useState("horizontal"); 
  const [slideTriggerKey, setSlideTriggerKey] = useState(0);
  
  // Light Table Selection Index Track for Swapping Positions
  const [selectedSwapIdx, setSelectedSwapIdx] = useState(null);

  // Persist local reordered arrays inside current session tab
  useEffect(() => {
    sessionStorage.setItem("keynote_certs_layout", JSON.stringify(technicalCerts));
  }, [technicalCerts]);

  // Activities Marquee Loop Scheduler
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setAnimationProgress((prev) => (prev + 1 >= 100 ? 0 : prev + 1));
    }, 350);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) setTranslateX(-(animationProgress / 2));
  }, [animationProgress, isPlaying]);

  // Keynote Presenter Play Loop
  useEffect(() => {
    if (!isKeynotePlaying) return;
    const interval = setInterval(() => {
      setTransitionDirection("horizontal");
      setSlideTriggerKey(prev => prev + 1);
      setActiveSlideIdx((prev) => (prev + 1) % technicalCerts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isKeynotePlaying, technicalCerts.length]);

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const goToPrevious = () => setTranslateX((prev) => Math.min(prev + 5, 0));
  const goToNext = () => setTranslateX((prev) => Math.max(prev - 5, -50));

  // Sidebar Selection Handler
  const handleSidebarSelect = (idx) => {
    if (idx === activeSlideIdx) return;
    setIsKeynotePlaying(false);
    setTransitionDirection("vertical");
    setSlideTriggerKey(prev => prev + 1);
    setActiveSlideIdx(idx);
  };

  // Inline Layout Navigation Controls
  const handleArrowNavigation = (direction) => {
    setIsKeynotePlaying(false);
    setTransitionDirection("horizontal");
    setSlideTriggerKey(prev => prev + 1);
    if (direction === "prev") {
      setActiveSlideIdx((prev) => (prev === 0 ? technicalCerts.length - 1 : prev - 1));
    } else {
      setActiveSlideIdx((prev) => (prev === technicalCerts.length - 1 ? 0 : prev + 1));
    }
  };

  // Interactive Swap Engine Action
  const handleLightTableClick = (index) => {
    if (selectedSwapIdx === null) {
      // Step 1: Select the initial card to arrange
      setSelectedSwapIdx(index);
    } else {
      // Step 2: Swap items positions securely
      if (selectedSwapIdx !== index) {
        const customOrder = [...technicalCerts];
        const temp = customOrder[selectedSwapIdx];
        customOrder[selectedSwapIdx] = customOrder[index];
        customOrder[index] = temp;
        setTechnicalCerts(customOrder);
        
        // Synchronize display frame pointer context
        if (activeSlideIdx === selectedSwapIdx) setActiveSlideIdx(index);
        else if (activeSlideIdx === index) setActiveSlideIdx(selectedSwapIdx);
      }
      setSelectedSwapIdx(null); // Clear toggle selection lock
    }
  };

  return (
    <div 
      id="activities" 
      className="w-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 text-slate-800 py-20 px-4 sm:px-6 md:px-10 lg:px-20 font-sans"
    >
      <style>{`
        @keyframes slideLeftInfinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ambientGlow {
          0%, 100% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.15), 0 4px 20px rgba(0, 0, 0, 0.05); }
          50% { box-shadow: 0 0 60px rgba(59, 130, 246, 0.25), 0 8px 30px rgba(0, 0, 0, 0.1); }
        }
        .carousel-container { animation: ambientGlow 4s ease-in-out infinite; }
        .slide-track { display: flex; gap: 32px; width: 200%; padding: 20px; transform: translateX(var(--translate-x, 0%)); transition: transform 0.5s ease-in-out; }
        .slide-track.playing { animation: slideLeftInfinite 35s linear infinite; transition: none; }
        .slide-item { flex: 0 0 calc(50% / 3); display: flex; align-items: center; justify-content: center; min-height: 260px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); border: 1px solid rgba(0,0,0,0.04); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); aspect-ratio: 16/9; padding: 16px; overflow: hidden; }
        .slide-item img { width: 100%; height: 100%; object-fit: contain; border-radius: 8px; }
        .slide-item:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 20px 35px rgba(0, 0, 0, 0.08); }

        @keyframes keynoteSlideUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes keynoteSlideLeft {
          0% { opacity: 0; transform: translateX(40px) scale(0.99); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-slide-v { animation: keynoteSlideUp 0.55s cubic-bezier(0.25, 1, 0.5, 1) both; }
        .animate-slide-h { animation: keynoteSlideLeft 0.55s cubic-bezier(0.25, 1, 0.5, 1) both; }
      `}</style>

      {/* ── SECTION 1: ACTIVITIES ────────────────────────────────────────── */}
      <div className="text-center mb-12 max-w-6xl mx-auto">
        <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">
          Credentials & Engagement
        </span>
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
          <span className="text-blue-600">Activities</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto mb-28">
        <div className="carousel-container relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80">
          <div className={`slide-track ${isPlaying ? 'playing' : ''}`} style={{ '--translate-x': `${translateX}%` }}>
            {initialCertifications.map((cert) => (
              <div key={`1-${cert.id}`} className="slide-item">
                <img src={cert.image} alt={cert.title} />
              </div>
            ))}
            {initialCertifications.map((cert) => (
              <div key={`2-${cert.id}`} className="slide-item">
                <img src={cert.image} alt={cert.title} />
              </div>
            ))}
          </div>

          {!isPlaying && (
            <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full shadow-md transition-all active:scale-95">
              <ChevronLeft size={22} />
            </button>
          )}
          {!isPlaying && (
            <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full shadow-md transition-all active:scale-95">
              <ChevronRight size={22} />
            </button>
          )}

          <button onClick={togglePlayPause} className="absolute bottom-5 right-5 z-20 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full shadow-md transition-all active:scale-95">
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <div className="absolute bottom-5 left-5 z-20 text-[11px] text-white font-mono bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
            {isPlaying ? "● LIVE RUNNING" : "■ STREAM STOPPED"}
          </div>
        </div>
      </div>

      {/* ── SECTION 2: TECHNICAL CERTIFICATIONS (macOS Keynote Style) ────── */}
      <div className="text-center mb-12 max-w-6xl mx-auto">
        <span className="text-purple-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">
          Academic & Corporate Assurances
        </span>
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
          <span className="text-purple-600">Technical Certifications</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="w-full bg-[#f5f5f7] rounded-2xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col h-[75vh] min-h-[580px] transition-all duration-500">
          
          {/* macOS Title Control Header */}
          <div className="h-14 bg-[#e1e1e3] border-b border-slate-300 px-4 flex items-center justify-between select-none flex-shrink-0">
            <div className="flex items-center gap-1.5 w-1/4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700 w-2/4">
              <span className="bg-purple-600 text-white text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider">KEYNOTE</span>
              <span className="truncate">Technical_Credentials_2026.key</span>
            </div>

            <div className="w-1/4 flex justify-end gap-2">
              <button 
                onClick={() => {
                  setKeynoteViewMode("slide");
                  setIsKeynotePlaying(!isKeynotePlaying);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold border transition-all ${
                  isKeynotePlaying 
                    ? "bg-purple-600 border-purple-700 text-white shadow-sm"
                    : "bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-sm"
                }`}
              >
                {isKeynotePlaying ? <Pause size={12} className="fill-current" /> : <Play size={12} className="fill-current" />}
                <span className="hidden sm:inline">{isKeynotePlaying ? "Pause Setup" : "Play Presentation"}</span>
              </button>
            </div>
          </div>

          {/* Keynote App Navigation Bar Submenu */}
          <div className="h-11 bg-[#ededf0] border-b border-slate-200 px-4 flex items-center gap-6 text-slate-500 text-xs font-medium select-none flex-shrink-0">
            <button 
              onClick={() => { setIsKeynotePlaying(false); setKeynoteViewMode("slide"); }}
              className={`flex items-center gap-1 h-full px-1 border-b-2 transition-all ${
                keynoteViewMode === "slide" ? "text-purple-600 font-bold border-purple-600" : "border-transparent hover:text-slate-700"
              }`}
            >
              <Layout size={14} /> Navigator View
            </button>
            
            <button 
              onClick={() => { setIsKeynotePlaying(false); setKeynoteViewMode("light-table"); }}
              className={`flex items-center gap-1 h-full px-1 border-b-2 transition-all ${
                keynoteViewMode === "light-table" ? "text-purple-600 font-bold border-purple-600" : "border-transparent hover:text-slate-700"
              }`}
            >
              <Grid size={14} /> Light Table Mode
            </button>

            <div className="flex items-center gap-1 opacity-40 cursor-not-allowed">
              <Sliders size={14} /> Inspector
            </div>

            <div className="ml-auto text-[10px] font-mono font-bold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded">
              {keynoteViewMode === "light-table" ? "Click two cards to swap position" : `Slide ${activeSlideIdx + 1} / ${technicalCerts.length}`}
            </div>
          </div>

          {/* Workspace Content Display Area */}
          <div className="flex flex-1 overflow-hidden w-full relative bg-white">
            
            {keynoteViewMode === "light-table" ? (
              /* NATIVE MAC LIGHT TABLE VIEW W/ DRAG POSITION SWAPPING */
              <div className="flex-1 bg-[#1e1e1f] p-8 overflow-y-auto select-none">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                  {technicalCerts.map((cert, index) => {
                    const isTargetSwap = selectedSwapIdx === index;
                    return (
                      <div 
                        key={cert.id}
                        onClick={() => handleLightTableClick(index)}
                        className={`group flex flex-col gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                          isTargetSwap
                            ? "bg-amber-500/20 border-amber-500 ring-4 ring-amber-500/40 scale-[1.03]"
                            : activeSlideIdx === index 
                              ? "bg-purple-600/10 border-purple-500 ring-2 ring-purple-500/30" 
                              : "bg-neutral-900 border-neutral-800 hover:border-neutral-600"
                        }`}
                      >
                        <div className="aspect-[14/10] bg-white rounded-lg p-2 flex items-center justify-center overflow-hidden shadow-md">
                          <img src={cert.image} alt="" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="flex items-center justify-between px-1">
                          <div className="flex items-center gap-2 truncate">
                            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isTargetSwap ? "bg-amber-500 text-black" : "bg-neutral-800 text-neutral-500"}`}>
                              {index + 1}
                            </span>
                            <span className="text-xs font-bold text-neutral-300 truncate group-hover:text-white">
                              {cert.title}
                            </span>
                          </div>
                          {isTargetSwap && (
                            <span className="text-[9px] uppercase font-black text-amber-400 tracking-wide animate-pulse flex items-center gap-1">
                              <RefreshCw size={8} className="animate-spin" /> Swap
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* NAVIGATOR STUDIO (WHITE CENTRAL VIEWPORT CANVAS) */
              <>
                {/* Left Navigator Sidebar Track */}
                <div className={`bg-[#ebebeb] border-r border-slate-300 overflow-y-auto p-3 space-y-3 select-none flex-shrink-0 transition-all duration-500 ease-in-out ${
                  isKeynotePlaying ? "w-0 opacity-0 p-0 pointer-events-none border-r-0" : "w-48 sm:w-56 opacity-100"
                }`}>
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1 px-4">Slides</div>
                  {technicalCerts.map((cert, index) => {
                    const isActive = activeSlideIdx === index;
                    return (
                      <div
                        key={cert.id}
                        onClick={() => handleSidebarSelect(index)}
                        className="flex gap-2 items-start cursor-pointer group"
                      >
                        <span className={`text-[10px] font-mono font-bold w-4 text-right mt-2 ${isActive ? "text-purple-600 font-black" : "text-slate-400"}`}>
                          {index + 1}
                        </span>
                        <div className={`flex-1 aspect-[16/10] rounded-lg bg-white border overflow-hidden p-2 flex items-center justify-center transition-all shadow-sm ${
                          isActive 
                            ? "border-2 border-purple-600 ring-2 ring-purple-600/20 scale-[0.98]" 
                            : "border-slate-300 group-hover:border-slate-400"
                        }`}>
                          <img src={cert.image} alt="" className="w-full h-full object-contain pointer-events-none rounded-sm" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Main Content Workspace Viewport (Forced High Contrast White) */}
                <div className="flex-1 bg-[#ffffff] relative flex flex-col overflow-hidden p-4 sm:p-8 justify-center group select-none border-l border-neutral-100">
                  
                  {/* Presentation Overlay Direction Arrows */}
                  {!isKeynotePlaying && (
                    <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between items-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleArrowNavigation("prev")}
                        className="p-2.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-800 transition-all pointer-events-auto shadow-sm backdrop-blur-sm active:scale-95 border border-slate-200"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => handleArrowNavigation("next")}
                        className="p-2.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-800 transition-all pointer-events-auto shadow-sm backdrop-blur-sm active:scale-95 border border-slate-200"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}

                  {/* High Quality Presentation Frame Projection Workspace */}
                  <div className="w-full h-full flex items-center justify-center p-2 overflow-hidden relative">
                    <img
                      key={`${slideTriggerKey}-${activeSlideIdx}`}
                      src={technicalCerts[activeSlideIdx]?.image}
                      alt={technicalCerts[activeSlideIdx]?.title}
                      className={`max-w-full max-h-full object-contain rounded-md shadow-xl border border-slate-200/60 bg-white p-2 sm:p-4 transition-all duration-500 ${
                        transitionDirection === "vertical" ? "animate-slide-v" : "animate-slide-h"
                      }`}
                    />
                  </div>

                  {/* Mini Map Navigation Track Bullets */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-slate-900/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/50">
                    {technicalCerts.map((_, index) => (
                      <div 
                        key={index} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${activeSlideIdx === index ? "w-4 bg-purple-600" : "w-1.5 bg-slate-400"}`}
                      />
                    ))}
                  </div>

                </div>
              </>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}