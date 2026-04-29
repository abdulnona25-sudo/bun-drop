import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Load saved preference, default to dark
    return localStorage.getItem("theme") !== "light";
  });

  // Apply theme on mount and change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    function update() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(total);

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

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">BUN DROP</Link>

      <ul className="navbar-links" style={{ display: mobileOpen ? "none" : "flex" }}>
        <li><NavLink to="/" end><span>Home</span></NavLink></li>
        <li><NavLink to="/menu"><span>Menu</span></NavLink></li>
        <li><NavLink to="/contact"><span>Contact</span></NavLink></li>
        <li>
          <NavLink to="/favourites" style={{ position: "relative" }}>
            <FaHeart />
            <span>Favourites</span>
            {favCount > 0 && <span className="navbar-cart-badge">{favCount}</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" style={{ position: "relative" }}>
            <FaShoppingCart />
            <span>Cart</span>
            {cartCount > 0 && <span className="navbar-cart-badge">{cartCount}</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            <FaUser />
            <span>Account</span>
          </NavLink>
        </li>
      </ul>

      {/* Theme toggle */}
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(d => !d)}
        aria-label="Toggle theme"
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(o => !o)}
        style={{
          background: "none",
          border: "none",
          color: "var(--text)",
          fontSize: "20px",
          cursor: "pointer",
          display: "none",
        }}
        className="mobile-menu-btn"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          position: "fixed",
          inset: "64px 0 0",
          background: "var(--bg)",
          zIndex: 99,
          padding: "20px 5%",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          borderTop: "1px solid var(--border)",
          overflowY: "auto",
        }}>
          {[
            { to: "/", label: "Home" },
            { to: "/menu", label: "Menu" },
            { to: "/contact", label: "Contact" },
            { to: "/favourites", label: `Favourites${favCount > 0 ? ` (${favCount})` : ""}` },
            { to: "/cart", label: `Cart${cartCount > 0 ? ` (${cartCount})` : ""}` },
            { to: "/login", label: "Account" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                color: "var(--text)",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "500",
                padding: "14px 16px",
                borderRadius: "var(--radius-sm)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {label}
            </NavLink>
          ))}

          {/* Theme toggle in mobile drawer */}
          <button
            onClick={() => setDarkMode(d => !d)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "var(--text)",
              fontSize: "16px",
              fontWeight: "500",
              padding: "14px 16px",
              borderRadius: "var(--radius-sm)",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              marginTop: "8px",
            }}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .navbar-links { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .theme-toggle { margin-left: 8px; }
        }
      `}</style>
    </nav>
  );
}