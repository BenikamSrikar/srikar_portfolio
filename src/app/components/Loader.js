"use client";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Spinning Circle Loader */}
        <div className="relative w-20 h-20">
          <motion.div
            className="absolute inset-0 border-4 border-orange-200 rounded-full"
          />
          <motion.div
            className="absolute inset-0 border-4 border-orange-600 rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Loading Text */}
        <div className="flex items-center gap-2">
          <motion.span
            className="text-xl font-semibold text-gray-800"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Loading
          </motion.span>
          <div className="flex gap-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-orange-600 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            ))}
          </div>
        </div>

        {/* Optional: Progress indicator */}
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
