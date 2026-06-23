"use client"
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Experience from "./components/Experience";
import ExperienceAndActivities from "./components/ExperienceAndActivities";
import Footer from "./components/Footer";
import MobileDesktopPrompt from "./components/MobileDesktopPrompt";

export default function Home() {
  return (
    <>
      <MobileDesktopPrompt />
      <main className="bg-[#f8faff] min-h-screen">
        <Navbar />
        
        <HomePage />
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