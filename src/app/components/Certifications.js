"use client";
import { motion } from "framer-motion";

const certifications = [
  {
    id: 1,
    title: "OCI Generative AI Professional",
    issuer: "Oracle Cloud Infrastructure",
    date: "2024",
    icon: "https://cdn.simpleicons.org/oracle/F80000",
    link: "#"
  },
  {
    id: 2,
    title: "OCI AI Foundations",
    issuer: "Oracle Cloud Infrastructure",
    date: "2024",
    icon: "https://cdn.simpleicons.org/oracle/F80000",
    link: "#"
  },
  {
    id: 3,
    title: "Backend Development & Databases",
    issuer: "Coursera",
    date: "2024",
    icon: "https://cdn.simpleicons.org/coursera/0056D2",
    link: "#"
  },
  {
    id: 4,
    title: "Linux Shell Scripting",
    issuer: "Coursera",
    date: "2024",
    icon: "https://cdn.simpleicons.org/linux/FCC624",
    link: "#"
  }
];

export default function Certifications() {
  return (
    <div id="certifications" className="w-full min-h-screen bg-white text-slate-800 py-20 px-6 md:px-20 relative flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <span className="text-blue-600 font-bold tracking-widest uppercase text-[10px] md:text-xs mb-2 block">Credentials</span>
        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
          Professional <span className="text-blue-600">Certifications</span>
        </h2>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl w-full">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-[#f8faff] border border-blue-100 rounded-2xl p-5 md:p-6 hover:border-blue-300 hover:shadow-md hover:shadow-blue-100/60 transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center h-full">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-xl p-2.5 md:p-3 mb-4 md:mb-5 border border-slate-200 shadow-sm group-hover:-translate-y-2 transition-transform duration-300 flex items-center justify-center">
                <img src={cert.icon} alt={cert.issuer} className="w-full h-full object-contain" />
              </div>
              
              <h3 className="text-sm md:text-base font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                {cert.title}
              </h3>
              
              <div className="mt-auto flex flex-col items-center w-full">
                <span className="text-slate-500 text-xs font-medium mb-1.5">{cert.issuer}</span>
                <span className="text-blue-600 text-[10px] font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  {cert.date}
                </span>
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-xs font-bold text-blue-600 border border-blue-300 rounded-full px-5 py-1.5 hover:bg-blue-600 hover:text-white w-fit"
                >
                  Verify
                </a>
              </div>
            </div>
            
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-200/0 group-hover:border-blue-400/50 rounded-tl-2xl transition-all duration-500"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-200/0 group-hover:border-blue-400/50 rounded-br-2xl transition-all duration-500"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}