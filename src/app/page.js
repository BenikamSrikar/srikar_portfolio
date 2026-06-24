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
    setStartAnims(true); // Fires the entrance animations and model assembly simultaneously
  };

  return (
    <>
      {/* Full-screen Dark Loader Screen */}
      {isLoading && <PageLoader onComplete={handleLoadingComplete} />}

      <main className="bg-[#f8faff] min-h-screen">
        <Navbar />
        {/* We pass the animation state explicitly here */}
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