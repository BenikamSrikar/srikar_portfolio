"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar({ showDock, setShowDock }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [shouldHideOnScroll, setShouldHideOnScroll] = useState(false);
    
    const logoRef = useRef(null);
    const controlsRef = useRef(null);
    const scrollTimeoutRef = useRef(null);

    // 1. SCROLL & ENTRANCE ANIMATIONS
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50);
            
            // Only hide navbar on scroll if dock is visible (showDock = true)
            // If dock is hidden (showDock = false), navbar stays fixed
            if (showDock) {
                // Check if we're past the About section
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    const aboutBottom = aboutSection.offsetTop + aboutSection.offsetHeight;
                    const pastAbout = scrollY > aboutBottom;
                    setShouldHideOnScroll(pastAbout);
                    
                    if (pastAbout) {
                        // Clear previous timeout
                        if (scrollTimeoutRef.current) {
                            clearTimeout(scrollTimeoutRef.current);
                        }
                        
                        // Set scrolling state
                        setIsScrolling(true);
                        
                        // Set timeout to detect when scrolling stops
                        scrollTimeoutRef.current = setTimeout(() => {
                            setIsScrolling(false);
                        }, 150); // 150ms after scrolling stops
                    }
                }
            } else {
                // When dock is hidden, navbar stays fixed (no hiding on scroll)
                setShouldHideOnScroll(false);
                setIsScrolling(false);
            }
        };
        
        window.addEventListener("scroll", handleScroll, { passive: true });

        const tl = gsap.timeline({ delay: 0.3 });
        tl.fromTo([logoRef.current, controlsRef.current], 
            { y: -20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power4.out" }
        );

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [showDock]); // Add showDock as dependency

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
        setTimeout(() => setIsOpen(false), 300);
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
                handleClose();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 4000);
                }, 600);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSending(false);
        }
    };

    // 3. UI COMPONENTS
    const FloatingInput = ({ name, label, type = "text", required = false, isTextArea = false }) => {
        const InputTag = isTextArea ? "textarea" : "input";
        return (
            <div className="relative w-full mb-2">
                <InputTag name={name} type={type} required={required} placeholder=" " 
                    className={`peer w-full p-3 pt-5 rounded-xl bg-slate-50 border border-transparent focus:border-blue-500 outline-none transition-all text-sm text-slate-800 ${isTextArea ? 'h-32 resize-none' : ''}`} 
                />
                <label className="absolute left-3 top-4 text-gray-500 transition-all duration-200 pointer-events-none peer-focus:text-xs peer-focus:top-1 peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-1">
                    {label}
                </label>
            </div>
        );
    };

    return (
        <>
            {/* SUCCESS NOTIFICATION */}
            <div className={`fixed top-6 right-6 z-[200] w-80 transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${showSuccess ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}>
                <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-xl flex items-center gap-4">
                    <div className="bg-green-500 h-11 w-11 rounded-full flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-800">Success</h4>
                        <p className="text-xs text-slate-500">Message sent successfully.</p>
                    </div>
                </div>
            </div>

            {/* NAVBAR */}
            <nav className={`fixed top-0 left-0 w-full h-15 z-50 transition-all duration-700
                ${isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-md" : "bg-transparent border-b border-transparent"}
                ${shouldHideOnScroll && isScrolling ? "-translate-y-full" : "translate-y-0"}`}>
                
                <div className="max-w-7xl mx-auto h-full px-10 grid grid-cols-3 items-center">
                    
                    {/* LEFT: EMPTY SLOT FOR GRID ALIGNMENT */}
                    <div className="flex justify-start"></div>

                    {/* CENTER: LOGO AND NAVLINKS TOGGLE */}
                    <div ref={logoRef} className="flex justify-center opacity-0 overflow-hidden relative items-center h-full">
                        {/* LOGO (Visible when Dock is shown) */}
                        <div className={`transition-all duration-500 transform absolute ${!showDock ? "-translate-y-10 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}>
                            <h1 
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    // Remove any hash from URL
                                    if (window.location.hash) {
                                        window.history.pushState("", document.title, window.location.pathname + window.location.search);
                                    }
                                }}
                                className="font-black text-xl md:text-2xl lg:text-3xl tracking-tighter flex items-center text-slate-800 cursor-pointer whitespace-nowrap hover:scale-105 transition-transform duration-200"
                            >
                                <span className={`transition-all duration-500 ease-out ${isScrolled ? "text-blue-600 opacity-100 w-auto pr-1" : "opacity-0 w-0 overflow-hidden"}`}>&lt;</span>
                                <span>Benikam</span>
                                <span className={`ml-1 transition-colors duration-500 ${isScrolled ? "text-blue-600" : "text-slate-800"}`}>Srikar</span>
                                <span className={`transition-all duration-500 ease-out ${isScrolled ? "text-blue-600 opacity-100 w-auto pl-1" : "opacity-0 w-0 overflow-hidden"}`}>/&gt;</span>
                            </h1>
                        </div>

                        {/* NAVLINKS (Visible when Dock is hidden) */}
                        <div className={`transition-all duration-500 transform absolute inset-0 flex items-center justify-center gap-4 md:gap-6 ${showDock ? "translate-y-10 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}>
                            {["about","skills","education","projects","activities","certifications"].map((id) => (
                                <a key={id} href={`#${id}`}
                                   className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap hover:text-blue-600 transition-colors leading-none">
                                    {id === "certifications" ? "Certs" : id}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: CONTACT BUTTON */}
                    <div className="flex justify-end">
                        <button onClick={() => setIsOpen(true)} className="px-5 md:px-8 py-2 md:py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 text-xs md:text-sm font-medium whitespace-nowrap shadow-sm">
                            Contact
                        </button>
                    </div>
                </div>
            </nav>

            {/* MODAL */}
            {isOpen && (
                <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`} onClick={handleClose}>
                    <div className={`bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-xl relative mx-4 border border-slate-200 transition-all duration-500 transform ${isAnimating ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-10 opacity-0'}`} onClick={(e) => e.stopPropagation()}>
                        
                        {/* Centered Modal Title & Close Button */}
                        <div className="relative w-full mb-8 flex justify-center items-center">
                            <h2 className="text-2xl md:text-3xl font-black italic text-center uppercase tracking-tight text-slate-800">
                                <span className="text-blue-600">Get in</span> Touch
                            </h2>
                            <button onClick={handleClose} className="absolute right-0 text-slate-400 hover:text-slate-800 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Form Grid */}
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                            <div className="md:col-span-1"><FloatingInput name="name" label="Name" required /></div>
                            <div className="md:col-span-1"><FloatingInput name="email" label="Email" type="email" required /></div>
                            <div className="md:col-span-2"><FloatingInput name="linkedin" label="LinkedIn URL (Optional*)" type="url" /></div>
                            <div className="md:col-span-2"><FloatingInput name="github" label="GitHub URL (Optional*)" type="url" /></div>
                            <div className="md:col-span-2"><FloatingInput name="message" label="Message" isTextArea required /></div>
                            
                            <button type="submit" disabled={isSending} className={`md:col-span-2 bg-blue-600 text-white font-bold py-4 rounded-2xl mt-4 transition-all active:scale-95 shadow-lg shadow-blue-600/30 ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'}`}>
                                {isSending ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* FLOATING EYE TOGGLE (BOTTOM RIGHT) */}
            <div ref={controlsRef} className="fixed bottom-6 right-6 z-[200] opacity-0 flex flex-col gap-2">
                <button 
                    onClick={() => setShowDock(!showDock)}
                    className={`p-3.5 rounded-full border shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 ${showDock ? "bg-blue-600 border-blue-500 text-white shadow-blue-200" : "bg-white border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-300"}`}
                >
                    {showDock ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.5a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                    )}
                </button>
            </div>
        </>
    );
}