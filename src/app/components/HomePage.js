"use client";
import ModelView from "./ModelView";

export default function HomePage({ startAnimation }) {
  return (
    <section className="relative w-full h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 bg-[#030712] overflow-hidden">
      
      {/* Left Column: Typography Content */}
      <div 
        className={`w-full md:w-1/2 flex flex-col justify-center transform transition-all duration-1000 ease-out ${
          startAnimation ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
      >
        <span className="text-gray-400 font-mono text-sm tracking-wider uppercase mb-2">
          Welcome to my portfolio
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-none mb-4">
          Hi, I'm a <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Real-time Systems
          </span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-md mb-8 leading-relaxed">
          I specialize in designing scalable backend architectures, REST APIs, and real-time applications. 
          My focus involves event-driven systems, WebRTC communication, and AI-integrated solutions.
        </p>
        
        <div className="flex items-center gap-4">
          <button className="px-6 py-3 rounded-full border border-blue-500 text-blue-400 font-medium hover:bg-blue-950/30 transition-colors">
            Explore →
          </button>
          
          {/* Saber Orange Glow Effect Button */}
          <button className="px-6 py-3 rounded-full bg-orange-500 text-white font-medium transition-all duration-300 hover:bg-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.6)] hover:shadow-[0_0_25px_rgba(249,115,22,0.9)] ring-1 ring-orange-400/50">
            Download Resume
          </button>
        </div>
      </div>

      {/* Right Column: 3D Model Viewport Container */}
      <div 
        className={`w-full md:w-1/2 h-[60vh] md:h-full flex items-center justify-center transition-all duration-1000 ease-out delay-300 ${
          startAnimation ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      > 
        <div className="w-full h-full min-h-[400px]">
          {/* Forward the trigger flag directly to Three.js environment */}
          <ModelView startAnimation={startAnimation} />
        </div>
      </div>

    </section>
  );
}