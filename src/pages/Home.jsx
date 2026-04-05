import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      {/* 🔥 HERO */}
      <section className="hero fade-in">
        <h1>Fresh Burgers. Fast Delivery.</h1>
        <p>Order your favourite meals in seconds.</p>

        <Link to="/menu" className="btn">
          Order Now 🍔
        </Link>
      </section>

      {/* 🔥 POPULAR FOOD */}
      <section className="fade-in">
        <h2 style={{ textAlign: "center", marginTop: "40px" }}>
          Popular Meals 🔥
        </h2>

        <div className="food-grid">

          <div className="food-card">
            <img src="/images/burger1.jpg" alt="burger" />
            <div className="food-card-content">
              <h3>Classic Burger</h3>
              <p>Juicy beef, cheese, fresh salad</p>
              <span>£7.99</span>
            </div>
          </div>

          <div className="food-card">
            <img src="/images/burger2.jpg" alt="burger" />
            <div className="food-card-content">
              <h3>Double Burger</h3>
              <p>Double beef, cheese, sauce</p>
              <span>£9.99</span>
            </div>
          </div>

          <div className="food-card">
            <img src="/images/wrap1.jpg" alt="wrap" />
            <div className="food-card-content">
              <h3>Chicken Wrap</h3>
              <p>Grilled chicken, garlic sauce</p>
              <span>£6.99</span>
            </div>
          </div>

          <div className="food-card">
            <img src="/images/fries.jpg" alt="fries" />
            <div className="food-card-content">
              <h3>Loaded Fries</h3>
              <p>Cheese, sauce, crispy fries</p>
              <span>£4.99</span>
            </div>
          </div>

        </div>
      </section>

      {/* 🔥 ORDER OPTIONS */}
      <section className="fade-in" style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>Order Your Way</h2>
        <p style={{ color: "#aaa", marginBottom: "20px" }}>
          Choose your favourite way to order
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>

          {/* PUT REAL LINKS HERE LATER */}
          <a href="https://www.ubereats.com/gb/store/bun-drop/UaASnld3SSOAY3bu7HRkQQ?diningMode=DELIVERY&ps=1&sc=SEARCH_SUGGESTION" className="btn">Uber Eats 🚀</a>
          <a href="https://www.just-eat.co.uk/restaurants-bun-drop-whiteinch/menu" className="btn">Just Eat 🛵</a>
          <a href="tel:01413783463" className="btn">Call 📞</a>

        </div>
      </section>

      {/* 🔥 REVIEWS */}
      <section className="fade-in" style={{ padding: "60px 8%" }}>
        <h2 style={{ textAlign: "center" }}>Customer Reviews ⭐</h2>

        <div className="food-grid">

          <div className="food-card">
            <div className="food-card-content">
              <h3>⭐️⭐️⭐️⭐️⭐️</h3>
              <p>Best burger I’ve had in a long time!</p>
            </div>
          </div>

          <div className="food-card">
            <div className="food-card-content">
              <h3>⭐️⭐️⭐️⭐️⭐️</h3>
              <p>Fast delivery and amazing taste 🔥</p>
            </div>
          </div>

          <div className="food-card">
            <div className="food-card-content">
              <h3>⭐️⭐️⭐️⭐️⭐️</h3>
              <p>Always fresh and clean food.</p>
            </div>
          </div>
        </div>
    <div style={{ textAlign: "center", marginTop: "30px" }}>
    <a
        href="https://www.google.com/search?sca_esv=2acb43a4eea5ff8c&rlz=1C5CHFA_enGB1131GB1131&sxsrf=ANbL-n6IEqM_D4Ms6ukGYYSZbIr4OSIT6A:1775352071102&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOaHaKNGvkKNrWPc1oNLLW0fpPSFDmZh2m3rnZTDxoxaYC3Eiq3mXPSfboggrTy8awDDQ911Ca74l1QfXtjXALnSV2DKu&q=Bun+Drop+Reviews&sa=X&ved=2ahUKEwj7k7LsxdWTAxWjRfEDHd1JK8kQ0bkNegQIJxAF&biw=911&bih=720&dpr=2"
        target="_blank"
        rel="noreferrer"
        className="btn review-btn"
    >
        Leave a Review ⭐
    </a>
    </div>
      </section>

    </div>
  );
}