"use client";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ExternalLink, Sparkles, User, Users, ArrowUpRight } from 'lucide-react';
import './ChromaGrid.css';

export const ChromaGrid = ({
  items = [],
  onSelect,
  className = '',
  radius = 300,
  columns = 2,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const data = items;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    if (!rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    if (fadeRef.current) {
      gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
    }
  };

  const handleLeave = () => {
    if (fadeRef.current) {
      gsap.to(fadeRef.current, {
        opacity: 1,
        duration: fadeOut,
        overwrite: true
      });
    }
  };

  const handleCardClick = item => {
    if (onSelect) {
      onSelect(item);
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove = e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{
        '--r': `${radius}px`,
        '--cols': columns,
        '--rows': rows
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={c.id || i}
          className="chroma-card group"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c)}
          style={{
            '--card-border': c.borderColor || '#ea580c',
            '--card-gradient': c.gradient || 'linear-gradient(145deg, #1e293b, #0f172a)'
          }}
        >
          {/* Card Top Badges */}
          <div className="chroma-badges">
            <span className={`badge-type ${c.projectType === 'Indie Project' ? 'indie' : 'team'}`}>
              {c.projectType === 'Indie Project' ? <User size={12} /> : <Users size={12} />}
              {c.projectType}
            </span>
            {c.isFeatured && (
              <span className="badge-featured">
                <Sparkles size={12} /> Featured
              </span>
            )}
          </div>

          {/* Image Container */}
          <div className="chroma-img-wrapper">
            <img src={c.image} alt={c.title} loading="lazy" />
            <div className="chroma-img-overlay" />
          </div>

          {/* Card Content Info */}
          <footer className="chroma-info">
            <div className="chroma-title-block">
              <h3 className="name">{c.title}</h3>
              <p className="subtitle">{c.subtitle}</p>
            </div>
            
            <div className="chroma-action-hint">
              <span>View Details</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            {/* Tech Stack Pills */}
            {c.techStack && (
              <div className="chroma-tech-pills">
                {c.techStack.slice(0, 4).map((tech, idx) => (
                  <span key={idx} className="tech-pill">{tech}</span>
                ))}
                {c.techStack.length > 4 && (
                  <span className="tech-pill more">+{c.techStack.length - 4}</span>
                )}
              </div>
            )}
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
