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
    newCart[index].quantity -= 1;
  } else {
    newCart.splice(index, 1);
  }

  setCart(newCart);
  localStorage.setItem("cart", JSON.stringify(newCart));
  window.dispatchEvent(new Event("storage"));
}

 
  function clearCart() {
    localStorage.removeItem("cart");
    setCart([]);
    window.dispatchEvent(new Event("storage")); 
  }

  // CALCULATE TOTAL
  const subtotal = cart.reduce(
  (acc, item) => acc + item.price * (item.quantity || 1),
  0);
  const delivery = cart.length > 0 ? 2.99 : 0;
  const total = subtotal + delivery;

  return (
    <div style={{ padding: "40px 8%" }}>

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Your Cart 🛒
      </h1>

      {cart.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>
          Your cart is empty 😢
        </h2>
      ) : (
        <>
     
          <div className="food-grid">

            {cart.map((item, index) => (
              <div className="food-card" key={index}>
                <img src={item.img} alt={item.name} />

                <div className="food-card-content">
                  <h3>{item.name} x{item.quantity || 1}</h3>
                  <span>£{(item.price * (item.quantity || 1)).toFixed(2)}</span>

                
                  {item.cheese !== undefined && (
                    <>
                      <p>🧀 Cheese: {item.cheese ? "Yes" : "No"}</p>
                      <p>🍯 Sauce: {item.extraSauce ? "Extra" : "Normal"}</p>
                      <p>🥤 Drink: {item.drink}</p>
                    </>
                  )}

                  <button
                    className="btn"
                    style={{ marginTop: "10px", background: "#ff4d4d" }}
                    onClick={() => removeItem(index)}
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            ))}

          </div>

         
          <div style={{
            maxWidth: "400px",
            margin: "40px auto",
            textAlign: "center",
            background: "#111",
            padding: "20px",
            borderRadius: "10px"
          }}>

            <h3>Subtotal: £{subtotal.toFixed(2)}</h3>
            <h3>Delivery: £{delivery.toFixed(2)}</h3>
            <h2>Total: £{total.toFixed(2)}</h2>

            <div style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>

              <a href="https://www.ubereats.com/gb/store/bun-drop/UaASnld3SSOAY3bu7HRkQQ?diningMode=DELIVERY&ps=1&sc=SEARCH_SUGGESTION" className="btn">Order via Uber Eats 🚀</a>
              <a href="https://www.just-eat.co.uk/restaurants-bun-drop-whiteinch/menu" className="btn">Order via Just Eat 🛵</a>
              <a href="tel:01413783463" className="btn">Call 📞</a>

            </div>

            <button
              onClick={clearCart}
              style={{
                marginTop: "15px",
                background: "#444",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Clear Cart
            </button>

          </div>
        </>
      )}

    </div>
  );
}