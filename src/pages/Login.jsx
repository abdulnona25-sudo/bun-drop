import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaEnvelope, FaSignOutAlt, FaHistory, FaCheckCircle } from "react-icons/fa";

export default function Login() {
  const [tab, setTab] = useState("login"); // "login" | "signup"
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [signupForm, setSignupForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(savedUser);
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    const { username, password } = loginForm;
    if (!username || !password) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(u => u.username === username);

    if (!found) {
      setError("No account found. Please sign up first.");
      return;
    }
    if (found.password !== password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    localStorage.setItem("user", username);
    setUser(username);
    window.dispatchEvent(new Event("storage"));

    // Merge guest favourites
    const guestFavs = JSON.parse(localStorage.getItem("favourites_guest")) || [];
    const userFavs = JSON.parse(localStorage.getItem(`favourites_${username}`)) || [];
    const merged = [...userFavs];
    guestFavs.forEach(fav => { if (!userFavs.find(u => u.id === fav.id)) merged.push(fav); });
    localStorage.setItem(`favourites_${username}`, JSON.stringify(merged));
    localStorage.removeItem("favourites_guest");

    setLoginForm({ username: "", password: "" });
  }

  function handleSignup(e) {
    e.preventDefault();
    setError("");
    const { username, email, password, confirm } = signupForm;

    if (!username || !password || !confirm) {
      setError("Please fill in all required fields.");
      return;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.username === username)) {
      setError("Username already taken. Please choose another.");
      return;
    }

    const newUser = { username, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("user", username);
    setUser(username);
    window.dispatchEvent(new Event("storage"));

    const guestFavs = JSON.parse(localStorage.getItem("favourites_guest")) || [];
    localStorage.setItem(`favourites_${username}`, JSON.stringify(guestFavs));
    localStorage.removeItem("favourites_guest");

    setSignupForm({ username: "", email: "", password: "", confirm: "" });
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    setSuccess("Logged out successfully.");
    setTimeout(() => setSuccess(""), 3000);
    window.dispatchEvent(new Event("storage"));
  }

  const lastOrder = user ? JSON.parse(localStorage.getItem(`lastOrder_${user}`)) : null;
  const userInfo = user
    ? (JSON.parse(localStorage.getItem("users")) || []).find(u => u.username === user)
    : null;

  if (user) {
    return (
      <div className="login-page fade-in">
        <div className="login-box" style={{ maxWidth: 460 }}>
          {/* Avatar */}
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "var(--brand-glow)",
            border: "2px solid rgba(232,50,26,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: 28,
          }}>
            🍔
          </div>
          <h1 style={{ fontSize: "2rem", marginBottom: 4 }}>Hey, {user}!</h1>
          <p style={{ color: "var(--text-muted)", textAlign: "center", marginBottom: 24, fontSize: 14 }}>
            Welcome back to Bun Drop 🔥
          </p>

          {userInfo?.email && (
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "var(--bg2)", borderRadius: "var(--radius-sm)",
              padding: "10px 14px", marginBottom: 20,
              border: "1px solid var(--border)",
            }}>
              <FaEnvelope style={{ color: "var(--text-faint)", fontSize: 13 }} />
              <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{userInfo.email}</span>
            </div>
          )}

          {/* Last Order */}
          {lastOrder && lastOrder.length > 0 && (
            <div style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "16px",
              marginBottom: "20px",
            }}>
              <p style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: "12px", fontWeight: "700",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--brand)", marginBottom: "12px",
              }}>
                <FaHistory /> Last Order
              </p>
              {lastOrder.map((item, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: "14px", color: "var(--text-muted)",
                  padding: "6px 0",
                  borderBottom: i < lastOrder.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <span>{item.name}{item.quantity > 1 ? ` ×${item.quantity}` : ""}</span>
                  <span style={{ color: "var(--text)", fontWeight: 600 }}>
                    £{(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              ))}
              <div style={{
                display: "flex", justifyContent: "space-between",
                marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border)",
                fontWeight: 700, fontSize: 15,
              }}>
                <span style={{ color: "var(--text-muted)" }}>Total</span>
                <span style={{ color: "var(--brand)" }}>
                  £{lastOrder.reduce((s, i) => s + i.price * (i.quantity || 1), 0).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <button
            className="btn"
            style={{ width: "100%", justifyContent: "center", gap: 10, background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)" }}
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Log Out
          </button>

          {success && (
            <p style={{ textAlign: "center", color: "#7cd43c", fontSize: 13, marginTop: 12 }}>
              ✓ {success}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="login-page fade-in">
      <div className="login-box">
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: "2rem",
            color: "var(--brand)", letterSpacing: "0.05em", marginBottom: 4,
          }}>BUN DROP</div>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            {tab === "login" ? "Welcome back! Log in to continue." : "Create your account — it's free!"}
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", background: "var(--bg2)",
          borderRadius: "var(--radius-sm)", padding: 4,
          marginBottom: 24, border: "1px solid var(--border)",
        }}>
          {["login", "signup"].map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); }}
              style={{
                flex: 1, padding: "10px",
                borderRadius: "var(--radius-sm)",
                border: "none", cursor: "pointer",
                fontSize: 14, fontWeight: 600,
                fontFamily: "var(--font-body)",
                background: tab === t ? "var(--brand)" : "transparent",
                color: tab === t ? "#fff" : "var(--text-muted)",
                transition: "all 0.2s ease",
              }}
            >
              {t === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(232,50,26,0.1)",
            border: "1px solid rgba(232,50,26,0.25)",
            borderRadius: "var(--radius-sm)",
            padding: "10px 14px",
            marginBottom: 16,
            fontSize: 13,
            color: "var(--brand)",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            ⚠️ {error}
          </div>
        )}

        {tab === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Username"
                value={loginForm.username}
                onChange={e => setLoginForm(f => ({ ...f, username: e.target.value }))}
                required
              />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                required
              />
            </div>
            <button className="btn" type="submit" style={{ width: "100%", justifyContent: "center", marginTop: 8, padding: 14, fontSize: 15 }}>
              Log In 🔐
            </button>
            <p style={{ textAlign: "center", color: "var(--text-faint)", fontSize: 13, marginTop: 16 }}>
              No account?{" "}
              <button
                type="button"
                onClick={() => { setTab("signup"); setError(""); }}
                style={{ background: "none", border: "none", color: "var(--brand)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
              >
                Sign up for free
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Username *"
                value={signupForm.username}
                onChange={e => setSignupForm(f => ({ ...f, username: e.target.value }))}
                required
              />
            </div>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email (optional)"
                value={signupForm.email}
                onChange={e => setSignupForm(f => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password * (min 6 chars)"
                value={signupForm.password}
                onChange={e => setSignupForm(f => ({ ...f, password: e.target.value }))}
                required
              />
            </div>
            <div className="input-group">
              <FaCheckCircle className="input-icon" />
              <input
                type="password"
                placeholder="Confirm Password *"
                value={signupForm.confirm}
                onChange={e => setSignupForm(f => ({ ...f, confirm: e.target.value }))}
                required
              />
            </div>
            <button className="btn" type="submit" style={{ width: "100%", justifyContent: "center", marginTop: 8, padding: 14, fontSize: 15 }}>
              Create Account 🚀
            </button>
            <p style={{ textAlign: "center", color: "var(--text-faint)", fontSize: 13, marginTop: 16 }}>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => { setTab("login"); setError(""); }}
                style={{ background: "none", border: "none", color: "var(--brand)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
              >
                Log in
              </button>
            </p>
          </form>
        )}
      </div>

      <style>{`
        .input-group {
          position: relative;
          margin-bottom: 12px;
        }
        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-faint);
          font-size: 14px;
          pointer-events: none;
        }
        .input-group input {
          padding-left: 40px !important;
        }
        .login-box input {
          width: 100%;
          background: var(--bg2);
          border: 1px solid var(--border);
          color: var(--text);
          font-family: var(--font-body);
          font-size: 15px;
          padding: 13px 16px;
          border-radius: var(--radius-sm);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          margin: 0;
        }
        .login-box input:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px var(--brand-glow);
        }
        .login-box input::placeholder {
          color: var(--text-faint);
        }
      `}</style>
    </div>
  );
}