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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2237.803070439413!2d-4.370206023283602!3d55.88343057313286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48884ffdea9cf235%3A0x660376f535097a24!2sBun%20Drop!5e0!3m2!1sen!2suk!4v1775219052054!5m2!1sen!2suk"
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