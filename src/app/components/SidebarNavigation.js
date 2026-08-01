"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Code, FolderGit2, Award, Mail, Wrench, Map, Trophy } from "lucide-react";
import LineSidebar from "./LineSidebar";

const navItems = [
  { name: "Home", icon: Home, id: "home", label: "Home" },
  { name: "About", icon: User, id: "about", label: "About" },
  { name: "Skills", icon: Code, id: "skills", label: "Skills" },
  { name: "Tools", icon: Wrench, id: "toolsandframeworks", label: "Tools & Frameworks" },
  { name: "Projects", icon: FolderGit2, id: "projects", label: "Projects" },
  { name: "Journey", icon: Map, id: "experience", label: "Experience" },
  { name: "Hackathon", icon: Trophy, id: "hackathon", label: "Hackathon" },
  { name: "Certification", icon: Award, id: "certification", label: "Certification" },
  { name: "Contact", icon: Mail, id: "contact", label: "Contact" },
];

export default function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(true); // Expanded by default at About page
  const [activeId, setActiveId] = useState("home");
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      if (window.innerWidth < 1024) {
        setIsOpen(false); // Collapse on small screens
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    // Use IntersectionObserver to detect which section is active
    const observerOptions = { root: null, rootMargin: '-20% 0px -20% 0px', threshold: 0.25 };
    const observer = new IntersectionObserver((entries) => {
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

    const mo = new MutationObserver(() => {
      attachSections();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  const handleNavClick = (id) => {
    const target = document.getElementById(id);
    if (target) {
      setActiveId(id);
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveId('home');
    }
  };

  const handleItemClick = (index, label) => {
    const item = navItems[index];
    handleNavClick(item.id);
  };

  // Get only the text labels for LineSidebar
  const sidebarLabels = navItems.map(item => item.label);

  // Find active index based on activeId
  const activeIndex = navItems.findIndex(item => item.id === activeId);

  return (
    <>
      {/* Toggle Button - Fixed */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-6 top-6 z-50 p-3 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 transition-colors lg:hidden"
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Sidebar Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: isLargeScreen ? 0 : -300, opacity: isLargeScreen ? 1 : 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed left-0 top-0 h-screen ${
              isLargeScreen ? 'w-64' : 'w-72'
            } bg-gradient-to-b from-slate-950 to-slate-900 border-r border-slate-800/50 z-40 overflow-y-auto pt-20 px-8 lg:pt-24`}
            style={{
              boxShadow: 'inset -1px 0 0 rgba(255, 107, 53, 0.1)'
            }}
          >
            {/* Branding */}
            <div className="mb-12">
              <h2 className="text-2xl font-black text-white tracking-tight">
                <span className="text-orange-600">Srikar</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Portfolio</p>
            </div>

            {/* LineSidebar Navigation */}
            <LineSidebar
              items={sidebarLabels}
              accentColor="#ea580c"
              textColor="#94a3b8"
              markerColor="#475569"
              showIndex={false}
              showMarker={true}
              proximityRadius={120}
              maxShift={20}
              falloff="smooth"
              markerLength={50}
              markerGap={12}
              tickScale={0.6}
              scaleTick={true}
              itemGap={24}
              fontSize={0.95}
              smoothing={120}
              defaultActive={activeIndex >= 0 ? activeIndex : 0}
              onItemClick={(index) => handleItemClick(index, navItems[index].label)}
              className="text-left"
            />

            {/* Divider */}
            <div className="my-8 h-px bg-gradient-to-r from-slate-700 to-transparent" />

            {/* Quick Links */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Connect</p>
              <div className="flex gap-3">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-orange-600 text-slate-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-orange-600 text-slate-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-orange-600 text-slate-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 002.856-3.915 10 10 0 01-2.856.975 5 5 0 00-8.66 4.567 14.167 14.167 0 01-10.288-5.144 5 5 0 001.549 6.659 5.002 5.002 0 01-2.267-.616v.06a5 5 0 004.008 4.9 5 5 0 01-2.261.085 5.001 5.001 0 004.671 3.479 10.003 10.003 0 01-6.177 2.13c-.399 0-.779-.023-1.17-.067a14.047 14.047 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.986 0-.209 0-.42-.015-.63a9.935 9.935 0 002.457-2.549z"/></svg>
                </a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && !isLargeScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Content offset for larger screens */}
      <div className="lg:ml-64" />
    </>
  );
}
