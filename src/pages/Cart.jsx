import React, { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && cart.length > 0) {
      localStorage.setItem(`lastOrder_${user}`, JSON.stringify(cart));
    }
  }, [cart]);

  function removeItem(index) {
    const newCart = [...cart];
    if ((newCart[index].quantity || 1) > 1) {
      newCart[index] = { ...newCart[index], quantity: newCart[index].quantity - 1 };
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  }

  function addItem(index) {
    const newCart = [...cart];
    newCart[index] = { ...newCart[index], quantity: (newCart[index].quantity || 1) + 1 };
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
  }

  function clearCart() {
    localStorage.removeItem("cart");
    setCart([]);
    window.dispatchEvent(new Event("storage"));
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const delivery = cart.length > 0 ? 2.99 : 0;
  const total = subtotal + delivery;

  return (
    <div className="cart-page fade-in">
      <p className="section-label" style={{ textAlign: "center" }}>Review Order</p>
      <h1>YOUR CART</h1>

      {cart.length === 0 ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add some tasty items from our menu!</p>
          <a href="/menu" className="btn">Browse Menu 🍔</a>
        </div>
      ) : (
        <>
          <div className="food-grid">
            {cart.map((item, index) => (
              <div className="food-card" key={index}>
                <img src={item.img} alt={item.name} />
                <div className="food-card-content">
                  <h3>{item.name}</h3>
                  <span>£{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  {item.cheese !== undefined && (
                    <div style={{ fontSize: "13px", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "3px" }}>
                      <span>🧀 Cheese: {item.cheese ? "Yes" : "No"}</span>
                      <span>🍯 Sauce: {item.extraSauce ? "Extra" : "Normal"}</span>
                      <span>🥤 Drink: {item.drink}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "12px" }}>
                    <button
                      onClick={() => removeItem(index)}
                      style={{ width: 32, height: 32, borderRadius: "6px", border: "1px solid var(--border)", background: "var(--bg2)", color: "var(--text)", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >−</button>
                    <span style={{ fontWeight: "600", minWidth: "20px", textAlign: "center" }}>{item.quantity || 1}</span>
                    <button
                      onClick={() => addItem(index)}
                      style={{ width: 32, height: 32, borderRadius: "6px", border: "1px solid var(--border)", background: "var(--bg2)", color: "var(--text)", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Subtotal <span>£{subtotal.toFixed(2)}</span></h3>
            <h3 style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>Delivery <span>£{delivery.toFixed(2)}</span></h3>
            <div className="total">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>

            <div className="cart-order-btns">
              <a href="https://www.ubereats.com/gb/store/bun-drop/UaASnld3SSOAY3bu7HRkQQ?diningMode=DELIVERY&ps=1&sc=SEARCH_SUGGESTION" className="btn" target="_blank" rel="noreferrer">
                Order via Uber Eats 🚀
              </a>
              <a href="https://www.just-eat.co.uk/restaurants-bun-drop-whiteinch/menu" className="btn btn-ghost" target="_blank" rel="noreferrer">
                Order via Just Eat 🛵
              </a>
              <a href="tel:01413783463" className="btn btn-ghost">Call to Order 📞</a>
            </div>

            <button
              onClick={clearCart}
              style={{ marginTop: "16px", background: "none", border: "none", color: "var(--text-faint)", fontSize: "13px", cursor: "pointer", textDecoration: "underline" }}
            >
              Clear cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}