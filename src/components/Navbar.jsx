import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes,
  FaSun, FaMoon, FaHome, FaUtensils, FaPhone
} from "react-icons/fa";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  // Apply theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Cart + fav counts
  useEffect(() => {
    function update() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.reduce((acc, item) => acc + (item.quantity || 1), 0));
      const user = localStorage.getItem("user");
      const favs = user
        ? JSON.parse(localStorage.getItem(`favourites_${user}`)) || []
        : JSON.parse(localStorage.getItem("favourites_guest")) || [];
      setFavCount(favs.length);
    }
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navItems = [
    { to: "/",            label: "Home",       icon: <FaHome /> },
    { to: "/menu",        label: "Menu",        icon: <FaUtensils /> },
    { to: "/contact",     label: "Contact",     icon: <FaPhone /> },
    { to: "/favourites",  label: "Favourites",  icon: <FaHeart />,        badge: favCount },
    { to: "/cart",        label: "Cart",        icon: <FaShoppingCart />, badge: cartCount },
    { to: "/login",       label: "Account",     icon: <FaUser /> },
  ];

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">BUN DROP</Link>

        {/* Desktop links */}
        <ul className="navbar-links">
          {navItems.map(({ to, label, icon, badge }) => (
            <li key={to}>
              <NavLink to={to} end={to === "/"} style={{ position: "relative" }}>
                {icon}<span>{label}</span>
                {badge > 0 && <span className="navbar-cart-badge">{badge}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="theme-toggle" onClick={() => setDarkMode(d => !d)} aria-label="Toggle theme">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile drawer */}
      <div className={`mobile-drawer ${mobileOpen ? "mobile-drawer--open" : ""}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
          {navItems.map(({ to, label, icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMobileOpen(false)}
              className="mobile-nav-item"
            >
              <span className="mobile-nav-icon">{icon}</span>
              {label}
              {badge > 0 && (
                <span style={{
                  marginLeft: "auto",
                  background: "var(--brand)",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "700",
                  minWidth: "22px",
                  height: "22px",
                  borderRadius: "999px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 6px",
                }}>
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div style={{ paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
          <button className="mobile-theme-btn" onClick={() => setDarkMode(d => !d)}>
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
          <p style={{ textAlign: "center", color: "var(--text-faint)", fontSize: "13px", marginTop: "14px" }}>
            🍔 Fresh burgers. Fast delivery.
          </p>
        </div>
      </div>

      <style>{`
        .mobile-drawer {
          position: fixed;
          top: 64px;
          left: 0; right: 0; bottom: 0;
          background: var(--bg);
          z-index: 98;
          display: flex;
          flex-direction: column;
          padding: 20px 18px 28px;
          border-top: 1px solid var(--border);
          transform: translateX(100%);
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        .mobile-drawer--open {
          transform: translateX(0);
        }
        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          color: var(--text);
          text-decoration: none;
          font-size: 18px;
          font-weight: 600;
          padding: 15px 18px;
          border-radius: var(--radius-sm);
          background: var(--surface);
          border: 1px solid var(--border);
          transition: all 0.15s ease;
        }
        .mobile-nav-item.active {
          color: var(--brand);
          background: var(--brand-glow);
          border-color: rgba(232,50,26,0.25);
        }
        .mobile-nav-icon {
          font-size: 16px;
          opacity: 0.75;
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-theme-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          color: var(--text-muted);
          font-size: 15px;
          font-weight: 500;
          padding: 14px 18px;
          border-radius: var(--radius-sm);
          background: var(--surface);
          border: 1px solid var(--border);
          cursor: pointer;
          font-family: var(--font-body);
        }
        @media (max-width: 768px) {
          .navbar-links { display: none !important; }
          .mobile-menu-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
            background: var(--surface);
            border: 1px solid var(--border);
            color: var(--text);
            width: 36px; height: 36px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: 16px;
          }
          .theme-toggle { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-drawer { display: none !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}