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
  RefreshCw,
  FolderLock,
  Award,
  SlidersHorizontal,
  Layers
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
  const [activeTab, setActiveTab] = useState("activities");
  
  // Toggle states managed individually per engine deck
  const [isActInspectorOpen, setIsActInspectorOpen] = useState(true);
  const [isTechInspectorOpen, setIsTechInspectorOpen] = useState(true);
  
  // Dynamic Canvas Styling States
  const [canvasBg, setCanvasBg] = useState("bg-white"); 
  const [gridCardScale, setGridCardScale] = useState("normal"); 

  // --- STATE SYSTEM 1: ACTIVITIES KEYNOTE ENGINE ---
  const [activitiesCerts, setActivitiesCerts] = useState(initialCertifications);
  const [activitiesActiveIdx, setActivitiesActiveIdx] = useState(0);
  const [isActivitiesPlaying, setIsActivitiesPlaying] = useState(false);
  const [activitiesViewMode, setActivitiesViewMode] = useState("slide"); 
  const [activitiesTransition, setActivitiesTransition] = useState("horizontal"); // horizontal | vertical | fade | cross
  const [activitiesTriggerKey, setActivitiesTriggerKey] = useState(0);
  const [activitiesSwapIdx, setActivitiesSwapIdx] = useState(null);

  // --- STATE SYSTEM 2: TECHNICAL KEYNOTE ENGINE ---
  const [technicalCerts, setTechnicalCerts] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("keynote_certs_layout");
      if (stored) return JSON.parse(stored);
    }
    return initialTechnicalCerts;
  });
  const [technicalActiveIdx, setTechnicalActiveIdx] = useState(0);
  const [isTechnicalPlaying, setIsTechnicalPlaying] = useState(false);
  const [technicalViewMode, setTechnicalViewMode] = useState("slide"); 
  const [technicalTransition, setTechnicalTransition] = useState("horizontal"); // horizontal | vertical | fade | cross
  const [technicalTriggerKey, setTechnicalTriggerKey] = useState(0);
  const [technicalSwapIdx, setTechnicalSwapIdx] = useState(null);

  // Colors database definitions
  const colorSwatches = [
    { id: "bg-white", hex: "#ffffff", label: "Pristine White" },
    { id: "bg-slate-50", hex: "#f8fafc", label: "Studio Light" },
    { id: "bg-slate-900", hex: "#0f172a", label: "Charcoal Dark" },
    { id: "bg-zinc-800", hex: "#27272a", label: "Apple Graphite" },
    { id: "bg-neutral-950", hex: "#0a0a0a", label: "Midnight Onyx" }
  ];

  // Persist local technical layout changes
  useEffect(() => {
    sessionStorage.setItem("keynote_certs_layout", JSON.stringify(technicalCerts));
  }, [technicalCerts]);

  // Autoplay loop hooks
  useEffect(() => {
    if (!isActivitiesPlaying) return;
    const interval = setInterval(() => {
      setActivitiesTriggerKey(prev => prev + 1);
      setActivitiesActiveIdx((prev) => (prev + 1) % activitiesCerts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isActivitiesPlaying, activitiesCerts.length]);

  useEffect(() => {
    if (!isTechnicalPlaying) return;
    const interval = setInterval(() => {
      setTechnicalTriggerKey(prev => prev + 1);
      setTechnicalActiveIdx((prev) => (prev + 1) % technicalCerts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isTechnicalPlaying, technicalCerts.length]);

  const handleActivitiesSwap = (index) => {
    if (activitiesSwapIdx === null) {
      setActivitiesSwapIdx(index);
    } else {
      if (activitiesSwapIdx !== index) {
        const updated = [...activitiesCerts];
        const temp = updated[activitiesSwapIdx];
        updated[activitiesSwapIdx] = updated[index];
        updated[index] = temp;
        setActivitiesCerts(updated);
        if (activitiesActiveIdx === activitiesSwapIdx) setActivitiesActiveIdx(index);
        else if (activitiesActiveIdx === index) setActivitiesActiveIdx(activitiesSwapIdx);
      }
      setActivitiesSwapIdx(null);
    }
  };

  const handleTechnicalSwap = (index) => {
    if (technicalSwapIdx === null) {
      setTechnicalSwapIdx(index);
    } else {
      if (technicalSwapIdx !== index) {
        const updated = [...technicalCerts];
        const temp = updated[technicalSwapIdx];
        updated[technicalSwapIdx] = updated[index];
        updated[index] = temp;
        setTechnicalCerts(updated);
        if (technicalActiveIdx === technicalSwapIdx) setTechnicalActiveIdx(index);
        else if (technicalActiveIdx === index) setTechnicalActiveIdx(technicalSwapIdx);
      }
      setTechnicalSwapIdx(null);
    }
  };

  const handleArrowNav = (engine, direction) => {
    if (engine === "activities") {
      setIsActivitiesPlaying(false);
      setActivitiesTriggerKey(prev => prev + 1);
      if (direction === "prev") {
        setActivitiesActiveIdx(prev => (prev === 0 ? activitiesCerts.length - 1 : prev - 1));
      } else {
        setActivitiesActiveIdx(prev => (prev === activitiesCerts.length - 1 ? 0 : prev + 1));
      }
    } else {
      setIsTechnicalPlaying(false);
      setTechnicalTriggerKey(prev => prev + 1);
      if (direction === "prev") {
        setTechnicalActiveIdx(prev => (prev === 0 ? technicalCerts.length - 1 : prev - 1));
      } else {
        setTechnicalActiveIdx(prev => (prev === technicalCerts.length - 1 ? 0 : prev + 1));
      }
    }
  };

  const getGridClass = () => {
    if (gridCardScale === "compact") return "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3";
    if (gridCardScale === "large") return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8";
    return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6";
  };

  // Helper targeting specific animation styles setup mapping
  const getAnimationClass = (style) => {
    if (style === "vertical") return "animate-slide-v";
    if (style === "fade") return "animate-slide-fade";
    if (style === "cross") return "animate-slide-cross";
    return "animate-slide-h";
  };

  return (
    <div id="activities" className="w-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 text-slate-800 py-20 px-4 sm:px-6 md:px-10 lg:px-20 font-sans overflow-hidden">
      <style>{`
        @keyframes keynoteSlideUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes keynoteSlideLeft {
          0% { opacity: 0; transform: translateX(40px) scale(0.99); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes keynoteFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes keynoteCross {
          0% { opacity: 0; transform: scale(1.03); filter: blur(4px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        .animate-slide-v { animation: keynoteSlideUp 0.55s cubic-bezier(0.25, 1, 0.5, 1) both; }
        .animate-slide-h { animation: keynoteSlideLeft 0.55s cubic-bezier(0.25, 1, 0.5, 1) both; }
        .animate-slide-fade { animation: keynoteFade 0.45s ease-in-out both; }
        .animate-slide-cross { animation: keynoteCross 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>

      {/* HEADER SECTION */}
      <div className="text-center mb-10 max-w-6xl mx-auto">
        <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Verified Verification Hub</span>
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900 mb-8">
          Credentials & <span className="text-blue-600">Engagement</span>
        </h2>

        {/* CUSTOM ANIMATED SLIDE TABS */}
        <div className="inline-flex relative bg-slate-200/80 p-1.5 rounded-xl border border-slate-300 shadow-inner max-w-full select-none">
          <div 
            className="absolute top-1.5 bottom-1.5 left-1.5 bg-white rounded-lg shadow-md border border-slate-300/40 transition-all duration-300 ease-out"
            style={{ width: "calc(50% - 12px)", transform: activeTab === "activities" ? "translateX(0)" : "translateX(100%)" }}
          />
          <button onClick={() => setActiveTab("activities")} className={`relative z-10 px-6 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-colors duration-200 flex items-center gap-2 ${activeTab === "activities" ? "text-slate-900" : "text-slate-500 hover:text-slate-800"}`}>
            <Award size={14} /> Activities
          </button>
          <button onClick={() => setActiveTab("technical")} className={`relative z-10 px-6 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-colors duration-200 flex items-center gap-2 ${activeTab === "technical" ? "text-slate-900" : "text-slate-500 hover:text-slate-800"}`}>
            <FolderLock size={14} /> Technical Certifications
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex transition-transform duration-500 ease-in-out will-change-transform" style={{ width: "200%", transform: activeTab === "activities" ? "translateX(0%)" : "translateX(-50%)" }}>
          
          {/* DECK A: ACTIVITIES */}
          <div className="w-1/2 pr-0 md:pr-2 transition-opacity duration-300 flex-shrink-0">
            <div className="w-full bg-[#f5f5f7] rounded-2xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col h-[75vh] min-h-[580px]">
              
              <div className="h-14 bg-[#e1e1e3] border-b border-slate-300 px-4 flex items-center justify-between select-none flex-shrink-0">
                <div className="flex items-center gap-1.5 w-1/4">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                </div>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700 w-2/4">
                  <span className="bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider">KEYNOTE</span>
                  <span className="truncate">Engagement_Portfolio_2026.key</span>
                </div>
                <div className="w-1/4 flex justify-end">
                  <button onClick={() => { setActivitiesViewMode("slide"); setIsActivitiesPlaying(!isActivitiesPlaying); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold border transition-all ${isActivitiesPlaying ? "bg-blue-600 border-blue-700 text-white shadow-sm" : "bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-sm"}`}>
                    {isActivitiesPlaying ? <Pause size={12} className="fill-current" /> : <Play size={12} className="fill-current" />}
                    <span className="hidden sm:inline">{isActivitiesPlaying ? "Pause Setup" : "Play Presentation"}</span>
                  </button>
                </div>
              </div>

              <div className="h-11 bg-[#ededf0] border-b border-slate-200 px-4 flex items-center gap-4 text-slate-500 text-xs font-medium select-none flex-shrink-0">
                <button onClick={() => { setIsActivitiesPlaying(false); setActivitiesViewMode("slide"); }} className={`flex items-center gap-1 h-full px-1 border-b-2 transition-all ${activitiesViewMode === "slide" ? "text-blue-600 font-bold border-blue-600" : "border-transparent hover:text-slate-700"}`}>
                  <Layout size={14} /> Navigator View
                </button>
                <button onClick={() => { setIsActivitiesPlaying(false); setActivitiesViewMode("light-table"); }} className={`flex items-center gap-1 h-full px-1 border-b-2 transition-all ${activitiesViewMode === "light-table" ? "text-blue-600 font-bold border-blue-600" : "border-transparent hover:text-slate-700"}`}>
                  <Grid size={14} /> Light Table Mode
                </button>
                
                <button onClick={() => setIsActInspectorOpen(!isActInspectorOpen)} className={`flex items-center gap-1 h-full px-2 border-b-2 transition-all ml-2 ${isActInspectorOpen ? "text-blue-600 font-bold border-blue-600 bg-slate-300/30" : "border-transparent hover:text-slate-700"}`}>
                  <Sliders size={14} /> Inspector
                </button>

                <div className="ml-auto text-[10px] font-mono font-bold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded">
                  {activitiesViewMode === "light-table" ? "White Light Table View" : `Slide ${activitiesActiveIdx + 1} / ${activitiesCerts.length}`}
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden w-full relative bg-white">
                {activitiesViewMode === "light-table" ? (
                  <div className="flex-1 bg-slate-50 p-8 overflow-y-auto select-none border-r border-slate-200">
                    <div className={`grid ${getGridClass()} max-w-5xl mx-auto`}>
                      {activitiesCerts.map((cert, index) => {
                        const isTargetSwap = activitiesSwapIdx === index;
                        return (
                          <div key={cert.id} onClick={() => handleActivitiesSwap(index)} className={`group flex flex-col gap-2 p-2 rounded-xl border cursor-pointer transition-all ${isTargetSwap ? "bg-amber-50 border-amber-500 ring-4 ring-amber-400/30 scale-[1.03]" : activitiesActiveIdx === index ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20" : "bg-white border-slate-300 shadow-sm hover:border-slate-500"}`}>
                            <div className="aspect-[14/10] bg-slate-100 rounded-lg p-2 flex items-center justify-center overflow-hidden border border-slate-200">
                              <img src={cert.image} alt="" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="flex items-center justify-between px-1">
                              <div className="flex items-center gap-2 truncate">
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isTargetSwap ? "bg-amber-500 text-white" : "bg-slate-200 text-slate-600"}`}>{index + 1}</span>
                                <span className="text-xs font-bold text-slate-700 truncate group-hover:text-blue-600">{cert.title}</span>
                              </div>
                              {isTargetSwap && <span className="text-[9px] uppercase font-black text-amber-600 tracking-wide animate-pulse flex items-center gap-1"><RefreshCw size={8} className="animate-spin" /> Swap</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`bg-[#ebebeb] border-r border-slate-300 overflow-y-auto p-3 space-y-3 select-none flex-shrink-0 transition-all duration-500 ease-in-out ${isActivitiesPlaying ? "w-0 opacity-0 p-0 pointer-events-none border-r-0" : "w-44 sm:w-48 opacity-100"}`}>
                      <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1 px-4">Slides</div>
                      {activitiesCerts.map((cert, index) => {
                        const isActive = activitiesActiveIdx === index;
                        return (
                          <div key={cert.id} onClick={() => { setIsActivitiesPlaying(false); setActivitiesTriggerKey(p => p+1); setActivitiesActiveIdx(index); }} className="flex gap-2 items-start cursor-pointer group">
                            <span className={`text-[10px] font-mono font-bold w-4 text-right mt-2 ${isActive ? "text-blue-600 font-black" : "text-slate-400"}`}>{index + 1}</span>
                            <div className={`flex-1 aspect-[16/10] rounded-lg bg-white border overflow-hidden p-2 flex items-center justify-center transition-all shadow-sm ${isActive ? "border-2 border-blue-600 ring-2 ring-blue-600/20 scale-[0.98]" : "border-slate-300 group-hover:border-slate-400"}`}>
                              <img src={cert.image} alt="" className="w-full h-full object-contain pointer-events-none rounded-sm" />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className={`flex-1 ${canvasBg} relative flex flex-col overflow-hidden p-4 sm:p-8 justify-center group select-none border-r border-neutral-200 transition-colors duration-300`}>
                      {!isActivitiesPlaying && (
                        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between items-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button onClick={() => handleArrowNav("activities", "prev")} className="p-2.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-800 transition-all pointer-events-auto shadow-sm backdrop-blur-sm active:scale-95 border border-slate-200/60">
                            <ChevronLeft size={20} />
                          </button>
                          <button onClick={() => handleArrowNav("activities", "next")} className="p-2.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-800 transition-all pointer-events-auto shadow-sm backdrop-blur-sm active:scale-95 border border-slate-200/60">
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      )}
                      <div className="w-full h-full flex items-center justify-center p-2 overflow-hidden relative">
                        <img
                          key={`${activitiesTriggerKey}-${activitiesActiveIdx}`}
                          src={activitiesCerts[activitiesActiveIdx]?.image}
                          alt={activitiesCerts[activitiesActiveIdx]?.title}
                          className={`max-w-full max-h-full object-contain rounded-md shadow-lg border border-slate-300/40 bg-white p-2 sm:p-4 transition-all duration-500 ${getAnimationClass(activitiesTransition)}`}
                        />
                      </div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-slate-900/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/50">
                        {activitiesCerts.map((_, index) => (
                          <div key={index} className={`h-1.5 rounded-full transition-all duration-300 ${activitiesActiveIdx === index ? "w-4 bg-blue-600" : "w-1.5 bg-slate-400"}`} />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* ACTIVITIES Format Inspector */}
                <div className={`bg-[#f2f2f5] border-l border-slate-300 flex flex-col select-none flex-shrink-0 transition-all duration-300 text-slate-700 ${isActInspectorOpen ? "w-64 opacity-100" : "w-0 opacity-0 overflow-hidden border-l-0"}`}>
                  <div className="p-3 border-b border-slate-300 font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5 bg-[#e1e1e3]">
                    <SlidersHorizontal size={12} /> Format Inspector
                  </div>
                  
                  {activitiesViewMode === "slide" ? (
                    <div className="p-4 space-y-5 text-xs">
                      <div className="space-y-2">
                        <label className="font-bold text-slate-500 block uppercase text-[10px]">Slide Animation</label>
                        <select 
                          value={activitiesTransition} 
                          onChange={(e) => setActivitiesTransition(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-md p-1.5 text-slate-700 outline-none font-medium shadow-sm"
                        >
                          <option value="horizontal">Push Left</option>
                          <option value="vertical">Pop Up</option>
                          <option value="fade">Smooth Fade</option>
                          <option value="cross">Cross-Dissolve</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="font-bold text-slate-500 block uppercase text-[10px]">Canvas Fill Backdrop</label>
                        <div className="flex flex-wrap gap-2">
                          {colorSwatches.map((color) => (
                            <button
                              key={color.id}
                              onClick={() => setCanvasBg(color.id)}
                              title={color.label}
                              className={`w-7 h-7 rounded-full border shadow-sm transition-transform hover:scale-110 ${canvasBg === color.id ? "ring-2 ring-blue-500 scale-115" : "border-slate-400"}`}
                              style={{ backgroundColor: color.hex }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 space-y-4 text-xs">
                      <div className="space-y-2">
                        <label className="font-bold text-slate-500 block uppercase text-[10px]">Grid Card Layout Size</label>
                        <select value={gridCardScale} onChange={(e) => setGridCardScale(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-1.5 text-slate-700 outline-none font-medium shadow-sm">
                          <option value="compact">Compact Matrix</option>
                          <option value="normal">Default Layout</option>
                          <option value="large">Large Previews</option>
                        </select>
                      </div>
                      <div className="p-3 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 leading-relaxed font-medium text-[11px]">
                        <Layers size={14} className="mb-1" /> Click any two index positions inside the light table viewport to instantly swap slide orders.
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* DECK B: TECHNICAL CERTIFICATIONS */}
          <div className="w-1/2 pl-0 md:pl-2 transition-opacity duration-300 flex-shrink-0">
            <div className="w-full bg-[#f5f5f7] rounded-2xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col h-[75vh] min-h-[580px]">
              
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
                <div className="w-1/4 flex justify-end">
                  <button onClick={() => { setTechnicalViewMode("slide"); setIsTechnicalPlaying(!isTechnicalPlaying); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold border transition-all ${isTechnicalPlaying ? "bg-purple-600 border-purple-700 text-white shadow-sm" : "bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-sm"}`}>
                    {isTechnicalPlaying ? <Pause size={12} className="fill-current" /> : <Play size={12} className="fill-current" />}
                    <span className="hidden sm:inline">{isTechnicalPlaying ? "Pause Setup" : "Play Presentation"}</span>
                  </button>
                </div>
              </div>

              <div className="h-11 bg-[#ededf0] border-b border-slate-200 px-4 flex items-center gap-4 text-slate-500 text-xs font-medium select-none flex-shrink-0">
                <button onClick={() => { setIsTechnicalPlaying(false); setTechnicalViewMode("slide"); }} className={`flex items-center gap-1 h-full px-1 border-b-2 transition-all ${technicalViewMode === "slide" ? "text-purple-600 font-bold border-purple-600" : "border-transparent hover:text-slate-700"}`}>
                  <Layout size={14} /> Navigator View
                </button>
                <button onClick={() => { setIsTechnicalPlaying(false); setTechnicalViewMode("light-table"); }} className={`flex items-center gap-1 h-full px-1 border-b-2 transition-all ${technicalViewMode === "light-table" ? "text-purple-600 font-bold border-purple-600" : "border-transparent hover:text-slate-700"}`}>
                  <Grid size={14} /> Light Table Mode
                </button>

                <button onClick={() => setIsTechInspectorOpen(!isTechInspectorOpen)} className={`flex items-center gap-1 h-full px-2 border-b-2 transition-all ml-2 ${isTechInspectorOpen ? "text-purple-600 font-bold border-purple-600 bg-slate-300/30" : "border-transparent hover:text-slate-700"}`}>
                  <Sliders size={14} /> Inspector
                </button>

                <div className="ml-auto text-[10px] font-mono font-bold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded">
                  {technicalViewMode === "light-table" ? "White Light Table View" : `Slide ${technicalActiveIdx + 1} / ${technicalCerts.length}`}
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden w-full relative bg-white">
                {technicalViewMode === "light-table" ? (
                  <div className="flex-1 bg-slate-50 p-8 overflow-y-auto select-none border-r border-slate-200">
                    <div className={`grid ${getGridClass()} max-w-5xl mx-auto`}>
                      {technicalCerts.map((cert, index) => {
                        const isTargetSwap = technicalSwapIdx === index;
                        return (
                          <div key={cert.id} onClick={() => handleTechnicalSwap(index)} className={`group flex flex-col gap-2 p-2 rounded-xl border cursor-pointer transition-all ${isTargetSwap ? "bg-amber-50 border-amber-500 ring-4 ring-amber-400/30 scale-[1.03]" : technicalActiveIdx === index ? "bg-purple-50 border-purple-500 ring-2 ring-purple-500/20" : "bg-white border-slate-300 shadow-sm hover:border-slate-500"}`}>
                            <div className="aspect-[14/10] bg-slate-100 rounded-lg p-2 flex items-center justify-center overflow-hidden border border-slate-200">
                              <img src={cert.image} alt="" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="flex items-center justify-between px-1">
                              <div className="flex items-center gap-2 truncate">
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isTargetSwap ? "bg-amber-500 text-white" : "bg-slate-200 text-slate-600"}`}>{index + 1}</span>
                                <span className="text-xs font-bold text-slate-700 truncate group-hover:text-purple-600">{cert.title}</span>
                              </div>
                              {isTargetSwap && <span className="text-[9px] uppercase font-black text-amber-600 tracking-wide animate-pulse flex items-center gap-1"><RefreshCw size={8} className="animate-spin" /> Swap</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`bg-[#ebebeb] border-r border-slate-300 overflow-y-auto p-3 space-y-3 select-none flex-shrink-0 transition-all duration-500 ease-in-out ${isTechnicalPlaying ? "w-0 opacity-0 p-0 pointer-events-none border-r-0" : "w-44 sm:w-48 opacity-100"}`}>
                      <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1 px-4">Slides</div>
                      {technicalCerts.map((cert, index) => {
                        const isActive = technicalActiveIdx === index;
                        return (
                          <div key={cert.id} onClick={() => { setIsTechnicalPlaying(false); setTechnicalTriggerKey(p => p+1); setTechnicalActiveIdx(index); }} className="flex gap-2 items-start cursor-pointer group">
                            <span className={`text-[10px] font-mono font-bold w-4 text-right mt-2 ${isActive ? "text-purple-600 font-black" : "text-slate-400"}`}>{index + 1}</span>
                            <div className={`flex-1 aspect-[16/10] rounded-lg bg-white border overflow-hidden p-2 flex items-center justify-center transition-all shadow-sm ${isActive ? "border-2 border-purple-600 ring-2 ring-purple-600/20 scale-[0.98]" : "border-slate-300 group-hover:border-slate-400"}`}>
                              <img src={cert.image} alt="" className="w-full h-full object-contain pointer-events-none rounded-sm" />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className={`flex-1 ${canvasBg} relative flex flex-col overflow-hidden p-4 sm:p-8 justify-center group select-none border-r border-neutral-200 transition-colors duration-300`}>
                      {!isTechnicalPlaying && (
                        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between items-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button onClick={() => handleArrowNav("technical", "prev")} className="p-2.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-800 transition-all pointer-events-auto shadow-sm backdrop-blur-sm active:scale-95 border border-slate-200/60">
                            <ChevronLeft size={20} />
                          </button>
                          <button onClick={() => handleArrowNav("technical", "next")} className="p-2.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-800 transition-all pointer-events-auto shadow-sm backdrop-blur-sm active:scale-95 border border-slate-200/60">
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      )}
                      <div className="w-full h-full flex items-center justify-center p-2 overflow-hidden relative">
                        <img
                          key={`${technicalTriggerKey}-${technicalActiveIdx}`}
                          src={technicalCerts[technicalActiveIdx]?.image}
                          alt={technicalCerts[technicalActiveIdx]?.title}
                          className={`max-w-full max-h-full object-contain rounded-md shadow-lg border border-slate-300/40 bg-white p-2 sm:p-4 transition-all duration-500 ${getAnimationClass(technicalTransition)}`}
                        />
                      </div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-slate-900/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/50">
                        {technicalCerts.map((_, index) => (
                          <div key={index} className={`h-1.5 rounded-full transition-all duration-300 ${technicalActiveIdx === index ? "w-4 bg-purple-600" : "w-1.5 bg-slate-400"}`} />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* TECHNICAL Format Inspector */}
                <div className={`bg-[#f2f2f5] border-l border-slate-300 flex flex-col select-none flex-shrink-0 transition-all duration-300 text-slate-700 ${isTechInspectorOpen ? "w-64 opacity-100" : "w-0 opacity-0 overflow-hidden border-l-0"}`}>
                  <div className="p-3 border-b border-slate-300 font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5 bg-[#e1e1e3]">
                    <SlidersHorizontal size={12} /> Format Inspector
                  </div>
                  
                  {technicalViewMode === "slide" ? (
                    <div className="p-4 space-y-5 text-xs">
                      <div className="space-y-2">
                        <label className="font-bold text-slate-500 block uppercase text-[10px]">Slide Animation</label>
                        <select 
                          value={technicalTransition} 
                          onChange={(e) => setTechnicalTransition(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-md p-1.5 text-slate-700 outline-none font-medium shadow-sm"
                        >
                          <option value="horizontal">Push Left</option>
                          <option value="vertical">Pop Up</option>
                          <option value="fade">Smooth Fade</option>
                          <option value="cross">Cross-Dissolve</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="font-bold text-slate-500 block uppercase text-[10px]">Canvas Fill Backdrop</label>
                        <div className="flex flex-wrap gap-2">
                          {colorSwatches.map((color) => (
                            <button
                              key={color.id}
                              onClick={() => setCanvasBg(color.id)}
                              title={color.label}
                              className={`w-7 h-7 rounded-full border shadow-sm transition-transform hover:scale-110 ${canvasBg === color.id ? "ring-2 ring-purple-500 scale-115" : "border-slate-400"}`}
                              style={{ backgroundColor: color.hex }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 space-y-4 text-xs">
                      <div className="space-y-2">
                        <label className="font-bold text-slate-500 block uppercase text-[10px]">Grid Card Layout Size</label>
                        <select value={gridCardScale} onChange={(e) => setGridCardScale(e.target.value)} className="w-full bg-white border border-slate-300 rounded-md p-1.5 text-slate-700 outline-none font-medium shadow-sm">
                          <option value="compact">Compact Matrix</option>
                          <option value="normal">Default Layout</option>
                          <option value="large">Large Previews</option>
                        </select>
                      </div>
                      <div className="p-3 bg-purple-50 text-purple-800 rounded-lg border border-purple-200 leading-relaxed font-medium text-[11px]">
                        <Layers size={14} className="mb-1" /> Click any two index positions inside the light table viewport to instantly swap slide orders.
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}