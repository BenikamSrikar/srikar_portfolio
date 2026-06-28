"use client";
import { motion } from "framer-motion";
import { Briefcase, FileCode2, Landmark, LineChart } from "lucide-react";

const experienceData = [
  {
    id: 1,
    role: "Data Analytics Intern",
    company: "Deloitte Australia (Forage)",
    period: "May 2026",
    type: "Work Experience",
    icon: <Briefcase size={20} />,
    color: "#2563eb",
    details: [
      "Completed Deloitte's Data Analytics Virtual Experience Program involving practical data analysis and forensic technology tasks.",
      "Analyzed datasets to identify trends, anomalies, and actionable business insights using data-driven methodologies.",
      "Strengthened analytical thinking and consulting-oriented problem-solving skills."
    ]
  },
  {
    id: 2,
    role: "Research Intern",
    company: "NIT Tiruchirappalli",
    period: "2025",
    type: "Research Intern",
    icon: <FileCode2 size={20} />,
    color: "#7c3aed",
    details: [
      "Structured learning covering AI & ML concepts, mathematical foundations for ML, Web Technologies, Programming, and DSA under faculty guidance."
    ]
  },
  {
    id: 3,
    role: "ML Research Intern",
    company: "UCSI University, Kuala Lumpur (Remote)",
    period: "2024 – 2026",
    type: "ML Research",
    icon: <Landmark size={20} />,
    color: "#0891b2",
    details: [
      "Evaluated 10 ML algorithms and 2 DL models for diabetes classification across 5 medical datasets.",
      "AdaBoost achieved 99.47% accuracy.",
      "Results compiled into a comparative analysis report."
    ]
  },
  {
    id: 4,
    role: "Springboard 7.0",
    company: "Infosys",
    period: "October 2026",
    type: "Technical Program",
    icon: <LineChart size={20} />,
    color: "#eab308",
    details: [
      "Participated in the Infosys Springboard technical upskilling program.",
      "Focused on advanced software engineering principles and industry-standard development workflows."
    ]
  }
];

export default function Experience() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-black text-slate-900 mb-16 text-center uppercase tracking-tight">
          Professional Experience
        </h2>

        <div className="relative border-l-2 border-slate-200 ml-3 space-y-12">
          {experienceData.map((item) => (
            <div key={item.id} className="relative pl-8">
              {/* Timeline Dot */}
              <div 
                className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white ring-2 ring-slate-200" 
                style={{ backgroundColor: item.color }} 
              />

              {/* Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg text-white" style={{ backgroundColor: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.role}</h3>
                    <p className="text-sm text-slate-500 font-medium">{item.company} • {item.period}</p>
                  </div>
                </div>
                
                <ul className="space-y-2 list-none">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}