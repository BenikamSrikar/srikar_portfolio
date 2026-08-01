"use client";
import { Briefcase, FileCode2, Landmark, LineChart } from 'lucide-react';
import TextReveal from './TextReveal';

const timelineData = [
  {
    id: 'btech',
    title: 'B.Tech in Engineering',
    subtitle: 'Sasi Institute of Technology & Engineering, Tadepalligudem',
    period: '2023 – 2027',
    badge: 'Education',
    icon: <FileCode2 size={20} />,
    color: '#fb923c',
    details: [
      'Studied core engineering principles with projects in software systems and networking.',
      'Delivered practical applications in web development, data structures, and system architecture.'
    ],
    side: 'left'
  },
  {
    id: 'ml-research',
    title: 'ML Research Intern',
    subtitle: 'UCSI University, Kuala Lumpur (Remote)',
    period: 'Jan 2026 – Apr 2026',
    badge: 'Experience',
    icon: <Landmark size={20} />,
    color: '#0f766e',
    details: [
      'Evaluated ML and DL models for diabetes classification across medical datasets.',
      'Produced comparative analysis reports and performance insights.'
    ],
    side: 'right'
  },
  {
    id: 'research-intern',
    title: 'Research Intern',
    subtitle: 'NIT Tiruchirappalli',
    period: 'Jun 2026 – Jul 2026',
    badge: 'Experience',
    icon: <LineChart size={20} />,
    color: '#0f766e',
    details: [
      'Engaged in AI/ML fundamentals, programming, and web technologies under faculty mentorship.'
    ],
    side: 'left'
  },
  {
    id: 'infosys-springboard',
    title: 'Springboard 7.0 Intern',
    subtitle: 'Infosys Springboard Virtual Internship',
    period: 'Oct 2026 (upcoming)',
    badge: 'Experience',
    icon: <Briefcase size={20} />,
    color: '#0f766e',
    details: [
      'Selected for Infosys Springboard 7.0 to advance technical skills and software delivery practices.',
      'Preparing for virtual internship engagements in full stack development and engineering workflows.'
    ],
    side: 'right'
  }
];

function TimelineCard({ item }) {
  return (
    <div
      id={item.id}
      className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
    >
      <div className="absolute top-4 right-4 rounded-full bg-slate-900/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700">
        {item.badge}
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-2xl bg-slate-100 p-3 text-slate-900">{item.icon}</div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
          <p className="text-sm text-slate-500">{item.subtitle}</p>
        </div>
      </div>
      <p className="text-sm font-semibold text-orange-600 mb-4">{item.period}</p>
      <ul className="space-y-3 text-sm leading-7 text-slate-600">
        {item.details.map((detail, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative w-full py-20 bg-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute right-16 top-24 h-24 w-24 rounded-full bg-orange-100/40 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 rounded-full bg-orange-200/20 blur-3xl" />
        <div className="absolute left-24 bottom-20 h-16 w-16 rotate-45 rounded-2xl bg-orange-100/50" />
        <div className="absolute right-24 bottom-32 h-20 w-20 rounded-full bg-orange-200/20" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center relative z-10">
          <h2 className="text-5xl font-black tracking-tight">
            <TextReveal text="My Journey" className="justify-center" />
          </h2>
          <p className="mt-4 text-sm text-slate-500 max-w-2xl mx-auto">
            A clean alternate timeline with education first, then experience — each milestone slides in and the center path fills as you scroll.
          </p>
        </div>

        <div className="relative z-10">
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-orange-500" />

          <div className="space-y-20">
            {timelineData.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] items-center gap-6">
                {item.side === 'left' ? (
                  <div className="md:col-start-1 md:col-end-2 hidden md:block relative">
                    <TimelineCard item={item} />
                    <div className="absolute right-[-30px] top-1/2 h-px w-16 bg-slate-300" style={{ transform: 'translateY(-50%)' }} />
                  </div>
                ) : (
                  <div className="md:col-start-1 md:col-end-2 hidden md:block" />
                )}

                <div className="relative md:col-start-2 md:col-end-3 flex items-center justify-center">
                  <span className="relative inline-flex h-5 w-5 rounded-full border-4 border-white bg-orange-500 shadow-sm" />
                </div>

                {item.side === 'right' ? (
                  <div className="md:col-start-3 md:col-end-4 hidden md:block relative">
                    <div className="absolute left-[-30px] top-1/2 h-px w-16 bg-slate-300" style={{ transform: 'translateY(-50%)' }} />
                    <TimelineCard item={item} />
                  </div>
                ) : (
                  <div className="md:col-start-3 md:col-end-4 hidden md:block" />
                )}

                <div className="md:hidden">
                  <TimelineCard item={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
