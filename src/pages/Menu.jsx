import React, { useState, useEffect } from "react";

export default function Menu() {

  const menuItems = [
    // 🍔 BURGERS
    { id: 1, name: "Classic Burger", price: 7.99, category: "Burgers", img: "/images/burger1.jpg" },
    { id: 2, name: "Double Burger", price: 9.99, category: "Burgers", img: "/images/burger2.jpg" },
    { id: 3, name: "Cheese Burger", price: 8.49, category: "Burgers", img: "/images/burger3.jpg" },
    { id: 4, name: "Triple Burger", price: 10.99, category: "Burgers", img: "/images/burger4.jpg" },
    { id: 5, name: "Spicy Burger", price: 8.99, category: "Burgers", img: "/images/burger5.jpg" },
    { id: 6, name: "BBQ Burger", price: 8.99, category: "Burgers", img: "/images/burger6.jpg" },
    { id: 7, name: "Zinger Burger", price: 9.49, category: "Burgers", img: "/images/burger7.jpg" },

    // 🌯 WRAPS
    { id: 10, name: "Chicken Wrap", price: 6.99, category: "Wraps", img: "/images/wrap1.jpg" },
    { id: 11, name: "Spicy Chicken Wrap", price: 7.49, category: "Wraps", img: "/images/wrap2.jpg" },
    { id: 12, name: "BBQ Chicken Wrap", price: 7.49, category: "Wraps", img: "/images/wrap3.jpg" },
    { id: 13, name: "Doner Wrap", price: 7.99, category: "Wraps", img: "/images/wrap4.jpg" },

    // 🍟 FRIES & SIDES
    { id: 20, name: "Regular Fries", price: 2.99, category: "Meals", img: "/images/fries.jpg" },
    { id: 21, name: "Large Fries", price: 3.99, category: "Meals", img: "/images/fries.jpg" },
    { id: 22, name: "Cheesy Fries", price: 3.99, category: "Meals", img: "/images/fries2.jpg" },
    { id: 23, name: "Loaded Fries", price: 4.99, category: "Meals", img: "/images/fries3.jpg" },

    // 🍗 CHICKEN
    { id: 30, name: "Chicken Nuggets (6pcs)", price: 4.49, category: "Meals", img: "/images/nuggets.jpg" },
    { id: 31, name: "Chicken Nuggets (12pcs)", price: 6.99, category: "Meals", img: "/images/nuggets.jpg" },
    { id: 32, name: "Hot Wings (6pcs)", price: 5.49, category: "Meals", img: "/images/wings.jpg" },
    { id: 33, name: "Hot Wings (12pcs)", price: 8.99, category: "Meals", img: "/images/wings.jpg" },
    { id: 34, name: "Chicken Strips (4pcs)", price: 5.49, category: "Meals", img: "/images/strips.jpg" },
    { id: 35, name: "Chicken Strips (8pcs)", price: 8.99, category: "Meals", img: "/images/strips.jpg" },

    // 🍽️ MEAL DEALS
    { id: 40, name: "Burger Meal (Burger + Fries + Drink)", price: 10.99, category: "Meals", img: "/images/meal1.jpg" },
    { id: 41, name: "Double Burger Meal", price: 12.49, category: "Meals", img: "/images/meal2.jpg" },
    { id: 42, name: "Wrap Meal (Wrap + Fries + Drink)", price: 9.99, category: "Meals", img: "/images/meal3.jpg" },
    { id: 43, name: "Wings Meal (6 Wings + Fries + Drink)", price: 10.49, category: "Meals", img: "/images/meal4.jpg" },
    { id: 44, name: "Family Box (2 Burgers + 2 Fries + Wings)", price: 19.99, category: "Meals", img: "/images/meal5.jpg" },

    // 🥤 DRINKS
    { id: 50, name: "Coca Cola", price: 1.99, category: "Drinks", img: "/images/drink.jpg" },
    { id: 51, name: "Diet Coke", price: 1.99, category: "Drinks", img: "/images/drink2.jpg" },
    { id: 52, name: "Fanta", price: 1.99, category: "Drinks", img: "/images/drink3.jpg" },
    { id: 53, name: "Sprite", price: 1.99, category: "Drinks", img: "/images/drink4.jpg" },
    { id: 54, name: "Water", price: 1.49, category: "Drinks", img: "/images/drink5.jpg" },
    { id: 55, name: "Milkshake", price: 3.99, category: "Drinks", img: "/images/milkshake.jpg" },

    // 🍰 EXTRAS
    { id: 60, name: "Garlic Dip", price: 0.50, category: "Meals", img: "/images/drip1.PNG" },
    { id: 61, name: "Chilli Dip", price: 0.50, category: "Meals", img: "/images/drip2.PNG" },
    { id: 62, name: "BBQ Dip", price: 0.50, category: "Meals", img: "/images/drip4.WEBP" },
  ];

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
   
    const user = localStorage.getItem("user");
    const saved = user
      ? JSON.parse(localStorage.getItem(`favourites_${user}`)) || []
      : JSON.parse(localStorage.getItem("favourites_guest")) || [];

    if (saved.length > 0) {
      setFavourites(saved);
    }
  }, []);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  

  function toggleFavourite(item) {
    const exists = favourites.find(f => f.id === item.id);

    let updated;
    if (exists) {
      updated = favourites.filter(f => f.id !== item.id);
    } else {
      updated = [...favourites, item];
    }

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
    let updatedCart = [...cart];

    const index = updatedCart.findIndex(i => i.id === item.id);

    if (index !== -1) {
      updatedCart[index].quantity =
        (updatedCart[index].quantity || 1) + 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  }

  const filtered = menuItems.filter(item => {
    return (
      (category === "All" || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div style={{ padding: "40px 8%" }}>

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Menu 🍔
      </h1>

      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          margin: "auto",
          display: "block",
          borderRadius: "8px",
          border: "none"
        }}
      />

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        margin: "30px 0",
        flexWrap: "wrap"
      }}>
        {["All", "Burgers", "Wraps", "Meals", "Drinks"].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className="btn"
            style={{
              background: category === cat ? "#facc15" : "#222",
              color: category === cat ? "black" : "white"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="food-grid">

        {filtered.map(item => {
          const isFav = favourites.find(f => f.id === item.id);

          return (
            <div className="food-card" key={item.id}>
              <img src={item.img} alt={item.name} />

              <div className="food-card-content">
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <span>£{item.price}</span>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px"
                }}>

                  <button
                    className="btn"
                    onClick={() => addToCart(item)}
                  >
                    Add 🛒
                  </button>

                  <button
                    onClick={() => toggleFavourite(item)}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "20px",
                      cursor: "pointer"
                    }}
                  >
                    {isFav ? "❤️" : "🤍"}
                  </button>

                </div>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}