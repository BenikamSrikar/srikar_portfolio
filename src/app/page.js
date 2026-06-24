"use client"
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import ExperienceAndActivities from "./components/ExperienceAndActivities";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <main className="bg-[#f8faff] min-h-screen">
        <Navbar />
        
        <HomePage />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Experience />
        <ExperienceAndActivities />
        <Footer />
      </main>
    </>
  );
}