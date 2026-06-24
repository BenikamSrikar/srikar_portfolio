"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import ExperienceAndActivities from "./components/ExperienceAndActivities";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [startAnims, setStartAnims] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setStartAnims(true); 
  };

  return (
    <>
      {/* Full-screen Dark Loader Screen */}
      {isLoading && <PageLoader onComplete={handleLoadingComplete} />}

      {/* FIXED: Added w-full and overflow-x-hidden to prevent layout breakdown */}
      <main className="bg-[#f8faff] min-h-screen w-full overflow-x-hidden">
        <Navbar />
        <HomePage startAnimation={startAnims} />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <ExperienceAndActivities />
        <Footer />
      </main>
    </>
  );
}