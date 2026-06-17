"use client";
import { useState, useEffect, useRef, Fragment } from "react";
import gsap from "gsap";
import {
  Home, User, Zap, FolderOpen, GraduationCap, Award
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home",          label: "Home",          icon: Home },
  { id: "about",         label: "About",         icon: User },
  { id: "skills",        label: "Skills",        icon: Zap },
  { id: "education",     label: "Education",     icon: GraduationCap },
  { id: "projects",      label: "Projects",      icon: FolderOpen },
  { id: "certifications",label: "Certs",         icon: Award },
];

function DockItem({ id, label, icon: Icon, isActive, hoveredId, onHover, onLeave, itemRef }) {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = (e) => {
    setIsBouncing(true);
    setTimeout(() => {
      setIsBouncing(false);
    }, 800);

    if (id === "home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Remove any hash from URL
      if (window.location.hash) {
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    }
  };

  return (
    <a
      ref={itemRef}
      href={id === "home" ? "#" : `#${id}`}
      onClick={handleClick}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={onLeave}
      className={`
        relative flex items-center justify-center
        rounded-full border ease-out group
        origin-bottom
        ${isBouncing ? "animate-mac-bounce" : ""}
        ${isActive
          ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/30"
          : "bg-white/10 border-white/10 text-slate-200 hover:text-white hover:border-blue-500 hover:bg-blue-600"
        }
      `}
      style={{
        width: "44px",
        height: "44px",
        transition: "transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s",
      }}
    >
      {/* Icon */}
      <Icon size={18} strokeWidth={2} className="transition-transform duration-200 group-hover:scale-110" />

      {/* Tooltip Popup (macOS style with grey shade blur background) */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 scale-90 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 z-[100] whitespace-nowrap">
        <div className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg shadow-md border border-white/10">
          {label}
        </div>
        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-slate-900/80 mx-auto -mt-[1px]"></div>
      </div>

      {/* Active Dot Indicator */}
      {isActive && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)]"></span>
      )}
    </a>
  );
}

export default function Dock({ isVisible }) {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredId, setHoveredId] = useState(null);
  const dockRef = useRef(null);
  const hasEntered = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Show / hide animation
  useEffect(() => {
    if (!dockRef.current) return;

    if (isVisible) {
      if (!hasEntered.current) {
        gsap.fromTo(dockRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.8 }
        );
        hasEntered.current = true;
      } else {
        gsap.to(dockRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", display: "block" });
      }
    } else {
      gsap.to(dockRef.current, {
        y: 100, opacity: 0, duration: 0.5, ease: "power3.in",
        onComplete: () => { if (!isVisible) gsap.set(dockRef.current, { display: "none" }); }
      });
    }
  }, [isVisible]);

  // Active section tracker with scroll position fallback
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map(i => i.id);
    
    // Scroll-based section detection as fallback
    const handleScroll = () => {
      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Debounce section detection
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.4; // 40% down from top
        
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const element = document.getElementById(sectionIds[i]);
          if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.scrollY;
            if (offsetTop <= scrollPosition) {
              setActiveSection(sectionIds[i]);
              break;
            }
          }
        }
      }, 100); // 100ms debounce
    };
    
    // Intersection Observer for fine-tuning
    const observer = new IntersectionObserver((entries) => {
      let maxRatio = 0;
      let mostVisibleSection = null;
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleSection = entry.target.id;
        }
      });
      
      // Only update if we have a clear winner with significant visibility
      if (mostVisibleSection && maxRatio > 0.3) {
        setActiveSection(mostVisibleSection);
      }
    }, { 
      rootMargin: "-10% 0px -70% 0px", // Conservative margins
      threshold: [0.1, 0.3, 0.5, 0.7] // Focus on meaningful thresholds
    });

    // Use scroll as primary, intersection observer as secondary
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial section

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const itemRefs = useRef([]);

  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    itemRefs.current.forEach((ref) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - itemCenter);
      
      const maxDistance = 160; // Proximity in px
      const maxScale = 1.65; // Max magnification scale
      const maxTranslateY = -10; // Float up in px
      
      if (distance < maxDistance) {
        const factor = (maxDistance - distance) / maxDistance;
        const scale = 1 + (maxScale - 1) * Math.sin(factor * Math.PI / 2);
        const translateY = maxTranslateY * Math.sin(factor * Math.PI / 2);
        ref.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      } else {
        ref.style.transform = `scale(1) translateY(0px)`;
      }
    });
  };

  const handleMouseLeave = () => {
    itemRefs.current.forEach((ref) => {
      if (!ref) return;
      ref.style.transform = `scale(1) translateY(0px)`;
    });
  };

  return (
    <div
      ref={dockRef}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-fit opacity-0"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <nav
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex items-end gap-4 px-5 py-2.5 rounded-3xl border border-white/10 shadow-2xl relative"
        style={{
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
        }}
      >
        {NAV_ITEMS.map(({ id, label, icon }, index) => (
          <Fragment key={id}>
            <DockItem
              id={id}
              label={label}
              icon={icon}
              isActive={activeSection === id}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              onLeave={() => setHoveredId(null)}
              itemRef={(el) => (itemRefs.current[index] = el)}
            />
            {index === 2 && (
              <div className="w-[1.5px] h-6 bg-white/20 self-center mx-2.5" />
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}
