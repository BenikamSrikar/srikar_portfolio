"use client"
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dock from "./components/Dock";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import ExperienceAndActivities from "./components/ExperienceAndActivities";
import Certifications from "./components/Certifications";
import Footer from "./components/Footer";
export default function Home() {
  const [showDock, setShowDock] = useState(true); // Control state for dock

  useEffect(() => {
    // Always scroll to top and reset to home section on page load/reload
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Remove any hash from URL to ensure we're at the home page
    if (window.location.hash) {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <>
      <main className="bg-[#f8faff] min-h-screen">
        <Navbar showDock={showDock} setShowDock={setShowDock} />
        
        <HomePage />
        <About />
        <Skills />
        <Education />
        <Projects />
        <ExperienceAndActivities />
        <Certifications />
        <Footer />
      </main>
      
      <Dock isVisible={showDock} />
    </>
  );
}