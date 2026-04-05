import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(localStorage.getItem("user"));

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {

    function updateCart() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const total = cart.reduce(
        (acc, item) => acc + (item.quantity || 1),
        0
      );

      setCartCount(total);
    }

    updateCart();

    window.addEventListener("storage", updateCart);

    return () => window.removeEventListener("storage", updateCart);

  }, []);

  useEffect(() => {

    function updateUser() {
      setUser(localStorage.getItem("user"));
    }

    window.addEventListener("storage", updateUser);

    return () => window.removeEventListener("storage", updateUser);

  }, []);

  function isOpenNow() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if (day >= 1 && day <= 4) return hour >= 12 && hour < 23;
    if (day === 5) return hour >= 15 && hour < 23;
    if (day === 6 || day === 0) return hour >= 12 && hour < 23;

    return false;
  }

  return (
    <nav className="navbar">

   
      <div className="navbar-left">
        <img src="/images/logo.png" alt="logo" className="logo" />
        <h1>Bun Drop</h1>
      </div>

 
      <div className="desktop-menu">
        <SlideTabs cartCount={cartCount} />
      </div>

     
      <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: "10px" }}>

        
        <span style={{
          fontSize: "13px",
          fontWeight: "bold",
          color: isOpenNow() ? "#4ade80" : "#f87171"
        }}>
          {isOpenNow() ? "Open now" : "Closed"}
        </span>

       
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn"
          style={{ padding: "6px 10px" }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

       
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontWeight: "bold" }}>👤 {user}</span>

            <button
              className="btn"
              style={{ padding: "5px 10px", background: "#ff4d4d" }}
              onClick={() => {
                localStorage.removeItem("user");
                window.dispatchEvent(new Event("storage"));
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}

      </div>

      
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart ({cartCount})</Link>
          <Link to="/favourites" onClick={() => setMenuOpen(false)}>Favourites</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}

const SlideTabs = ({ cartCount }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="tabs"
      onMouseLeave={() => setPosition(prev => ({ ...prev, opacity: 0 }))}
    >
      <Tab to="/" setPosition={setPosition}>Home</Tab>
      <Tab to="/menu" setPosition={setPosition}>Menu</Tab>
      <Tab to="/cart" setPosition={setPosition}>Cart ({cartCount})</Tab>
      <Tab to="/favourites" setPosition={setPosition}>Favourites</Tab>
      <Tab to="/contact" setPosition={setPosition}>Contact</Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, to }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      className="tab-item"
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
    >


      <Link to={to} className="tab-link">
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      className="cursor"
      animate={position}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    />
  );
};