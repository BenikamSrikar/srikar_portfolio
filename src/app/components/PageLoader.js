"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader({ isLoading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      // Prevent body scroll while loading
      document.body.style.overflow = 'hidden';
      
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 200);

      return () => {
        clearInterval(interval);
      };
    } else {
      // Complete progress when loaded
      setProgress(100);
      
      // Re-enable body scroll after a brief delay
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 500);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <svg 
              className="w-20 h-20 text-orange-600"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </motion.div>

          {/* Spinning loader */}
          <motion.div
            className="relative w-24 h-24 mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-orange-600 border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
          </motion.div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Loading Portfolio</h2>
            <p className="text-sm text-slate-600 mb-4">Preparing 3D experience...</p>
            
            {/* Progress bar */}
            <div className="w-64 h-2 bg-orange-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">{Math.round(progress)}%</p>
          </motion.div>

          {/* Optional decorative elements */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
