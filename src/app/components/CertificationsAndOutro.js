"use client";

// Certifications data
const certifications = [
  {
    id: 1,
    title: "OCI Generative AI Professional",
    issuer: "Oracle Cloud Infrastructure",
    date: "2024",
    icon: "https://cdn.simpleicons.org/oracle/F80000",
  },
  {
    id: 2,
    title: "OCI AI Foundations",
    issuer: "Oracle Cloud Infrastructure",
    date: "2024",
    icon: "https://cdn.simpleicons.org/oracle/F80000",
  },
  {
    id: 3,
    title: "Backend Development & Databases",
    issuer: "Coursera",
    date: "2024",
    icon: "https://cdn.simpleicons.org/coursera/0056D2",
  },
  {
    id: 4,
    title: "Linux Shell Scripting",
    issuer: "Coursera",
    date: "2024",
    icon: "https://cdn.simpleicons.org/linux/FCC624",
  }
];

export default function CertificationsAndOutro() {
  return (
    <div className="w-full bg-white" style={{ padding: "112px 24px" }}>
      
      {/* Header Section */}
      <div style={{ maxWidth: "1280px", margin: "0 auto 64px" }}>
        <span style={{ color: "#2563eb", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "14px", display: "block", marginBottom: "12px" }}>
          Credentials
        </span>
        <h2 style={{ fontSize: "48px", fontWeight: "bold", color: "#0f172a", marginBottom: "16px" }}>
          Professional <span style={{ color: "#2563eb" }}>Certifications</span>
        </h2>
        <p style={{ color: "#475569", fontSize: "18px", maxWidth: "512px" }}>
          Certifications and credentials that validate my technical expertise and commitment to professional development.
        </p>
      </div>

      {/* Certifications Grid - 4 columns, always */}
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
          {certifications.map((cert) => (
            <div
              key={cert.title}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "24px",
                transition: "all 300ms ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#93c5fd";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Icon */}
              <div style={{ width: "48px", height: "48px", background: "#eff6ff", borderRadius: "8px", padding: "10px", marginBottom: "16px", border: "1px solid #dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={cert.icon} alt={cert.issuer} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              
              {/* Title */}
              <h3 style={{ fontSize: "14px", fontWeight: "bold", color: "#0f172a", marginBottom: "8px", lineHeight: "1.4" }}>
                {cert.title}
              </h3>
              
              {/* Issuer */}
              <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "12px" }}>
                {cert.issuer}
              </p>
              
              {/* Date Badge */}
              <div style={{ display: "inline-block", background: "#eff6ff", color: "#2563eb", fontSize: "12px", fontWeight: "600", padding: "6px 12px", borderRadius: "20px", border: "1px solid #dbeafe" }}>
                {cert.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thank You Section */}
      <div style={{ maxWidth: "1024px", margin: "80px auto 0", paddingTop: "80px", borderTop: "1px solid #e2e8f0", textAlign: "center" }}>
        <h3 style={{ fontSize: "32px", fontWeight: "bold", color: "#0f172a", marginBottom: "12px" }}>
          Thank you for <span style={{ color: "#2563eb" }}>visiting</span>
        </h3>
        <p style={{ color: "#475569", fontSize: "18px" }}>
          I appreciate you taking the time to explore my portfolio. Let's connect and build something amazing together.
        </p>
      </div>

    </div>
  );
}
