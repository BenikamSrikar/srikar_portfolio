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

  const cgpaRef = useRef(null);
  const majorRef = useRef(null);
  const certRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.from(profileRef.current, { x: -200, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: profileRef.current, start: "top 90%" } });
        gsap.from(".about-title", { x: 200, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".about-title", start: "top 90%" } });
        gsap.from(".about-para", { opacity: 0, y: 30, duration: 1, ease: "power2.out", stagger: 0.2, scrollTrigger: { trigger: ".about-para-1", start: "top 85%" } });

        const cards = gsap.utils.toArray(".stat-card");
        gsap.fromTo(cards, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: cardsRef.current, start: "top 95%" } });

        const animateCounter = (ref, target, decimals = 0) => {
          let obj = { val: 0 };
          gsap.to(obj, { val: target, duration: 2, delay: 0.5, ease: "power3.out", scrollTrigger: { trigger: cardsRef.current, start: "top 95%" }, onUpdate: () => { if (ref.current) ref.current.innerText = obj.val.toFixed(decimals); } });
        };
        animateCounter(cgpaRef, 8.45, 2);
        animateCounter(majorRef, 2, 0);
        animateCounter(certRef, 4, 0);
      }, sectionRef);
    }, 100);
    return () => { clearTimeout(timeoutId); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center p-6 md:p-20">
      
      <div className="relative z-10 w-full max-w-7xl">
        <h2 className="text-3xl md:text-6xl font-black mb-20 text-center tracking-tighter uppercase italic text-black">
          About <span className="text-blue-600">Me</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center justify-center w-full mx-auto">
          
          {/* PROFILE IMAGE */}
          <div ref={profileRef} className="flex-shrink-0">
            <div className="w-64 h-64 md:w-96 md:h-96 rounded-full p-2 bg-white shadow-[0_0_30px_rgba(0,0,0,0.1)] border-4 border-blue-600">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src="/images/profile.png" alt="Benikam Srikar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col space-y-10 w-full md:w-3/5">
            <div className="space-y-6 text-center md:text-left">
              <h3 className="about-title text-3xl md:text-5xl font-black text-black italic tracking-tighter uppercase">
                BENIKAM <span className="text-blue-600">SRIKAR</span>
              </h3>

              <p className="about-para about-para-1 text-gray-600 text-base md:text-lg leading-relaxed">
                I am currently pursuing my B.Tech in Computer Science at <span className="text-black font-semibold">Sasi Institute of Technology and Engineering</span>. 
                My academic journey began at <span className="text-black font-semibold">Queens International School, Hyderabad</span>, followed by my intermediate studies at <span className="text-black font-semibold">Narayana Junior College, Hyderabad</span>.
              </p>

              <p className="about-para about-para-2 text-gray-700 text-sm md:text-base leading-relaxed border-l-4 border-blue-600 pl-6 py-2 bg-gray-50 rounded-r-xl">
                I am a <span className="text-blue-600 font-bold uppercase tracking-widest">Software Engineer</span> skilled in designing scalable systems, 
                REST APIs, and real-time applications using Node.js and Python.
              </p>

              <p className="about-para about-para-3 text-gray-600 text-sm md:text-base leading-relaxed">
                My research interests span{" "}
                {["Distributed Systems", "Computer Graphics", "Computer Vision", "Machine Learning", "Visual Computing", "Real-Time Systems", "Human-Computer Interaction", "AI-assisted Content Creation"].map((interest, i, arr) => (
                  <span key={interest}>
                    <span className="text-black font-semibold">{interest}</span>
                    {i < arr.length - 1 ? ", " : "."}
                  </span>
                ))}
              </p>
            </div>

            {/* STATS GRID */}
            <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[ {ref: cgpaRef, label: "CGPA", val: "0.00"}, {ref: majorRef, label: "Projects", val: "0"}, {label: "Hackathons", val: "2+"}, {ref: certRef, label: "Certs", val: "0"} ].map((stat, i) => (
                <div key={i} className="stat-card flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-2xl p-4 shadow-sm">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{stat.label}</span>
                  <span ref={stat.ref} className="text-xl md:text-3xl font-bold text-blue-600 italic">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}