"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import VEDAPlaceholder from "./VEDAPlaceholder";

const ImageSplitter = ({ 
  beforeImage, 
  afterImage, 
  beforeLabel = "Before", 
  afterLabel = "After",
  className = "",
  usePlaceholder = false 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Add smooth scrolling and better event handling
  useEffect(() => {
    const preventDefault = (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    document.addEventListener('selectstart', preventDefault);
    document.addEventListener('dragstart', preventDefault);

    return () => {
      document.removeEventListener('selectstart', preventDefault);
      document.removeEventListener('dragstart', preventDefault);
    };
  }, [isDragging]);

  const updateSliderPosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  }, [updateSliderPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSliderPosition(e.clientX);
  }, [isDragging, updateSliderPosition]);

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX);
  }, [updateSliderPosition]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX);
  }, [isDragging, updateSliderPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse event handlers
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div 
      className={`relative w-full h-64 md:h-80 lg:h-96 overflow-hidden cursor-grab active:cursor-grabbing select-none ${className}`}
      ref={containerRef}
      style={{ userSelect: 'none', WebkitUserSelect: 'none', minHeight: '200px' }}
    >
      {/* After Image/Content (Left side - new.png - AI Enhanced) */}
      <div className="absolute inset-0">
        {usePlaceholder ? (
          <VEDAPlaceholder type="after" />
        ) : (
          <img
            src={afterImage}
            alt={afterLabel}
            className="w-full h-full object-cover"
            draggable={false}
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          />
        )}
        {/* After Label */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-semibold z-30">
          {afterLabel}
        </div>
      </div>

      {/* Before Image/Content (Right side - 0001.png - Noisy) with clipping */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 0 0 ${sliderPosition}%)`,
        }}
      >
        {usePlaceholder ? (
          <VEDAPlaceholder type="before" />
        ) : (
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="w-full h-full object-cover"
            draggable={false}
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          />
        )}
        {/* Before Label */}
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-semibold z-30">
          {beforeLabel}
        </div>
      </div>

      {/* Interactive Overlay for Slider */}
      <div 
        className="absolute inset-0 z-40"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      />

      {/* Slider Line and Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-50 pointer-events-none"
        style={{ 
          left: `${sliderPosition}%`, 
          transform: 'translateX(-50%)',
          boxShadow: '0 0 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.5)'
        }}
      >
        {/* Slider Handle */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center z-60 border-2 border-gray-200 pointer-events-auto"
          style={{ 
            transform: 'translate(-50%, -50%)',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            scale: isDragging ? 1.15 : 1,
            boxShadow: isDragging 
              ? '0 8px 30px rgba(0,0,0,0.25), 0 0 0 4px rgba(59,130,246,0.6)'
              : '0 4px 20px rgba(0,0,0,0.15), 0 0 0 3px rgba(255,255,255,0.9)'
          }}
          transition={{ duration: 0.2 }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Double arrow icon */}
          <div className="flex items-center text-gray-700">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.5 7l-4 5 4 5V7z"/>
              <path d="M15.5 17l4-5-4-5v10z"/>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-mono z-30">
        <span className="opacity-90">{Math.round(sliderPosition)}%</span>
      </div>
    </div>
  );
};

export default ImageSplitter;