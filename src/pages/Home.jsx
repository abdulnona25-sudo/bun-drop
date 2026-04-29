import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-tag">🔥 Glasgow's Freshest Burgers</div>
        <h1>FRESH<br /><span>BURGERS.</span><br />FAST.</h1>
        <p>Made fresh, delivered fast. Order your favourite Bun Drop meals in seconds.</p>
        <div className="hero-actions">
          <Link to="/menu" className="btn">Browse Menu 🍔</Link>
          <a href="tel:01413783463" className="btn btn-ghost">Call to Order 📞</a>
        </div>
      </section>

      {/* POPULAR */}
      <section style={{ padding: "80px 8%" }} className="fade-in">
        <p className="section-label">Most Ordered</p>
        <h2 className="section-title">POPULAR MEALS</h2>
        <div className="food-grid">
          {[
            { name: "Classic Burger", desc: "Juicy beef, cheddar, fresh salad", price: "£7.99", img: "/images/burger1.jpg", tag: "hot" },
            { name: "Double Stack", desc: "Double beef patties, house sauce", price: "£9.99", img: "/images/burger2.jpg", tag: "hot" },
            { name: "Chicken Wrap", desc: "Crispy chicken, garlic mayo, fresh slaw", price: "£6.99", img: "/images/wrap1.jpg", tag: null },
            { name: "Loaded Fries", desc: "Cheese sauce, crispy bacon, jalapeños", price: "£4.99", img: "/images/fries.jpg", tag: "new" },
          ].map((item) => (
            <div className="food-card" key={item.name}>
              <img src={item.img} alt={item.name} />
              <div className="food-card-content">
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                  <h3>{item.name}</h3>
                  {item.tag === "hot" && <span className="tag tag-hot">Hot</span>}
                  {item.tag === "new" && <span className="tag tag-new">New</span>}
                </div>
                <p>{item.desc}</p>
                <span>{item.price}</span>
                <div className="food-card-actions">
                  <Link to="/menu" className="btn" style={{ fontSize: "13px" }}>Order Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ORDER OPTIONS */}
      <section className="order-section fade-in">
        <p className="section-label">Order Your Way</p>
        <h2 className="section-title">HOW DO YOU WANT IT?</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "440px", margin: "0 auto 28px", fontSize: "15px" }}>
          Pick your preferred platform — we're on all of them.
        </p>
        <div className="order-btns">
          <a href="https://www.ubereats.com/gb/store/bun-drop/UaASnld3SSOAY3bu7HRkQQ?diningMode=DELIVERY&ps=1&sc=SEARCH_SUGGESTION" className="btn" target="_blank" rel="noreferrer">
            Uber Eats 🚀
          </a>
          <a href="https://www.just-eat.co.uk/restaurants-bun-drop-whiteinch/menu" className="btn btn-ghost" target="_blank" rel="noreferrer">
            Just Eat 🛵
          </a>
          <a href="tel:01413783463" className="btn btn-ghost">Call Us 📞</a>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews-section fade-in">
        <p className="section-label">What People Say</p>
        <h2 className="section-title">REVIEWS</h2>
        <div className="food-grid">
          {[
            { text: "Best burger I've had in a long time! The beef is quality and buns are always fresh.", author: "John M." },
            { text: "Fast delivery and the taste is absolutely incredible. The loaded fries are addictive 🔥", author: "Sarah K." },
            { text: "Always fresh, always clean, always on time. Bun Drop never lets me down.", author: "Ravi P." },
          ].map((review, i) => (
            <div className="review-card" key={i}>
              <div className="review-stars">★★★★★</div>
              <p>"{review.text}"</p>
              <p style={{ color: "var(--text-faint)", fontSize: "13px", marginTop: "14px", fontWeight: "600" }}>
                — {review.author}
              </p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <a
            href="https://www.google.com/search?q=Bun+Drop+Reviews"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            Leave a Review ⭐
          </a>
        </div>
      </section>
    </div>
  );
}