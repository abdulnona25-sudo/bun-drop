import React from "react";

export default function Contact() {
  const hour = new Date().getHours();
  const day = new Date().getDay(); // 0=Sun, 1=Mon ... 5=Fri, 6=Sat
  
  // Mon-Thu: 12-23, Fri: 15-23, Sat-Sun: 12-23
  let isOpen = false;
  if (day >= 1 && day <= 4) isOpen = hour >= 12 && hour < 23;
  else if (day === 5) isOpen = hour >= 15 && hour < 23;
  else isOpen = hour >= 12 && hour < 23;

  return (
    <div className="contact-page fade-in">
      <p className="section-label">Get In Touch</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "0.03em", marginBottom: "40px" }}>
        CONTACT US
      </h1>

      <div className="contact-card">
        <h3>Call Us</h3>
        <a href="tel:01413783463" className="btn" style={{ display: "inline-flex" }}>
          📞 0141 378 3463
        </a>
      </div>

      <div className="contact-card">
        <h3>Location</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "15px", marginBottom: "16px" }}>
          📍 2017 Dumbarton Rd, Glasgow G14 0HY
        </p>
        <iframe
          title="map"
          src="https://www.google.com/maps?q=2017%20Dumbarton%20Road%20Glasgow&output=embed"
          style={{ width: "100%", height: "280px", border: "none", borderRadius: "10px" }}
        />
      </div>

      <div className="contact-card">
        <h3>Opening Hours</h3>
        <span className={`status-pill ${isOpen ? "open" : "closed"}`}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
          {isOpen ? "Open Now" : "Closed Now"}
        </span>
        <div className="hours-grid">
          <span>Monday – Thursday</span><span>12:00 PM – 11:00 PM</span>
          <span>Friday</span><span>3:00 PM – 11:00 PM</span>
          <span>Saturday – Sunday</span><span>12:00 PM – 11:00 PM</span>
        </div>
      </div>

      <div className="contact-card">
        <h3>Order Online</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a href="https://www.ubereats.com/gb/store/bun-drop/UaASnld3SSOAY3bu7HRkQQ" className="btn" target="_blank" rel="noreferrer">Uber Eats 🚀</a>
          <a href="https://www.just-eat.co.uk/restaurants-bun-drop-whiteinch/menu" className="btn btn-ghost" target="_blank" rel="noreferrer">Just Eat 🛵</a>
        </div>
      </div>
    </div>
  );
}