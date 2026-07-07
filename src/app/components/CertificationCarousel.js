"use client";

const certifications = [
  { id: 1, title: "Deloitte Certification", image: "/images/certs/deloitte.png" },
  { id: 2, title: "MongoDB Certification", image: "/images/certs/mongoDB.png" },
  { id: 3, title: "Oracle Cloud Infrastructure", image: "/images/certs/Oracle1.png" },
  { id: 4, title: "Oracle Database", image: "/images/certs/Oracle2.png" }
];

export default function CertificationCarousel() {
  return (
    <section id="certification" className="w-full bg-white py-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-600">Professional Growth</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-slate-900">Certification Courses</h2>
        </div>

        {/* Grid View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-[4/3] flex items-center justify-center p-8 bg-white">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  style={{ filter: 'drop-shadow(0 0 0 transparent)' }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6">
                <h3 className="text-lg font-bold text-white">{cert.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
