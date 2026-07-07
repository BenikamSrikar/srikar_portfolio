"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, ExternalLink, Github } from "lucide-react";

const hackathonItems = [
  {
    id: 1,
    date: "May 2026",
    title: "Google Gen AI Hackathon",
    subtitle: "Mind Mitra",
    partner: "Google",
    logo: "/images/Hackathon/001.png",
    platform: "Hack2Skill",
    role: "DevOps",
    description: "Built a mental wellness web application prototype called Mind Mitra. This was our first hackathon entry, focusing on deployment workflow, monitoring, and team collaboration.",
    highlights: [
      "Mental wellness prototype",
      "Role: DevOps",
      "Platform: Hack2Skill"
    ],
    certificate: "/images/activities/Hack2skill-Certificate.png",
    actionLabel: "View Certificate",
    actionType: "certificate"
  },
  {
    id: 2,
    date: "Jun 2026",
    title: "AI for Bharath by AWS",
    subtitle: "jansaarth ai",
    partner: "AWS",
    logo: "/images/Hackathon/002.png",
    platform: "AWS Hackathon",
    role: "Frontend Quality Assurance Engineer",
    description: "Built a civic-sense web prototype that helps farmers, students, and job seekers understand government schemes. NLP models summarize bureaucratic language into simple, actionable guidance.",
    highlights: [
      "Problem domain: civic sense",
      "Project: jansaarth ai",
      "Outcome: simplified government scheme guidance"
    ],
    repo: "https://github.com/your-github/jansaarth-ai",
    actionLabel: "View GitHub",
    actionType: "repo"
  },
  {
    id: 3,
    date: "Apr 2026",
    title: "AMD Slingshot Hackathon",
    subtitle: "Smart Facility Digital Twin",
    partner: "AMD",
    partnerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/2560px-AMD_Logo.svg.png",
    platform: "AMD Slingshot",
    role: "UI/UX Designer",
    description: "Built a cost-effective Smart Facility Digital Twin with real-time occupancy visualization and peak-hour forecasting using a lightweight IoT-free architecture.",
    highlights: [
      "Real-time occupancy visualization",
      "Peak-hour forecasting",
      "Lightweight IoT-free architecture"
    ],
    actionLabel: "View Project",
    actionType: "project"
  },
  {
    id: 4,
    date: "Jun 2026",
    title: "Google Solution Challenge",
    subtitle: "Google Developer Student Clubs",
    partner: "Google",
    partnerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
    platform: "Google Solution Challenge",
    role: "Hackathon Participant",
    description: "Built a solution for local community problems using Google technologies under the global GDSC challenge framework.",
    highlights: [
      "Community-focused solution",
      "Built with Google technologies",
      "Part of the global GDSC challenge"
    ],
    actionLabel: "View Project",
    actionType: "project"
  }
];

const LogoBox = ({ logo, partnerLogo, alt, forwardedRef }) => {
  const displayLogo = partnerLogo || logo;
  
  return (
    <div ref={forwardedRef} className="relative h-28 w-28 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm p-4">
      {displayLogo ? (
        <img
          src={displayLogo}
          alt={alt}
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
          {alt || "Logo"}
        </div>
      )}
    </div>
  );
};

export default function Hackathon() {
  const [activeModal, setActiveModal] = useState(null);
  const sectionRef = useRef(null);
  const entryRefs = useRef([]);
  const logoRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states with will-change for performance
      gsap.set(entryRefs.current, { opacity: 0, y: 20, willChange: "transform, opacity" });
      gsap.set(logoRefs.current, { scale: 0.8, opacity: 0, willChange: "transform, opacity" });

      // Simpler, faster animations
      entryRefs.current.forEach((entry, index) => {
        if (!entry) return;
        gsap.to(entry, { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: entry,
            start: "top 85%",
            once: true
          },
          onComplete: () => gsap.set(entry, { willChange: "auto" })
        });
        
        if (logoRefs.current[index]) {
          gsap.to(logoRefs.current[index], { 
            scale: 1, 
            opacity: 1, 
            duration: 0.4, 
            delay: index * 0.1 + 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: entry,
              start: "top 85%",
              once: true
            },
            onComplete: () => gsap.set(logoRefs.current[index], { willChange: "auto" })
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderAction = (item) => {
    if (item.actionType === "certificate") {
      return (
        <button
          onClick={() => setActiveModal({ title: item.title, image: item.certificate })}
          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
        >
          <ExternalLink size={16} />
          {item.actionLabel}
        </button>
      );
    }

    if (item.actionType === "repo" && item.repo) {
      return (
        <a
          href={item.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          <Github size={16} />
          {item.actionLabel}
        </a>
      );
    }

    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900">
        {item.actionLabel}
      </span>
    );
  };

  return (
    <section id="hackathon" ref={sectionRef} className="w-full bg-[#f9fafb] text-slate-900 py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-600">Hack-a-thon Participation</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-slate-900">Hack-a-thon Partitipation</h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base leading-7 text-slate-600">
            Explore the hackathon projects, prototypes, certificates, and platform experiences that shaped my AI development journey.
          </p>
        </div>

        <div className="space-y-16">
          {hackathonItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (entryRefs.current[index] = el)}
              className={`grid items-center gap-8 rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-slate-200 ${index % 2 === 1 ? "lg:grid-cols-[1fr_0.95fr] lg:grid-flow-col-dense" : "lg:grid-cols-[0.95fr_1fr]"}`}
            >
              {index % 2 === 1 ? (
                <>
                  <div className="order-2 lg:order-1 flex flex-col justify-center gap-4">
                    <h3 className="text-3xl font-black text-orange-600">{item.title}</h3>
                    <p className="text-base font-medium text-slate-900">{item.subtitle}</p>
                    <p className="text-sm leading-relaxed text-slate-700">{item.description}</p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">{item.platform}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">{item.role}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-4">
                      {item.actionType === "certificate" ? (
                        <button
                          onClick={() => setActiveModal({ title: item.title, image: item.certificate })}
                          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
                        >
                          <ExternalLink size={16} />
                          {item.actionLabel}
                        </button>
                      ) : (
                        <a
                          href={item.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                        >
                          <Github size={16} />
                          {item.actionLabel}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="order-1 lg:order-2 flex justify-center">
                    <div className="relative overflow-hidden rounded-[2rem] bg-slate-50 p-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-200/50 via-transparent to-slate-100/40" />
                      <div className="relative flex h-44 w-44 items-center justify-center">
                        <LogoBox
                          logo={item.logo}
                          partnerLogo={item.partnerLogo}
                          forwardedRef={(el) => (logoRefs.current[index] = el)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <div className="relative overflow-hidden rounded-[2rem] bg-slate-50 p-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-200/50 via-transparent to-slate-100/40" />
                      <div className="relative flex h-44 w-44 items-center justify-center">
                        <LogoBox
                          logo={item.logo}
                          partnerLogo={item.partnerLogo}
                          forwardedRef={(el) => (logoRefs.current[index] = el)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-4">
                    <h3 className="text-3xl font-black text-orange-600">{item.title}</h3>
                    <p className="text-base font-medium text-slate-900">{item.subtitle}</p>
                    <p className="text-sm leading-relaxed text-slate-700">{item.description}</p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">{item.platform}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">{item.role}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-4">
                      {item.actionType === "certificate" ? (
                        <button
                          onClick={() => setActiveModal({ title: item.title, image: item.certificate })}
                          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
                        >
                          <ExternalLink size={16} />
                          {item.actionLabel}
                        </button>
                      ) : (
                        <a
                          href={item.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                        >
                          <Github size={16} />
                          {item.actionLabel}
                        </a>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {activeModal ? (
        <div
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
              aria-label="Close certificate modal"
            >
              <X size={18} />
            </button>

            <div className="h-[calc(100vh-160px)] overflow-hidden bg-slate-50">
              <img
                src={activeModal.image}
                alt={activeModal.title}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">{activeModal.title}</p>
              <p>Click outside the panel or close to exit.</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
