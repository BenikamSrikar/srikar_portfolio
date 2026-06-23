"use client";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0a0c] border-t border-zinc-800/80 pt-16 pb-8 relative overflow-hidden text-zinc-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center text-center md:text-left mb-12">
          
          {/* Brand/Logo Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h2 className="font-black text-xl md:text-3xl tracking-tighter flex items-center text-white cursor-default uppercase italic">
              <span className="text-blue-500 mr-1">&lt;</span>
              <span>Benikam</span>
              <span className="ml-1 text-blue-500">Srikar</span>
              <span className="text-blue-500 ml-1">/&gt;</span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
              Crafting robust backend architectures and scalable software solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center space-y-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500">
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
            <a href="#education" className="hover:text-blue-400 transition-colors">Education</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h3 className="text-zinc-300 font-bold text-sm tracking-widest uppercase mb-2">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/benikam-srikar" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/benikam-srikar" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="mailto:benikamsrikar06@gmail.com" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 relative">
          <p className="text-zinc-500 text-xs font-medium tracking-wide">
            © {currentYear} Benikam Srikar. All rights reserved.
          </p>
          
          <p className="text-zinc-500 text-xs font-medium tracking-wide flex items-center gap-1">
            Made with <span className="text-blue-500 mx-1">❤</span> in India
          </p>

          {/* Scroll to Top Button */}
          <button 
            onClick={scrollToTop}
            className="md:absolute md:left-1/2 md:-translate-x-1/2 md:-top-5 w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-blue-400 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 shadow-sm"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}