import React from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        {/* LEFT */}
        <div className="footer-brand">
          <h2>Bun Drop</h2>
          <p>Fresh burgers. Fast delivery.</p>
        </div>

        {/* SOCIALS */}
        <div className="footer-socials">
          
          <a 
            href="https://www.instagram.com/bun_drop_glasgow/"             target="_blank" 
            rel="noreferrer"
            className="social-btn"
          >
            <FaInstagram />
            <span>Instagram</span>
          </a>

          <a 
            href="https://www.tiktok.com/@bundrop.glasgow" 
            target="_blank" 
            rel="noreferrer"
            className="social-btn"
          >
            <FaTiktok />
            <span>TikTok</span>
          </a>

        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <p>📍 2017 Dumbarton Road, Glasgow, Scotland G14 0HY</p>
          <p>📞 01413783463</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Bun Drop. All rights reserved.
      </div>

    </footer>
  );
}