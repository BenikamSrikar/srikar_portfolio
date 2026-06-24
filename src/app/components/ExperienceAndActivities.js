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
  },
  {
    id: 3,
    image: "/images/activities/Hackathon.png",
    title: "Hackathon"
  }
];

const technicalCerts = [
  {
    id: 1,
    image: "/images/certs/deloitte.png",
    title: "Deloitte Certificate"
  },
  {
    id: 2,
    image: "/images/certs/Oracle1.png",
    title: "Oracle Certificate 1"
  },
  {
    id: 3,
    image: "/images/certs/Oracle2.png",
    title: "Oracle Certificate 2"
  },
  {
    id: 4,
    image: "/images/certs/mongoDB.png",
    title: "MongoDB Certificate"
  }
];

export default function ExperienceAndActivities() {
  // Activities Carousel State
  const [isPlaying, setIsPlaying] = useState(true);
  const [translateX, setTranslateX] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Technical Certs Carousel State
  const [isPlayingTech, setIsPlayingTech] = useState(true);
  const [translateXTech, setTranslateXTech] = useState(-50); // Start from -50% for reverse
  const [animationProgressTech, setAnimationProgressTech] = useState(0);

  // Activities Carousel Animation (Right to Left)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setAnimationProgress((prev) => {
        const next = prev + 1;
        return next >= 100 ? 0 : next;
      });
    }, 350);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      setTranslateX(-(animationProgress / 2));
    }
  }, [animationProgress, isPlaying]);

  // Technical Certs Carousel Animation (Left to Right - Reverse)
  useEffect(() => {
    if (!isPlayingTech) return;

    const interval = setInterval(() => {
      setAnimationProgressTech((prev) => {
        const next = prev + 1;
        return next >= 100 ? 0 : next;
      });
    }, 350);

    return () => clearInterval(interval);
  }, [isPlayingTech]);

  useEffect(() => {
    if (isPlayingTech) {
      // Reverse direction: start at -50% and move towards 0%
      setTranslateXTech(-50 + (animationProgressTech / 2));
    }
  }, [animationProgressTech, isPlayingTech]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const togglePlayPauseTech = () => {
    setIsPlayingTech(!isPlayingTech);
  };

  const goToPrevious = () => {
    setTranslateX((prev) => Math.min(prev + 5, 0));
  };

  const goToNext = () => {
    setTranslateX((prev) => Math.max(prev - 5, -50));
  };

  const goToPreviousTech = () => {
    setTranslateXTech((prev) => Math.max(prev - 5, -50));
  };

  const goToNextTech = () => {
    setTranslateXTech((prev) => Math.min(prev + 5, 0));
  };

  return (
    <div 
      id="activities" 
      className="w-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 text-slate-800 py-20 px-4 sm:px-6 md:px-10 lg:px-20"
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

      {/* Activities Carousel Container */}
      <div className="max-w-6xl mx-auto mb-20">
        <style>{`
          @keyframes slideLeftInfinite {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @keyframes slideRightInfinite {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }
          
          @keyframes ambientGlow {
            0%, 100% {
              box-shadow: 
                0 0 40px rgba(59, 130, 246, 0.3),
                0 0 80px rgba(59, 130, 246, 0.2),
                0 0 120px rgba(59, 130, 246, 0.1),
                0 4px 20px rgba(0, 0, 0, 0.3);
            }
            50% {
              box-shadow: 
                0 0 60px rgba(59, 130, 246, 0.4),
                0 0 100px rgba(59, 130, 246, 0.3),
                0 0 140px rgba(59, 130, 246, 0.2),
                0 8px 30px rgba(0, 0, 0, 0.4);
            }
          }
          
          @keyframes ambientGlowTech {
            0%, 100% {
              box-shadow: 
                0 0 40px rgba(147, 51, 234, 0.3),
                0 0 80px rgba(147, 51, 234, 0.2),
                0 0 120px rgba(147, 51, 234, 0.1),
                0 4px 20px rgba(0, 0, 0, 0.3);
            }
            50% {
              box-shadow: 
                0 0 60px rgba(147, 51, 234, 0.4),
                0 0 100px rgba(147, 51, 234, 0.3),
                0 0 140px rgba(147, 51, 234, 0.2),
                0 8px 30px rgba(0, 0, 0, 0.4);
            }
          }
          
          .carousel-container {
            animation: ambientGlow 4s ease-in-out infinite;
          }
          
          .carousel-container-tech {
            animation: ambientGlowTech 4s ease-in-out infinite;
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
          
          .slide-track-reverse {
            display: flex;
            gap: 32px;
            width: 200%;
            padding: 20px;
            transition: ${isPlayingTech ? 'none' : 'transform 0.5s ease-in-out'};
            transform: translateX(${isPlayingTech ? 'var(--translate-x-reverse)' : translateXTech + '%'});
            --translate-x-reverse: ${isPlayingTech ? 'calc(-50% + (50% * (var(--frame, 0) / 350)))' : '0'};
          }
          
          ${isPlaying ? `
            .slide-track {
              animation: slideLeftInfinite 35s linear infinite;
            }
          ` : ''}
          
          ${isPlayingTech ? `
            .slide-track-reverse {
              animation: slideRightInfinite 35s linear infinite;
            }
          ` : ''}
          
          .slide-item {
            flex: 0 0 calc(50% / ${certifications.length});
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
            aspect-ratio: 16/9;
            padding: 12px;
            overflow: hidden;
          }
          
          .slide-item img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 8px;
          }
          
          .slide-item-tech {
            flex: 0 0 calc(50% / ${technicalCerts.length});
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 350px;
            max-height: 350px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
            aspect-ratio: 16/9;
          }
          
          .slide-item:hover, .slide-item-tech:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
          }
          
          .cert-image-tech {
            width: 100%;
            height: 100%;
            object-fit: contain;
            padding: 20px;
          }
        `}</style>

        {/* Carousel Wrapper with Ambient Glow */}
        <div className="carousel-container relative overflow-hidden rounded-xl bg-white backdrop-blur-sm border border-slate-200">
          
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
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}

            {/* Duplicate set for infinite loop */}
            {certifications.map((cert) => (
              <div key={`2-${cert.id}`} className="slide-item">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-w-full max-h-full object-contain"
                />
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
          <div className="absolute bottom-6 left-6 z-20 text-sm text-white font-mono bg-blue-600/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-blue-400/30">
            {isPlaying ? "▶ Playing" : "⏸ Paused"}
          </div>
        </div>
      </div>

      {/* Technical Certifications Section */}
      <div className="text-center mb-16 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
          <span className="text-purple-600">Technical Certifications</span>
        </h2>
      </div>

      {/* Technical Certifications Carousel Container */}
      <div className="max-w-6xl mx-auto">
        {/* Carousel Wrapper with Ambient Glow */}
        <div className="carousel-container-tech relative overflow-hidden rounded-xl bg-white backdrop-blur-sm border border-slate-200">
          
          {/* Slides Container - Reverse Direction */}
          <div 
            className="slide-track-reverse"
            style={{
              transform: isPlayingTech 
                ? undefined 
                : `translateX(${translateXTech}%)`
            }}
          >
            {/* First set */}
            {technicalCerts.map((cert) => (
              <div key={`1-${cert.id}`} className="slide-item-tech">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="cert-image-tech"
                />
              </div>
            ))}

            {/* Duplicate set for infinite loop */}
            {technicalCerts.map((cert) => (
              <div key={`2-${cert.id}`} className="slide-item-tech">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="cert-image-tech"
                />
              </div>
            ))}
          </div>

          {/* Left Arrow - Only visible when paused */}
          {!isPlayingTech && (
            <button
              onClick={goToPreviousTech}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Previous certificate"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Right Arrow - Only visible when paused */}
          {!isPlayingTech && (
            <button
              onClick={goToNextTech}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Next certificate"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Play/Pause Button - Bottom Right */}
          <button
            onClick={togglePlayPauseTech}
            className="absolute bottom-6 right-6 z-20 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label={isPlayingTech ? "Pause carousel" : "Play carousel"}
          >
            {isPlayingTech ? <Pause size={24} /> : <Play size={24} />}
          </button>

          {/* Status Text - Bottom Left */}
          <div className="absolute bottom-6 left-6 z-20 text-sm text-white font-mono bg-purple-600/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-purple-400/30">
            {isPlayingTech ? "▶ Playing" : "⏸ Paused"}
          </div>
        </div>
      </div>
    </div>
  );
}