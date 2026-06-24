"use client";
import { useEffect, useRef } from "react";

export default function WelcomePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Handle high-DPI scaling and screen resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const alphabet = "01";
    const fontSize = 14; 
    
    // Calculate total possible columns across the viewport width
    const totalColumns = Math.floor(canvas.width / fontSize);
    
    // Create sparse rainfall by only tracking active rain coordinates for a fraction of columns
    const rainDrops = Array(totalColumns).fill(null).map(() => {
      // 60% of the columns start completely empty to reduce baseline density
      return Math.random() > 0.6 ? Math.floor(Math.random() * -20) : null;
    });

    const draw = () => {
      // Create a linear gradient running from top to bottom
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      // Mirror Layout: 10% Blue at Top -> 80% Solid Black Center -> 10% Blue at Bottom
      gradient.addColorStop(0, "#030712");     // Deep dark blue at the very top
      gradient.addColorStop(0.1, "#000000");   // Fades into solid black by 10%
      gradient.addColorStop(0.9, "#000000");   // Holds solid black down to 90%
      gradient.addColorStop(1, "#030712");     // Fades back into deep dark blue at the bottom
      
      // Paint background with transparency for smooth trail retention
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.15; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;  // Reset globalAlpha for text rendering

      // Render Matrix Green Binary Strings
      ctx.fillStyle = "#0df25d"; 
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        // Skip disabled columns to maintain low visual weight
        if (rainDrops[i] === null) continue;

        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        // Draw character only if it's on screen
        if (y > 0) {
          ctx.fillText(text, x, y);
        }

        // Ultra-low intensity respawn logic: 0.5% chance to loop back to the top
        if (y > canvas.height) {
          if (Math.random() > 0.995) {
            rainDrops[i] = 0;
          } else {
            // Keep it off-screen longer to create whitespace gaps
            rainDrops[i] = Math.floor(Math.random() * -10);
          }
        } else {
          rainDrops[i]++;
        }
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Dynamic Sparse Rain Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full block" />

      {/* Centered Typography with Neon Gradient Text Structure */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center select-none tracking-tight px-4
                       bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent 
                       drop-shadow-[0_0_25px_rgba(217,70,239,0.45)]">
          Welcome to portfolio
        </h1>
      </div>
    </div>
  );
}