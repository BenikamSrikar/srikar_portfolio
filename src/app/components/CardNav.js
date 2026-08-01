import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, ArrowUpRight, Home, User, Code, Hammer, Briefcase, FolderOpen, Trophy, Award } from 'lucide-react';
import './CardNav.css';

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, description: 'Welcome to my portfolio' },
    { id: 'about', label: 'About', icon: User, description: 'Know more about me' },
    { id: 'skills', label: 'Skills', icon: Code, description: 'My technical skills' },
    { id: 'toolsandframeworks', label: 'Technologies & Frameworks', icon: Hammer, description: 'Tools I work with' },
    { id: 'experience', label: 'Experience', icon: Briefcase, description: 'My professional journey' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, description: 'My best work' },
    { id: 'hackathon', label: 'Hack-a-thons', icon: Trophy, description: 'Competition wins' },
    { id: 'certification', label: 'Certifications', icon: Award, description: 'My achievements' }
  ];

  // Track active section
  useEffect(() => {
    // No need for intersection observer with static menu
    return () => {};
  }, []);

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    // Get content height
    const contentEl = navEl.querySelector('.card-nav-content');
    let contentHeight = 0;
    if (contentEl) {
      contentHeight = contentEl.scrollHeight;
    }

    const tl = gsap.timeline({ paused: true });

    // Animate height
    tl.to(navEl, {
      height: 60 + contentHeight,
      duration: 0.5,
      ease
    });

    // Animate cards
    const cards = navEl.querySelectorAll('.nav-card');
    if (cards.length > 0) {
      gsap.set(cards, { y: 20, opacity: 0 });
      tl.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease,
        stagger: 0.05
      }, '-=0.3');
    }

    return tl;
  };

  useLayoutEffect(() => {
    if (!navRef.current) return;

    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current || !navRef.current) return;

      if (isExpanded) {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const handleNavClick = (id) => {
    const target = document.getElementById(id);
    if (target) {
      setActiveId(id);
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsExpanded(false);
      setIsHamburgerOpen(false);
      const tl = tlRef.current;
      if (tl && isExpanded) {
        tl.reverse();
      }
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: '#fff' }}>
        {/* Top Bar */}
        <div className="card-nav-top">
          {/* Hamburger */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
              }
            }}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            aria-expanded={isExpanded}
            tabIndex={0}
            style={{ color: '#000' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          {/* Logo / Title */}
          <div className="logo-container">
            <span className="portfolio-title">Welcome to my portfolio</span>
          </div>

          {/* Social Buttons */}
          <div className="card-nav-buttons">
            <a
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="card-nav-social-button"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="card-nav-social-button"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Menu Cards Grid - 3 columns */}
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${idx}`}
                className="nav-card"
                ref={setCardRef(idx)}
                onClick={() => handleNavClick(item.id)}
              >
                {/* Icon with animation */}
                <div className="nav-card-icon-wrapper">
                  <Icon className="nav-card-icon" size={32} />
                </div>
                
                {/* Label */}
                <div className="nav-card-label">{item.label}</div>
                
                {/* Description */}
                <div className="nav-card-description">{item.description}</div>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
