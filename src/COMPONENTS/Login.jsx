import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login API response:", data);

        // Save username
        localStorage.setItem("username", data.username);

        // Fetch userId by username
        const userResponse = await fetch(
          `http://localhost:8081/api/auth/user/${data.username}`
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("User API response:", userData);

          // ✅ Save userId
          localStorage.setItem("userId", userData.id);
        } else {
          console.error("Failed to fetch userId");
        }

        navigate("/home"); // Go to home page
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login"> 
    <div className="login-page-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
