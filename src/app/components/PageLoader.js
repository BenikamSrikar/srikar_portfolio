"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader({ isLoading }) {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState("Initializing");

  useEffect(() => {
    if (isLoading) {
      // Prevent body scroll while loading
      document.body.style.overflow = 'hidden';
      
      // Simulate realistic loading stages
      const stages = [
        { progress: 15, stage: "Connecting to server", duration: 300 },
        { progress: 35, stage: "Loading 3D assets", duration: 500 },
        { progress: 55, stage: "Processing textures", duration: 600 },
        { progress: 75, stage: "Initializing renderer", duration: 400 },
        { progress: 90, stage: "Almost ready", duration: 300 }
      ];

      let currentStage = 0;
      
      const advanceStage = () => {
        if (currentStage < stages.length) {
          const { progress, stage, duration } = stages[currentStage];
          setProgress(progress);
          setLoadingStage(stage);
          currentStage++;
          setTimeout(advanceStage, duration);
        }
      };

      advanceStage();

      return () => {
        document.body.style.overflow = '';
      };
    } else {
      // Complete progress when loaded
      setProgress(100);
      setLoadingStage("Complete!");
      
      // Re-enable body scroll
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 600);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        >
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, 50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center max-w-md px-8">
            
            {/* Logo/Brand */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="mb-8"
            >
              <div className="relative">
                {/* Outer glow ring */}
                <motion.div
                  className="absolute inset-0 w-32 h-32 rounded-full border-2 border-orange-500/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* User icon */}
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl">
                  <svg 
                    className="w-16 h-16 text-white"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Loading text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-3 text-center"
            >
              Loading Portfolio
            </motion.h2>

            {/* Loading stage */}
            <motion.div
              key={loadingStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 mb-8"
            >
              {/* Network activity indicator */}
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-orange-500 rounded-full"
                    animate={{
                      height: ["8px", "16px", "8px"],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <p className="text-slate-300 text-sm font-medium">{loadingStage}</p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-full mb-4">
              <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </div>
              
              {/* Progress percentage */}
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-slate-400">Progress</p>
                <motion.p 
                  key={progress}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-sm font-bold text-orange-500"
                >
                  {progress}%
                </motion.p>
              </div>
            </div>

            {/* Network status indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mt-4 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700"
            >
              <div className="relative flex items-center">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-green-500/40"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>
              <p className="text-xs text-slate-400">Network Active</p>
            </motion.div>

            {/* Loading tip */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-slate-500 text-center mt-6 max-w-xs"
            >
              Loading 3D assets and interactive elements...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
