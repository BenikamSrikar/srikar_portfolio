"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Home, User, Code, FolderGit2, Award, Mail, Wrench, Map, Trophy } from "lucide-react";

const navItems = [
  { name: "home", icon: Home, id: "home" },
  { name: "about", icon: User, id: "about" },
  { name: "skills", icon: Code, id: "skills" },
  { name: "tools", icon: Wrench, id: "toolsandframeworks" },
  { name: "projects", icon: FolderGit2, id: "projects" },
  { name: "journey", icon: Map, id: "experience" },
  { name: "hackathon", icon: Trophy, id: "hackathon" },
  { name: "certification", icon: Award, id: "certification" },
  { name: "contact", icon: Mail, id: "contact" },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState("home");
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    // Use IntersectionObserver to reliably detect which section is active
    // Loosen threshold and add rootMargin so tall sections are detected earlier
    const observerOptions = { root: null, rootMargin: '-20% 0px -20% 0px', threshold: 0.25 };
    const observer = new IntersectionObserver((entries) => {
      // pick the entry with largest intersectionRatio that's intersecting
      let best = null;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
      }
      if (best) setActiveId(best.target.id);
    }, observerOptions);

    const observedIds = new Set();
    const attachSections = () => {
      const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
      sections.forEach((el) => {
        if (!observedIds.has(el.id)) {
          observer.observe(el);
          observedIds.add(el.id);
        }
      });
    };

    attachSections();

    // watch for dynamically added sections (Next mounts client components after Navbar)
    const mo = new MutationObserver(() => {
      attachSections();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // run once on mount to set initial active item
    if (document.getElementById(activeId)) {
      // no-op
    } else {
      setActiveId('home');
    }

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  // keep dock always visible (no autohide)
  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <motion.div
        // FIXED: Switched from pageX to clientX to match viewport tracking perfectly
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-center h-[64px] gap-2 px-3 py-1 bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl"
      >
        {navItems.map((item) => (
          <DockIcon key={item.name} mouseX={mouseX} item={item} active={activeId === item.id} onNavigate={(id) => {
            const target = document.getElementById(id);
            if (target) {
              // set active immediately so UI updates while scrolling
              setActiveId(id);
              target.scrollIntoView({ behavior: "smooth", block: "center" });
            } else if (id === "home") {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveId('home');
            }
          }} />
        ))}
      </motion.div>
    </motion.nav>
  );
}

function DockIcon({ mouseX, item, active, onNavigate }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // MAGNIFICATION TUNING:
  // Reduced overall dock button size and hover growth so it no longer dominates the bottom UX.
  const widthSync = useTransform(distance, [-100, 0, 100], [40, 72, 40]);
  
  // Custom spring constants balance fast mouse sweeps without losing elastic feedback
  const width = useSpring(widthSync, { mass: 0.08, stiffness: 150, damping: 12 });

  return (
    <div className="relative group flex flex-col items-center justify-end">
      <span className="absolute -top-12 px-3 py-1 bg-black text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest shadow-xl whitespace-nowrap z-50">
        {item.name}
      </span>
      
      <motion.button
        ref={ref}
        style={{ width, height: width }}
        onClick={() => {
          if (onNavigate) onNavigate(item.id);
        }}
        whileTap={{ scale: 0.8, rotate: [0, -10, 10, -5, 5, 0] }}
        className={`rounded-2xl flex items-center justify-center transition-colors duration-300 ${
          active ? "bg-orange-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-orange-100"
        }`}
      >
        <item.icon className="w-[45%] h-[45%]" />
      </motion.button>
    </div>
  );
}