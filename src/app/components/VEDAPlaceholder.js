"use client";
import { motion } from "framer-motion";

const VEDAPlaceholder = ({ type = "before", className = "" }) => {
  const isAfter = type === "after";
  
  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div 
        className="w-full h-full"
        style={{
          background: isAfter 
            ? "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)"
            : "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)"
        }}
      />
      
      {/* 3D Object - Simple geometric shape */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            rotateX: [0, 15, -15, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="relative"
        >
          {/* Main geometric shape */}
          <div 
            className="w-32 h-20 relative"
            style={{
              background: isAfter 
                ? "linear-gradient(45deg, #8b5cf6, #a78bfa, #c4b5fd)"
                : "linear-gradient(45deg, #64748b, #94a3b8, #cbd5e1)",
              clipPath: "polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)",
              filter: isAfter ? "blur(0px)" : "blur(2px)",
            }}
          >
            {/* Noise overlay for "before" image */}
            {!isAfter && (
              <div 
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px),
                    radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '8px 8px, 12px 12px, 6px 6px'
                }}
              />
            )}
            
            {/* Highlight/shine effect */}
            <div 
              className="absolute inset-0"
              style={{
                background: isAfter 
                  ? "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 30%)"
              }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Subtle particles/stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(isAfter ? 8 : 15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isAfter ? 'bg-purple-300' : 'bg-gray-400'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: isAfter ? 0.8 : 0.3,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Quality indicator text */}
      <div className="absolute bottom-4 left-4 text-xs font-mono text-white/60">
        {isAfter ? "AI Enhanced • High Quality" : "Raw Render • Noisy"}
      </div>
    </div>
  );
};

export default VEDAPlaceholder;