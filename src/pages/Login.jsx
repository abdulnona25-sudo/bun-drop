import React, { useState, useEffect } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (!username || !password) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
      if (existingUser.password === password) {
        localStorage.setItem("user", username);
        setUser(username);
        window.dispatchEvent(new Event("storage"));

        const guestFavs = JSON.parse(localStorage.getItem("favourites_guest")) || [];
        const userFavs = JSON.parse(localStorage.getItem(`favourites_${username}`)) || [];
        const mergedFavs = [...userFavs];
        guestFavs.forEach(fav => {
          if (!userFavs.find(u => u.id === fav.id)) mergedFavs.push(fav);
        });
        localStorage.setItem(`favourites_${username}`, JSON.stringify(mergedFavs));
        localStorage.removeItem("favourites_guest");
      } else {
        alert("Wrong password");
      }
    } else {
      const newUser = { username, password };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      localStorage.setItem("user", username);
      setUser(username);
      window.dispatchEvent(new Event("storage"));

      const guestFavs = JSON.parse(localStorage.getItem("favourites_guest")) || [];
      localStorage.setItem(`favourites_${username}`, JSON.stringify(guestFavs));
      localStorage.removeItem("favourites_guest");
    }

    setUsername("");
    setPassword("");
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
  }

  const lastOrder = user
    ? JSON.parse(localStorage.getItem(`lastOrder_${user}`))
    : null;

  return (
    <div className="login-page fade-in">
      {user ? (
        <div className="login-box">
          <h1>👋 Hey, {user}!</h1>
          <p style={{ color: "var(--text-muted)", textAlign: "center", marginBottom: "24px", fontSize: "15px" }}>
            Welcome back to Bun Drop
          </p>

          {lastOrder && lastOrder.length > 0 && (
            <div style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "16px",
              marginBottom: "20px",
            }}>
              <p style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--brand)",
                marginBottom: "10px",
              }}>
                Last Order 🔁
              </p>
              {lastOrder.map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  padding: "4px 0",
                  borderBottom: i < lastOrder.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <span>{item.name} {item.quantity > 1 ? `×${item.quantity}` : ""}</span>
                  <span style={{ color: "var(--text)" }}>£{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <button className="btn" style={{ width: "100%", justifyContent: "center" }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="login-box">
          <h1>ACCOUNT</h1>
          <p style={{ color: "var(--text-muted)", textAlign: "center", marginBottom: "24px", fontSize: "14px" }}>
            Login or create a new account
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn" type="submit">
              Login / Register
            </button>
          </form>
          <p style={{ color: "var(--text-faint)", fontSize: "12px", textAlign: "center", marginTop: "16px" }}>
            No account? Just enter a username and password to create one.
          </p>
        </div>
      )}
    </div>
  );
}