"use client";
import { motion } from "framer-motion";
import { Trophy, Code2, Users, Rocket } from "lucide-react";

const activities = [
  {
    id: 1,
    icon: <Trophy size={24} />,
    title: "Hackathon Participation",
    description: "Participated in Google and AMD Hack2Skill hackathons, contributing to prototype systems involving real-time interaction and AI-assisted features.",
    highlight: "Google & AMD Hack2Skill"
  },
  {
    id: 2,
    icon: <Code2 size={24} />,
    title: "Real-Time Systems Exploration",
    description: "Built and experimented with real-time systems concepts through hackathon environments, focusing on low-latency communication and event-driven architectures.",
    highlight: "Low-Latency & Event-Driven"
  },
  {
    id: 3,
    icon: <Rocket size={24} />,
    title: "WebRTC & Networking Deep Dive",
    description: "Explored internal workings of WebRTC, signaling mechanisms, peer-to-peer networking, and live streaming pipelines through implementation-driven learning.",
    highlight: "WebRTC · P2P · Streaming"
  },
  {
    id: 4,
    icon: <Users size={24} />,
    title: "Distributed Systems Interest",
    description: "Actively building intuition around system design trade-offs through projects involving WebSockets, WebRTC, and backend orchestration. Interested in distributed systems design, scalable backend architectures, and production-grade real-time communication systems.",
    highlight: "System Design & Scalability"
  }
];

export default function ExperienceAndActivities() {
  return (
    <div 
      id="activities" 
      className="w-full min-h-screen bg-white text-slate-800 py-20 px-6 md:px-20 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <span className="text-blue-600 font-bold tracking-widest uppercase text-[10px] md:text-xs mb-2 block">Beyond Academics</span>
        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900">
          Activities <span className="text-blue-600">& Achievements</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl w-full px-4 md:px-0">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white border border-blue-100 rounded-3xl p-6 md:p-8 hover:border-blue-300 hover:shadow-md hover:shadow-blue-100/50 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-[50px] group-hover:bg-blue-100 transition-all duration-500 rounded-full translate-x-10 -translate-y-10"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  {activity.icon}
                </div>
                <span className="text-[10px] md:text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 tracking-wider">
                  {activity.highlight}
                </span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-blue-700 transition-colors">
                {activity.title}
              </h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4 flex-grow">
                {activity.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}