import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    function loadFavs() {
      const user = localStorage.getItem("user");
      const saved = user
        ? JSON.parse(localStorage.getItem(`favourites_${user}`)) || []
        : JSON.parse(localStorage.getItem("favourites_guest")) || [];
      setFavourites(saved);
    }
    loadFavs();
    window.addEventListener("storage", loadFavs);
    return () => window.removeEventListener("storage", loadFavs);
  }, []);

  function removeFavourite(id) {
    const updated = favourites.filter(item => item.id !== id);
    setFavourites(updated);
    const user = localStorage.getItem("user");
    if (user) {
      localStorage.setItem(`favourites_${user}`, JSON.stringify(updated));
    } else {
      localStorage.setItem("favourites_guest", JSON.stringify(updated));
    }
    window.dispatchEvent(new Event("storage"));
  }

  function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(i => i.id === item.id);
    if (index !== -1) {
      cart[index].quantity = (cart[index].quantity || 1) + 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div className="cart-page fade-in">
      <p className="section-label" style={{ textAlign: "center" }}>Saved Items</p>
      <h1>YOUR FAVOURITES</h1>

      {favourites.length === 0 ? (
        <div className="empty-state">
          <h2>No favourites yet 🤍</h2>
          <p>Head to the menu and heart the items you love!</p>
          <Link to="/menu" className="btn">Browse Menu 🍔</Link>
        </div>
      ) : (
        <div className="food-grid">
          {favourites.map(item => (
            <div className="food-card" key={item.id}>
              <img src={item.img} alt={item.name} />
              <div className="food-card-content">
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <span>£{item.price.toFixed(2)}</span>
                <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                  <button
                    className="btn"
                    style={{ flex: 1, justifyContent: "center", fontSize: "13px" }}
                    onClick={() => addToCart(item)}
                  >
                    Add 🛒
                  </button>
                  <button
                    onClick={() => removeFavourite(item.id)}
                    style={{
                      background: "rgba(232,50,26,0.1)",
                      border: "1px solid rgba(232,50,26,0.25)",
                      color: "var(--brand)",
                      borderRadius: "var(--radius-sm)",
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontSize: "16px",
                      transition: "all 0.2s ease",
                    }}
                    title="Remove from favourites"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}