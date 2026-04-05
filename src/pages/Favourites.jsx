import React, { useState, useEffect } from "react";

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

  return (
    <div style={{ padding: "40px 8%" }}>

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Your Favourites ❤️
      </h1>

      {/* EMPTY STATE */}
      {favourites.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>No favourites yet 🤍</h2>
          <p style={{ color: "#aaa" }}>
            Go to menu and add some ❤️
          </p>
        </div>
      ) : (

        <div className="food-grid">

          {favourites.map(item => (
            <div className="food-card" key={item.id}>
              <img src={item.img} alt={item.name} />

              <div className="food-card-content">
                <h3>{item.name}</h3>
                <span>£{item.price}</span>

                <button
                  className="btn"
                  style={{ marginTop: "10px", background: "#ff4d4d" }}
                  onClick={() => removeFavourite(item.id)}
                >
                  Remove ❌
                </button>
              </div>
            </div>
          ))}

        </div>

      )}

    </div>
  );
}