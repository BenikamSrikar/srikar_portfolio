"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef(null);
  const profileRef = useRef(null);
  const cardsRef = useRef(null);
  const canvasRef = useRef(null);

  const cgpaRef = useRef(null);
  const majorRef = useRef(null);
  const certRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.from(profileRef.current, { x: -200, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: profileRef.current, start: "top 90%" } });
        gsap.from(".about-title", { x: 200, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".about-title", start: "top 90%" } });
        gsap.from(".about-para-1", { opacity: 0, y: 30, duration: 1, ease: "power2.out", scrollTrigger: { trigger: ".about-para-1", start: "top 85%" } });
        gsap.from(".about-para-2", { opacity: 0, y: 30, duration: 1, ease: "power2.out", scrollTrigger: { trigger: ".about-para-2", start: "top 85%" } });
        gsap.from(".about-para-3", { opacity: 0, y: 30, duration: 1, ease: "power2.out", scrollTrigger: { trigger: ".about-para-3", start: "top 85%" } });

        const cards = gsap.utils.toArray(".stat-card");
        gsap.fromTo(cards, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: cardsRef.current, start: "top 95%" } });

        const animateCounter = (ref, target, decimals = 0) => {
          let obj = { val: 0 };
          gsap.to(obj, { val: target, duration: 2, delay: 1, ease: "power3.out", scrollTrigger: { trigger: cardsRef.current, start: "top 95%" }, onUpdate: () => { if (ref.current) ref.current.innerText = obj.val.toFixed(decimals); } });
        };
        animateCounter(cgpaRef, 8.45, 2);
        animateCounter(majorRef, 2, 0);
        animateCounter(certRef, 4, 0);
      }, sectionRef);
    }, 100);
    return () => { clearTimeout(timeoutId); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  // Particle Logic with Glow
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const section = sectionRef.current;
    const resizeCanvas = () => { if (section) { canvas.width = section.offsetWidth; canvas.height = section.offsetHeight; } };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    class Particle {
      constructor() { this.reset(); }
      reset() { this.x = Math.random() * canvas.width; this.y = canvas.height + 10; this.size = 1 + Math.random() * 3; this.speedY = -0.5 - Math.random() * 1.5; this.life = 1; this.decay = 0.003 + Math.random() * 0.005; }
      update() { this.y += this.speedY; this.life -= this.decay; if (this.life <= 0 || this.y < -10) this.reset(); }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${this.life})`;
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    for (let i = 0; i < 50; i++) particles.push(new Particle());
    let animationFrameId;
    const animate = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); animationFrameId = requestAnimationFrame(animate); };
    const observer = new IntersectionObserver((entries) => { if (entries[0].isIntersecting) animate(); else cancelAnimationFrame(animationFrameId); }, { threshold: 0.1 });
    if (section) observer.observe(section);
    return () => { window.removeEventListener('resize', resizeCanvas); cancelAnimationFrame(animationFrameId); observer.disconnect(); };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen bg-[#0a0a0a] text-gray-300 flex flex-col items-center justify-center p-6 md:p-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />

      <div className="relative z-10 w-full max-w-7xl">
        <h2 className="text-3xl md:text-6xl font-black mb-20 text-center tracking-tighter uppercase italic text-white">
          About <span className="text-blue-600">Me</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center justify-center w-full mx-auto">
          
          {/* PROFILE IMAGE WITH GLOWING BORDER */}
          <div ref={profileRef} className="flex-shrink-0">
            <div className="w-64 h-64 md:w-96 md:h-96 rounded-full p-2 bg-[#0a0a0a] shadow-[0_0_30px_rgba(37,99,235,0.5)] border-4 border-blue-600">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src="/images/profile.png" alt="Benikam Srikar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col space-y-10 w-full md:w-3/5">
            <div className="space-y-6 text-center md:text-left">
              <h3 className="about-title text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase">
                BENIKAM <span className="text-blue-600">SRIKAR</span>
              </h3>

              <p className="about-para-1 text-gray-400 text-base md:text-lg leading-relaxed">
                I am currently pursuing my B.Tech in Computer Science at <span className="text-white font-semibold">Sasi Institute of Technology and Engineering</span>. 
                My academic journey began at <span className="text-white font-semibold">Queens International School, Hyderabad</span>, followed by my intermediate studies at <span className="text-white font-semibold">Narayana Junior College, Hyderabad</span>.
              </p>

              <p className="about-para-2 text-gray-300 text-sm md:text-base leading-relaxed border-l-4 border-blue-600 pl-6 py-2 bg-white/5 rounded-r-xl">
                I am a <span className="text-blue-500 font-bold uppercase tracking-widest">Software Engineer</span> skilled in designing scalable systems, 
                REST APIs, and real-time applications using Node.js and Python. Experienced in WebRTC-based communication, event-driven architectures, and AI-integrated systems.
              </p>

              <p className="about-para-3 text-gray-400 text-sm md:text-base leading-relaxed">
                My research interests span{" "}
                {["Distributed Systems", "Computer Graphics", "Computer Vision", "Machine Learning", "Visual Computing", "Real-Time Systems", "Human-Computer Interaction", "AI-assisted Content Creation"].map((interest, i, arr) => (
                  <span key={interest}>
                    <span className="text-white font-semibold">{interest}</span>
                    {i < arr.length - 1 ? ", " : "."}
                  </span>
                ))}
              </p>
            </div>

            {/* STATS GRID */}
            <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="stat-card flex flex-col items-center justify-center bg-[#111] border border-gray-800 rounded-2xl p-4 shadow-md">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">CGPA</span>
                <span ref={cgpaRef} className="text-xl md:text-3xl font-bold text-blue-500 italic">0.00</span>
              </div>
              <div className="stat-card flex flex-col items-center justify-center bg-[#111] border border-gray-800 rounded-2xl p-4 shadow-md">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Projects</span>
                <span ref={majorRef} className="text-xl md:text-3xl font-bold text-blue-500 italic">0</span>
              </div>
              <div className="stat-card flex flex-col items-center justify-center bg-[#111] border border-gray-800 rounded-2xl p-4 shadow-md">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Hackathons</span>
                <span className="text-xl md:text-3xl font-bold text-blue-500 italic">2+</span>
              </div>
              <div className="stat-card flex flex-col items-center justify-center bg-[#111] border border-gray-800 rounded-2xl p-4 shadow-md">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Certs</span>
                <span ref={certRef} className="text-xl md:text-3xl font-bold text-blue-500 italic">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}