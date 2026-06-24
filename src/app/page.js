"use client"
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
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
        <Projects />
        <Education />
        <ExperienceAndActivities />
        <Footer />
      </main>
    </>
  );
}