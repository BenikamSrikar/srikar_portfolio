"use client";
import ModelView from "./ModelView";

export default function HomePage({ startAnimation }) {
  
  // Function to handle smooth scrolling to the About section
  const handleExploreClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col xl:flex-row items-center justify-center xl:justify-between px-6 sm:px-12 md:px-20 bg-[#030712] overflow-hidden">
      
      {/* ========================================================= */}
      {/* CORE KEYFRAMES FOR ANIMATIONS                             */}
      {/* ========================================================= */}
      <style>{`
        @keyframes driftNode1 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(40px, -25px); }
        }
        @keyframes driftNode2 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-50px, 35px); }
        }
        @keyframes driftNode3 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(30px, 45px); }
        }
        @keyframes safeEvaporate {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-90vh) scale(0.3); opacity: 0; }
        }
        /* Continuous Border Glow Rotation */
        @keyframes rotateGlow {
          0% { border-color: rgb(59, 130, 246) transparent transparent transparent; box-shadow: 0 -4px 10px -2px rgba(59, 130, 246, 0.5); }
          25% { border-color: transparent rgb(59, 130, 246) transparent transparent; box-shadow: 4px 0 10px -2px rgba(59, 130, 246, 0.5); }
          50% { border-color: transparent transparent rgb(59, 130, 246) transparent; box-shadow: 0 4px 10px -2px rgba(59, 130, 246, 0.5); }
          75% { border-color: transparent transparent transparent rgb(59, 130, 246); box-shadow: -4px 0 10px -2px rgba(59, 130, 246, 0.5); }
          100% { border-color: rgb(59, 130, 246) transparent transparent transparent; box-shadow: 0 -4px 10px -2px rgba(59, 130, 246, 0.5); }
        }
        @keyframes rotateOrangeGlow {
          0% { border-color: rgb(249, 115, 22) transparent transparent transparent; box-shadow: 0 -4px 10px -2px rgba(249, 115, 22, 0.5); }
          25% { border-color: transparent rgb(249, 115, 22) transparent transparent; box-shadow: 4px 0 10px -2px rgba(249, 115, 22, 0.5); }
          50% { border-color: transparent transparent rgb(249, 115, 22) transparent; box-shadow: 0 4px 10px -2px rgba(249, 115, 22, 0.5); }
          75% { border-color: transparent transparent transparent rgb(249, 115, 22); box-shadow: -4px 0 10px -2px rgba(249, 115, 22, 0.5); }
          100% { border-color: rgb(249, 115, 22) transparent transparent transparent; box-shadow: 0 -4px 10px -2px rgba(249, 115, 22, 0.5); }
        }
        .glow-loop-blue {
          animation: rotateGlow 3s linear infinite;
        }
        .glow-loop-orange {
          animation: rotateOrangeGlow 3s linear infinite;
        }
      `}</style>

      {/* ========================================================= */}
      {/* TABLET / IPAD PRO VIEW: Moving, Connecting Wiggle Dots   */}
      {/* ========================================================= */}
      <div className="hidden sm:block xl:hidden absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="blue-glow-tablet" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <g style={{ animation: 'driftNode1 10s infinite ease-in-out' }}>
            <line x1="20%" y1="25%" x2="45%" y2="20%" stroke="white" strokeWidth="0.75" strokeDasharray="4 2" opacity="0.4" />
            <line x1="45%" y1="20%" x2="35%" y2="45%" stroke="white" strokeWidth="0.75" opacity="0.5" />
            <circle cx="20%" cy="25%" r="6" fill="#3b82f6" filter="url(#blue-glow-tablet)" />
            <circle cx="45%" cy="20%" r="5" fill="#22d3ee" filter="url(#blue-glow-tablet)" />
            <circle cx="35%" cy="45%" r="7" fill="#60a5fa" filter="url(#blue-glow-tablet)" />
          </g>

          <g style={{ animation: 'driftNode2 14s infinite ease-in-out' }}>
            <line x1="75%" y1="65%" x2="55%" y2="80%" stroke="white" strokeWidth="0.75" opacity="0.4" />
            <line x1="55%" y1="80%" x2="85%" y2="85%" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.6" />
            <circle cx="75%" cy="65%" r="5" fill="#60a5fa" filter="url(#blue-glow-tablet)" />
            <circle cx="55%" cy="80%" r="7" fill="#3b82f6" filter="url(#blue-glow-tablet)" />
            <circle cx="85%" cy="85%" r="4" fill="#22d3ee" filter="url(#blue-glow-tablet)" />
          </g>

          <g style={{ animation: 'driftNode3 12s infinite ease-in-out' }}>
            <line x1="80%" y1="20%" x2="70%" y2="40%" stroke="white" strokeWidth="0.75" opacity="0.5" />
            <circle cx="80%" cy="20%" r="6" fill="#22d3ee" filter="url(#blue-glow-tablet)" />
            <circle cx="70%" cy="40%" r="5" fill="#3b82f6" filter="url(#blue-glow-tablet)" />
          </g>
        </svg>
      </div>

      {/* ========================================================= */}
      {/* MOBILE VIEW BACKGROUND: Evaporating Particles             */}
      {/* ========================================================= */}
      <div className="block sm:hidden absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/20 rounded-full blur-[90px]"></div>
        
        <div className="absolute inset-0 opacity-70">
          <span className="absolute bottom-[-10px] left-[10%] w-2 h-2 bg-cyan-400 rounded-full blur-[1px]" style={{ animation: 'safeEvaporate 6s infinite linear' }}></span>
          <span className="absolute bottom-[-10px] left-[30%] w-1.5 h-1.5 bg-blue-400 rounded-full blur-[1px]" style={{ animation: 'safeEvaporate 8s infinite linear 1.5s' }}></span>
          <span className="absolute bottom-[-10px] left-[50%] w-2.5 h-2.5 bg-cyan-300 rounded-full blur-[1px]" style={{ animation: 'safeEvaporate 7s infinite linear 3s' }}></span>
          <span className="absolute bottom-[-10px] left-[75%] w-2 h-2 bg-blue-500 rounded-full blur-[1px]" style={{ animation: 'safeEvaporate 9s infinite linear 4.5s' }}></span>
          <span className="absolute bottom-[-10px] left-[90%] w-1.5 h-1.5 bg-cyan-400 rounded-full blur-[1px]" style={{ animation: 'safeEvaporate 5s infinite linear 2s' }}></span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CONTENT COLUMN (Centered up to xl, left-aligned on desktop)*/}
      {/* ========================================================= */}
      <div 
        className={`w-full xl:w-1/2 flex flex-col justify-center items-center xl:items-start text-center xl:text-left z-10 transform transition-all duration-1000 ease-out ${
          startAnimation ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
      >
        <span className="text-gray-400 font-mono text-xs sm:text-sm tracking-wider uppercase mb-2">
          Welcome to my portfolio
        </span>
        <h1 className="text-4xl sm:text-5xl xl:text-7xl font-extrabold text-white tracking-tight leading-none mb-4">
          Hi, I'm a <br className="hidden xl:block" />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            UnderGrad Student
          </span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base xl:text-lg max-w-sm sm:max-w-md mb-8 leading-relaxed px-4 xl:px-0">
          I specialize in designing scalable backend architectures, REST APIs, and real-time applications. 
          My focus involves event-driven systems, WebRTC communication, and AI-integrated solutions.
        </p>
        
        {/* Buttons: Transparent baseline background, loop-animated glowing shadow borders, hover shifts */}
        <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-4 w-full sm:w-auto px-6 sm:px-0">
          
          {/* Explore Button */}
          <button 
            onClick={handleExploreClick}
            className="glow-loop-blue w-full sm:w-auto text-center px-6 py-3 rounded-full bg-transparent border text-blue-400 font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]"
          >
            Explore
          </button>
          
          {/* Download Resume Button */}
          <a 
            href="/resume/srikar_resume.pdf" 
            download="srikar_resume.pdf"
            className="glow-loop-orange w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-transparent border text-orange-400 font-medium transition-all duration-300 hover:bg-orange-500 hover:text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.8)]"
          >
            Download Resume
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-y-0.5" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
            </svg>
          </a>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 3D MODEL VIEWPORT (DESKTOP ONLY - Hides on iPad Pro)       */}
      {/* ========================================================= */}
      <div 
        className={`hidden xl:flex w-full xl:w-1/2 h-full items-center justify-center transition-all duration-1000 ease-out delay-300 z-10 ${
          startAnimation ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      > 
        <div className="w-full h-full min-h-[400px]">
          <ModelView startAnimation={startAnimation} />
        </div>
      </div>

    </section>
  );
}