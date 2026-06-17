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
        
        // Profile image slides from left
        gsap.from(profileRef.current, {
          x: -200,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: profileRef.current,
            start: "top 90%",
          },
        });

        // Animate title from right
        gsap.from(".about-title", {
          x: 200,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 90%",
          },
        });

        // Animate paragraphs - fade in on scroll
        gsap.from(".about-para-1", {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-para-1",
            start: "top 85%",
          },
        });

        gsap.from(".about-para-2", {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-para-2",
            start: "top 85%",
          },
        });

        gsap.from(".about-para-3", {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-para-3",
            start: "top 85%",
          },
        });

        // 2. Individual Card Animations - from right
        const cards = gsap.utils.toArray(".stat-card");

        gsap.fromTo(cards[0], 
          { x: 200, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 95%" } }
        );

        gsap.fromTo([cards[1], cards[2]], 
          { x: 200, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 95%" } }
        );

        gsap.fromTo(cards[3], 
          { x: 200, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 95%" } }
        );

        // 3. Counter Logic
        const animateCounter = (ref, target, decimals = 0) => {
          let obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            delay: 1, 
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 95%" },
            onUpdate: () => {
              if (ref.current) ref.current.innerText = obj.val.toFixed(decimals);
            },
          });
        };

        animateCounter(cgpaRef, 8.45, 2);
        animateCounter(majorRef, 2);
        animateCounter(certRef, 4);

      }, sectionRef);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Particle evaporation effect - blue particles rising from bottom to top
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const section = sectionRef.current;
    
    const resizeCanvas = () => {
      if (section) {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle array
    const particles = [];
    const maxParticles = 50;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.size = 1 + Math.random() * 3;
        this.speedY = -0.5 - Math.random() * 1.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = 0.3 + Math.random() * 0.5;
        this.life = 1;
        this.decay = 0.003 + Math.random() * 0.005;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.life -= this.decay;
        
        // Reset particle if it fades out or goes off screen
        if (this.life <= 0 || this.y < -10) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity * this.life})`;
        ctx.shadowColor = 'rgba(37, 99, 235, 0.5)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
      // Stagger initial positions
      particles[i].y = canvas.height - (i * canvas.height / maxParticles);
    }

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate();
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        }
      });
    }, { threshold: 0.1 });

    if (section) {
      observer.observe(section);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#f8faff] text-slate-800 flex flex-col items-center justify-center p-6 md:p-20 overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Animated dots background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* White gradient overlay - white at top, transparent at bottom */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: 'linear-gradient(to bottom, #f8faff 0%, rgba(248, 250, 255, 0.8) 20%, transparent 50%)',
          zIndex: 2 
        }}
      />

      <div className="relative z-10 w-full">
        <h2 className="text-3xl md:text-6xl font-black mb-12 md:mb-20 text-center tracking-tighter uppercase italic text-slate-900">
          About <span className="text-blue-600">Me</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center justify-center max-w-7xl w-full mx-auto">
        
          {/* LEFT SIDE: PROFILE IMAGE */}
          <div ref={profileRef} className="flex-shrink-0">
            <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-blue-600 p-1 shadow-[0_0_60px_rgba(37,99,235,0.2)] flex justify-center items-center relative">
              <div className="absolute inset-0 rounded-full blur-2xl bg-blue-400/10"></div>
              <div className="w-full h-full bg-white rounded-full overflow-hidden border-4 border-white relative z-10">
                <img 
                  src="/images/profile.png" 
                  alt="Benikam Srikar" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: DESCRIPTION & STATS */}
          <div className="flex flex-col space-y-10 w-full md:w-3/5">
            
            <div className="space-y-6 text-center md:text-left">
              <h3 className="about-title text-3xl md:text-5xl font-black text-slate-900 italic tracking-tighter uppercase">
                BENIKAM <span className="text-blue-600">SRIKAR</span>
              </h3>

              {/* Paragraph 1 */}
              <p className="about-para-1 text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                I am currently pursuing my B.Tech in Computer Science at 
                <span className="text-slate-900 font-semibold"> Sasi Institute of Technology and Engineering</span>. 
                My academic journey began at <span className="text-slate-900 font-semibold">Queens International School, Hyderabad</span>, 
                followed by my intermediate studies at <span className="text-slate-900 font-semibold">Narayana Junior College, Hyderabad</span>. 
                This journey has led me to my current focus on building practical and efficient software solutions.
              </p>

              {/* Paragraph 2: Core Focus */}
              <p className="about-para-2 text-slate-500 text-sm md:text-base leading-relaxed border-l-4 border-blue-600 pl-6 py-2 bg-blue-50 rounded-r-xl">
                I am a <span className="text-blue-600 font-bold uppercase tracking-widest">Software Engineer</span> skilled in designing scalable systems, 
                REST APIs, and real-time applications using Node.js and Python. 
                Experienced in WebRTC-based communication, event-driven architectures, and AI-integrated systems. 
                I focus on architecting robust backend solutions that ensure seamless integration and overall system reliability.
              </p>

              {/* Paragraph 3: Research Interests */}
              <p className="about-para-3 text-slate-500 text-sm md:text-base leading-relaxed">
                My research interests span{" "}
                {[
                  "Distributed Systems",
                  "Computer Graphics",
                  "Computer Vision",
                  "Machine Learning",
                  "Visual Computing",
                  "Real-Time Systems",
                  "Human-Computer Interaction",
                  "AI-assisted Content Creation",
                ].map((interest, i, arr) => (
                  <span key={interest}>
                    <span className="text-slate-800 font-semibold">{interest}</span>
                    {i < arr.length - 1 ? ", " : "."}
                  </span>
                ))}
              </p>
            </div>

            {/* STATS GRID */}
            <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ transformStyle: "preserve-3d" }}>
              
              <div className="stat-card flex flex-col items-center justify-center bg-white border border-blue-100 rounded-2xl p-4 md:p-6 shadow-md shadow-blue-100/50 opacity-0">
                <span className="text-[10px] md:text-xs text-slate-500 font-black uppercase tracking-widest mb-1">CGPA</span>
                <span ref={cgpaRef} className="text-xl md:text-3xl font-bold text-blue-600 italic">0.00</span>
              </div>
              
              <div className="stat-card flex flex-col items-center justify-center bg-white border border-blue-100 rounded-2xl p-4 md:p-6 shadow-md shadow-blue-100/50 opacity-0">
                <span className="text-[10px] md:text-xs text-slate-500 font-black uppercase tracking-widest mb-1 text-center">Projects</span>
                <span ref={majorRef} className="text-xl md:text-3xl font-bold text-blue-600 italic">0</span>
              </div>

              <div className="stat-card flex flex-col items-center justify-center bg-white border border-blue-100 rounded-2xl p-4 md:p-6 shadow-md shadow-blue-100/50 opacity-0">
                <span className="text-[10px] md:text-xs text-slate-500 font-black uppercase tracking-widest mb-1 text-center">Hackathons</span>
                <span className="text-xl md:text-3xl font-bold text-blue-600 italic">2+</span>
              </div>

              <div className="stat-card flex flex-col items-center justify-center bg-white border border-blue-100 rounded-2xl p-4 md:p-6 shadow-md shadow-blue-100/50 opacity-0">
                <span className="text-[10px] md:text-xs text-slate-500 font-black uppercase tracking-widest mb-1">Certs</span>
                <span ref={certRef} className="text-xl md:text-3xl font-bold text-blue-600 italic">0</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
