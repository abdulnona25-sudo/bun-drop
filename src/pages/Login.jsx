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
    <div style={{ padding: "40px 8%", textAlign: "center" }}>

      <h1 style={{ marginBottom: "30px" }}>Account</h1>

      {user ? (
        <div>
          <h2>Welcome back, {user} 👋</h2>

          <button
            className="btn"
            style={{ marginTop: "20px" }}
            onClick={handleLogout}
          >
            Logout
          </button>

         
          {lastOrder && (
            <div style={{ marginTop: "30px" }}>
              <h3>Your last order 🔁</h3>

              {lastOrder.map((item, i) => (
                <p key={i}>
                  {item.name} - £{item.price}
                </p>
              ))}
            </div>
          )}

        </div>
      ) : (
        <form
          onSubmit={handleLogin}
          style={{
            maxWidth: "400px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}
        >

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none"
            }}
          />

          <button className="btn" type="submit">
            Login
          </button>

        </form>
      )}

    </div>
  );
}