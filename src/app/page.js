"use client";
import Sidebar from "./components/Sidebar";
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

export default function Home() {
  return (
    <>
      <Sidebar />
      <main className="bg-[#f8faff] min-h-screen w-full overflow-x-hidden page-content-with-sidebar">
        <div id="home">
          <HomePage startAnimation={true} />
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