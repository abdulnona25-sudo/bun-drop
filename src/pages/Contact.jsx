import React from "react";

export default function Contact() {

  
  const hour = new Date().getHours();
  const isOpen = hour >= 11 && hour <= 23;

  return (
    <div style={{ padding: "40px 8%", textAlign: "center" }}>

      <h1 style={{ marginBottom: "20px" }}>Contact Us</h1>



    
      <div style={{ marginBottom: "30px" }}>
        <h3>Call Us</h3>
        <a href="tel:01413783463" className="btn">
          📞 0141 3783 463
        </a>
      </div>

     
      <div style={{ marginBottom: "30px" }}>
        <h3>Location</h3>
        <p>2017 Dumbarton Rd, Glasgow G14 0HY</p>
      </div>

     
      <div style={{ marginBottom: "30px" }}>
        <iframe
          title="map"
          src="https://www.google.com/maps?q=2017%20Dumbarton%20Road%20Glasgow&output=embed"
          style={{
            width: "100%",
            height: "300px",
            border: "none",
            borderRadius: "10px"
          }}
        ></iframe>
      </div>

    
      <div style={{ marginTop: "30px" }}>
        <h3>Opening Hours</h3>
        <p>Monday - Thursday: 12:00 PM – 11:00 PM</p>
        <p>Friday - Thursday: 3:00 PM – 11:00 PM</p>
        <p>Saturday - Sunday: 12:00 PM – 11:00 PM</p>
      </div>

    </div>
  );
}