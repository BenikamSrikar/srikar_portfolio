"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    
    const logoRef = useRef(null);
    const controlsRef = useRef(null);

    // 1. SCROLL & ENTRANCE ANIMATIONS
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50);
        };
        
        window.addEventListener("scroll", handleScroll, { passive: true });

        const tl = gsap.timeline({ delay: 0.3 });
        tl.fromTo([logoRef.current, controlsRef.current], 
            { y: -20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power4.out" }
        );

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // 2. MODAL TRANSITION LOGIC
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setIsAnimating(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsOpen(false);
            setIsMaximized(false);
            setIsSubmitted(false);
        }, 300);
    };

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if (!data.linkedin?.trim() && !data.github?.trim()) {
            alert("Please provide at least one social link!");
            return;
        }

        setIsSending(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                setIsSending(false);
                setIsSubmitted(true);
                setShowSuccess(true);
                
                // Auto-close after 3 seconds
                setTimeout(() => {
                    handleClose();
                }, 3000);
            } else {
                const errorData = await response.json().catch(() => ({}));
                alert(`Failed to send message: ${errorData.message || "Unknown error occurred"}`);
                setIsSending(false);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while sending your message. Please try again later.");
            setIsSending(false);
        }
    };

    return (
        <>
            {/* SUCCESS NOTIFICATION */}
            <div className={`fixed top-4 sm:top-6 right-2 sm:right-6 z-[200] w-[calc(100%-1rem)] sm:w-80 max-w-sm transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${showSuccess ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}>
                <div className="bg-white border border-slate-200 p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl flex items-center gap-3 sm:gap-4">
                    <div className="bg-green-500 h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center text-white shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div className="min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate">Success</h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 truncate">Message sent successfully.</p>
                    </div>
                </div>
            </div>

            {/* NAVBAR */}
            <nav className={`fixed top-0 left-0 w-full h-12 z-50 transition-all duration-500 ease-in-out
                ${showNavbar ? "translate-y-0" : "-translate-y-full"}
                ${isScrolled || isMobileMenuOpen ? "bg-white/10 backdrop-blur-md border-b border-white/10 shadow-sm" : "bg-transparent border-b border-transparent"}`}>
                
                <div className="max-w-7xl mx-auto h-full px-3 sm:px-4 md:px-10 flex items-center justify-between gap-4">
                    
                    {/* LEFT: LOGO */}
                    <div ref={logoRef} className="opacity-0">
                        <h1 
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                if (window.location.hash) {
                                    window.history.pushState("", document.title, window.location.pathname + window.location.search);
                                }
                            }}
                            className="font-black text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tighter flex items-center text-slate-800 cursor-pointer whitespace-nowrap hover:scale-105 transition-transform duration-200"
                        >
                            <span className={`transition-all duration-500 ease-out ${isScrolled ? "text-blue-600 opacity-100 w-auto pr-1" : "opacity-0 w-0 overflow-hidden"}`}>&lt;</span>
                            <span>Benikam</span>
                            <span className={`ml-1 transition-colors duration-500 ${isScrolled ? "text-blue-600" : "text-slate-800"}`}>Srikar</span>
                            <span className={`transition-all duration-500 ease-out ${isScrolled ? "text-blue-600 opacity-100 w-auto pl-1" : "opacity-0 w-0 overflow-hidden"}`}>/&gt;</span>
                        </h1>
                    </div>

                    {/* CENTER: NAVLINKS (Desktop) */}
                    <div ref={controlsRef} className="hidden md:flex items-center gap-6 lg:gap-8 opacity-0">
                        {["about","skills","education","experience","projects","credentials"].map((id) => (
                            <a key={id} href={`#${id}`}
                               onClick={(e) => {
                                   e.preventDefault();
                                   const targetId = id === "credentials" ? "activities" : id;
                                   const element = document.getElementById(targetId);
                                   if (element) {
                                       element.scrollIntoView({ behavior: 'auto', block: 'start' });
                                   }
                                   gsap.fromTo(e.currentTarget, 
                                       { scale: 0.85, color: "#2563eb" }, 
                                       { scale: 1, color: "#1e293b", duration: 0.4, ease: "back.out(1.7)" }
                                   );
                               }}
                               className="text-xs lg:text-sm font-bold text-slate-800 uppercase tracking-widest whitespace-nowrap hover:text-blue-600 transition-all duration-200">
                                {id}
                            </a>
                        ))}
                    </div>

                    {/* RIGHT: MOBILE MENU */}
                    <div className="flex justify-end items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
                        {/* MOBILE MENU TOGGLE */}
                        <button 
                            className="md:hidden p-1.5 sm:p-2 text-slate-800 hover:text-blue-600 transition-colors relative z-[60]"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU OVERLAY */}
            <div className={`fixed inset-0 z-[40] bg-white/95 backdrop-blur-md transition-all duration-300 md:hidden flex flex-col items-center justify-center ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="flex flex-col items-center gap-8">
                    {["home", "about","skills","education","experience","projects","credentials"].map((id) => (
                        <a key={id} href={id === "home" ? "#" : `#${id}`}
                           onClick={(e) => {
                               e.preventDefault();
                               setIsMobileMenuOpen(false);
                               if (id === "home") {
                                   window.scrollTo({ top: 0, behavior: 'auto' });
                                   if (window.location.hash) {
                                       window.history.pushState("", document.title, window.location.pathname + window.location.search);
                                   }
                               } else {
                                   const targetId = id === "credentials" ? "activities" : id;
                                   const element = document.getElementById(targetId);
                                   if (element) {
                                       element.scrollIntoView({ behavior: 'auto', block: 'start' });
                                   }
                               }
                               gsap.fromTo(e.currentTarget, 
                                   { scale: 0.85, color: "#2563eb" }, 
                                   { scale: 1, color: "#1e293b", duration: 0.4, ease: "back.out(1.7)" }
                               );
                           }}
                           className="text-2xl font-black text-slate-800 uppercase tracking-widest hover:text-blue-600 transition-all duration-200">
                            {id}
                        </a>
                    ))}
                </div>
            </div>

            {/* FLOATING CONTACT BUTTON - Bottom Right */}
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-110 active:scale-95 flex items-center justify-center group"
                title="Contact Me"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </button>

            {/* MODAL - macOS Mail Style */}
            {isOpen && (
                <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`} onClick={handleClose}>
                    <div 
                        className={`bg-[#e8e8e8] shadow-2xl relative overflow-hidden ${
                            isAnimating ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-10 opacity-0'
                        }`}
                        style={{
                            width: isMaximized ? '100vw' : '95%',
                            maxWidth: isMaximized ? '100vw' : '768px',
                            height: isMaximized ? '100vh' : 'auto',
                            maxHeight: isMaximized ? '100vh' : '90vh',
                            borderRadius: isMaximized ? '0px' : '8px',
                            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        
                        {/* Success Overlay with Confetti */}
                        {isSubmitted && (
                            <div className="absolute inset-0 bg-white z-50 flex items-center justify-center">
                                {/* Confetti Animation */}
                                <style>{`
                                    @keyframes confetti-fall {
                                        0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
                                        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                                    }
                                    .confetti {
                                        position: absolute;
                                        width: 10px;
                                        height: 10px;
                                        animation: confetti-fall 3s linear forwards;
                                    }
                                    @keyframes checkmark {
                                        0% { transform: scale(0) rotate(-45deg); opacity: 0; }
                                        50% { transform: scale(1.2) rotate(-45deg); opacity: 1; }
                                        100% { transform: scale(1) rotate(-45deg); opacity: 1; }
                                    }
                                    .checkmark {
                                        animation: checkmark 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
                                    }
                                `}</style>
                                
                                {/* Generate Confetti Pieces */}
                                {[...Array(50)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="confetti"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: '-10px',
                                            backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe'][Math.floor(Math.random() * 6)],
                                            animationDelay: `${Math.random() * 0.5}s`,
                                            animationDuration: `${2 + Math.random() * 2}s`,
                                        }}
                                    />
                                ))}
                                
                                {/* Success Checkmark */}
                                <div className="text-center z-10">
                                    <div className="inline-flex items-center justify-center w-32 h-32 bg-green-500 rounded-full mb-6 shadow-2xl">
                                        <svg className="checkmark w-20 h-20 text-white" viewBox="0 0 52 52">
                                            <path fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" d="M14 27l8 8 16-16" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-bold text-green-600 mb-2">Message Sent!</h3>
                                    <p className="text-slate-600">Thank you for reaching out. I'll get back to you soon.</p>
                                </div>
                            </div>
                        )}

                        {/* macOS Window Title Bar */}
                        <div className="bg-gradient-to-b from-[#e0e0e0] to-[#d1d1d1] border-b border-[#b8b8b8] px-4 py-2.5 flex items-center justify-between">
                            {/* Window Controls */}
                            <div className="flex items-center gap-2 group/controls">
                                {/* Close Button */}
                                <div className="relative">
                                    <button 
                                        onClick={handleClose}
                                        className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4136] border border-[#d94942] transition-colors flex items-center justify-center group peer"
                                        title="Close"
                                    >
                                        <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L7 7M1 7L7 1" stroke="#4a0000" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                    {/* Tooltip */}
                                    <div className="absolute left-0 top-6 bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10">
                                        Close (×)
                                    </div>
                                </div>
                                
                                {/* Maximize Button */}
                                <div className="relative">
                                    <button 
                                        onClick={toggleMaximize}
                                        className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#1fb437] border border-[#15a82d] transition-colors flex items-center justify-center group peer"
                                        title={isMaximized ? "Restore" : "Maximize"}
                                    >
                                        <svg className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            {isMaximized ? (
                                                <path d="M1 3L3 5L5 3M1 3L3 1L5 3" stroke="#004a00" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                            ) : (
                                                <path d="M1 1L5 1M1 5L5 5M1 1L1 5M5 1L5 5" stroke="#004a00" strokeWidth="1" strokeLinecap="round"/>
                                            )}
                                        </svg>
                                    </button>
                                    {/* Tooltip */}
                                    <div className="absolute left-0 top-6 bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10">
                                        {isMaximized ? 'Restore (⇲)' : 'Maximize (⛶)'}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Window Title */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 text-xs font-semibold text-[#4a4a4a] tracking-tight">
                                New Message
                            </div>
                            
                            <div className="w-16"></div>
                        </div>

                        {/* Mail Compose Window */}
                        <form onSubmit={handleSubmit} className={`bg-white flex flex-col`} style={{ height: isMaximized ? 'calc(100vh - 48px)' : 'auto', maxHeight: isMaximized ? 'calc(100vh - 48px)' : 'calc(90vh - 48px)' }}>
                            {/* Mail Headers */}
                            <div className="border-b border-[#d1d1d1] flex-shrink-0">
                                {/* From Field (Full Name) */}
                                <div className="flex items-center border-b border-[#e8e8e8] px-4 py-2 bg-gradient-to-b from-white to-[#fafafa]">
                                    <label className="text-xs font-semibold text-[#6a6a6a] w-20 shrink-0">From:</label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Your Full Name"
                                        className="flex-1 text-sm text-[#2a2a2a] bg-transparent border-none outline-none placeholder:text-[#a0a0a0]"
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="flex items-center border-b border-[#e8e8e8] px-4 py-2 bg-gradient-to-b from-white to-[#fafafa]">
                                    <label className="text-xs font-semibold text-[#6a6a6a] w-20 shrink-0">Email:</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="your.email@example.com"
                                        className="flex-1 text-sm text-[#2a2a2a] bg-transparent border-none outline-none placeholder:text-[#a0a0a0]"
                                    />
                                </div>

                                {/* LinkedIn Field */}
                                <div className="flex items-center border-b border-[#e8e8e8] px-4 py-2 bg-gradient-to-b from-white to-[#fafafa]">
                                    <label className="text-xs font-semibold text-[#6a6a6a] w-20 shrink-0">LinkedIn:</label>
                                    <input
                                        name="linkedin"
                                        type="url"
                                        placeholder="https://linkedin.com/in/yourprofile (Optional)"
                                        className="flex-1 text-sm text-[#2a2a2a] bg-transparent border-none outline-none placeholder:text-[#a0a0a0]"
                                    />
                                </div>

                                {/* GitHub Field */}
                                <div className="flex items-center border-b border-[#e8e8e8] px-4 py-2 bg-gradient-to-b from-white to-[#fafafa]">
                                    <label className="text-xs font-semibold text-[#6a6a6a] w-20 shrink-0">GitHub:</label>
                                    <input
                                        name="github"
                                        type="url"
                                        placeholder="https://github.com/yourusername (Optional)"
                                        className="flex-1 text-sm text-[#2a2a2a] bg-transparent border-none outline-none placeholder:text-[#a0a0a0]"
                                    />
                                </div>

                                {/* Subject Field */}
                                <div className="flex items-center px-4 py-2 bg-gradient-to-b from-white to-[#fafafa]">
                                    <label className="text-xs font-semibold text-[#6a6a6a] w-20 shrink-0">Subject:</label>
                                    <div className="flex-1 text-sm text-[#2a2a2a]">
                                        Portfolio Contact Request
                                    </div>
                                </div>
                            </div>

                            {/* Message Body - Flexible Height */}
                            <div className="p-4 bg-white flex-1 overflow-y-auto">
                                <textarea
                                    name="message"
                                    required
                                    placeholder="Type your message here..."
                                    className="w-full h-full text-sm text-[#2a2a2a] bg-transparent border-none outline-none resize-none placeholder:text-[#a0a0a0] leading-relaxed"
                                    style={{ minHeight: isMaximized ? '400px' : '280px' }}
                                />
                            </div>

                            {/* Bottom Toolbar */}
                            <div className="bg-gradient-to-b from-[#f5f5f5] to-[#e8e8e8] border-t border-[#d1d1d1] px-4 py-3 flex items-center justify-between flex-shrink-0">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className={`bg-gradient-to-b from-[#5a9cf4] to-[#4a8ce8] text-white text-xs font-semibold px-6 py-1.5 rounded border border-[#3d7cd4] shadow-sm transition-all ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:from-[#4a8ce8] hover:to-[#3a7cd8] active:scale-95'}`}
                                    >
                                        {isSending ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                                </svg>
                                                Send
                                            </span>
                                        )}
                                    </button>
                                </div>
                                
                                <div className="text-[10px] text-[#8a8a8a]">
                                    {isSending ? 'Sending your message...' : 'Press Send to submit your message'}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}