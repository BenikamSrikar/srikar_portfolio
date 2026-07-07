"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ExperienceAndActivities from "./components/ExperienceAndActivities";
import Hackathon from "./components/Hackathon";
import CertificationCarousel from "./components/CertificationCarousel";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ToolsandFrameworks from "./components/ToolsandFrameworks";
import Experience from "./components/Experience";
import PageLoader from "./components/PageLoader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleModelLoad = () => {
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <main className="bg-[#f8faff] min-h-screen w-full overflow-x-hidden">
        <Navbar />
        <div id="home">
          <HomePage startAnimation={true} onModelLoad={handleModelLoad} />
        </div>
        <About />
        <Skills />
        <ToolsandFrameworks />
        <Projects />
        <Experience />
        <Hackathon />
        <CertificationCarousel />
        <Contact />
        <Footer />
      </main>
    </>
  );
}