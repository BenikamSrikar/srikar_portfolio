"use client";
import { motion } from "framer-motion";

const TextReveal = ({ text, className = "" }) => {
  const letters = text.split("");
  const container = { 
    hidden: { opacity: 0 }, 
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.04 } 
    } 
  };
  const child = {
    visible: { 
      opacity: 1, 
      rotateX: 0, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 10 
      } 
    },
    hidden: { 
      opacity: 0, 
      rotateX: -90, 
      y: 10 
    }
  };

  return (
    <motion.div 
      style={{ display: "flex", perspective: "500px" }} 
      variants={container} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }}
      className={className}
    >
      {letters.map((letter, i) => (
        <motion.span 
          variants={child} 
          key={i} 
          style={{ display: "inline-block" }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TextReveal;