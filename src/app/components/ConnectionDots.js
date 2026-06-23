"use client";
import { useEffect, useRef } from "react";

// Particle factory function (avoids class inside component for React compiler)
function createParticle(canvasWidth, canvasHeight, maxSpeed) {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    vx: (Math.random() - 0.5) * maxSpeed,
    vy: (Math.random() - 0.5) * maxSpeed,
    radius: Math.random() * 2 + 1,
  };
}

function updateParticle(p, canvasWidth, canvasHeight) {
  p.x += p.vx;
  p.y += p.vy;
  if (p.x < 0 || p.x > canvasWidth) p.vx = -p.vx;
  if (p.y < 0 || p.y > canvasHeight) p.vy = -p.vy;
}

function drawParticle(ctx, p) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(37, 99, 235, 0.4)";
  ctx.fill();
}

export default function ConnectionDots() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const particleCount = Math.min(Math.floor(canvas.width / 12), 55);
    const connectionDistance = 110;
    const maxSpeed = 0.4;

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(canvas.width, canvas.height, maxSpeed));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        updateParticle(p, canvas.width, canvas.height);
        drawParticle(ctx, p);
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
