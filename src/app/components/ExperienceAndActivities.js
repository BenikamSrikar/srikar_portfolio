"use client";
import { useState, useEffect } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

const certifications = [
  {
    id: 1,
    image: "/images/activities/Hack2skill-Certificate.png",
    title: "Hack2Skill Certificate"
  },
  {
    id: 2,
    image: "/images/activities/nc_ai_ncat_participation_may_2026_page-0001.jpg",
    title: "NC AI NCAT Participation"
  }
];

export default function ExperienceAndActivities() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [translateX, setTranslateX] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setAnimationProgress((prev) => {
        const next = prev + 1;
        // Reset to 0 when reaching 100 for infinite loop
        return next >= 100 ? 0 : next;
      });
    }, 350); // 35000ms / 100 steps = 350ms per step

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Calculate translateX based on animation progress
  useEffect(() => {
    if (isPlaying) {
      // When playing, smoothly translate based on progress (0 to -50%)
      setTranslateX(-(animationProgress / 2));
    }
  }, [animationProgress, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToPrevious = () => {
    // Move one frame to the right (5% of total width for smoother control)
    setTranslateX((prev) => Math.min(prev + 5, 0));
  };

  const goToNext = () => {
    // Move one frame to the left (5% of total width for smoother control)
    // Limit to -50% since we loop at that point
    setTranslateX((prev) => Math.max(prev - 5, -50));
  };

  return (
    <div 
      id="activities" 
      className="w-full bg-white text-slate-800 py-20 px-4 sm:px-6 md:px-10 lg:px-20"
    >
      {/* Header */}
      <div className="text-center mb-16 max-w-6xl mx-auto">
        <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block">
          Credentials
        </span>
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
          <span className="text-blue-600">Activities</span>
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="max-w-6xl mx-auto">
        <style>{`
          @keyframes slideLeftInfinite {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .slide-track {
            display: flex;
            gap: 32px;
            width: 200%;
            padding: 20px;
            transition: ${isPlaying ? 'none' : 'transform 0.5s ease-in-out'};
            transform: translateX(${isPlaying ? 'var(--translate-x)' : translateX + '%'});
            --translate-x: ${isPlaying ? 'calc(-50% * (var(--frame, 0) / 350))' : '0'};
          }
          
          ${isPlaying ? `
            .slide-track {
              animation: slideLeftInfinite 35s linear infinite;
            }
          ` : ''}
          
          .slide-item {
            flex: 0 0 calc(50% / ${certifications.length});
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 450px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }
          
          .slide-item:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
          }
        `}</style>

        {/* Carousel Wrapper */}
        <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
          
          {/* Slides Container */}
          <div 
            className="slide-track"
            style={{
              transform: isPlaying 
                ? undefined 
                : `translateX(${translateX}%)`
            }}
          >
            {/* First set */}
            {certifications.map((cert) => (
              <div key={`1-${cert.id}`} className="slide-item">
                <div className="w-full h-full flex items-center justify-center p-6">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            ))}

            {/* Duplicate set for infinite loop */}
            {certifications.map((cert) => (
              <div key={`2-${cert.id}`} className="slide-item">
                <div className="w-full h-full flex items-center justify-center p-6">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow - Only visible when paused */}
          {!isPlaying && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Previous certificate"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Right Arrow - Only visible when paused */}
          {!isPlaying && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Next certificate"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Play/Pause Button - Bottom Right */}
          <button
            onClick={togglePlayPause}
            className="absolute bottom-6 right-6 z-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          {/* Status Text - Bottom Left */}
          <div className="absolute bottom-6 left-6 z-20 text-sm text-slate-600 font-mono bg-white px-4 py-2 rounded-full shadow-md">
            {isPlaying ? "▶ Playing" : "⏸ Paused"}
          </div>
        </div>
      </div>
    </div>
  );
}