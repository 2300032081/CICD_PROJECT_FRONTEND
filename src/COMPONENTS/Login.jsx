import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Backend base URL
  const API_URL = "https://cicdprojectbackend-production.up.railway.app";

  // 🔑 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login success:", data);

        // Save username
        localStorage.setItem("username", data.username);

        // Fetch user details (by username → your backend must support this)
        const userResponse = await fetch(
          `${API_URL}/api/auth/user/${data.username}`
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          localStorage.setItem("userId", userData.id);
          console.log("User details:", userData);
        } else {
          console.error("Failed to fetch user details");
        }

        // Redirect to home
        navigate("/home");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login");
    }
  };

  // 🔑 Handle Signup
  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Account created successfully! Please log in.");
      } else {
        const errorData = await response.json();
        alert("Signup failed: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong during signup");
    }
  };

  return (
    <div className="page-wrapper">
      {/* App title */}
      <div className="portfolio-container">
        <h1>Portfolio App</h1>
      </div>

      {/* Login inputs */}
      <div className="login-top-right">
        <form onSubmit={handleLogin} className="login-inline-form">
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
          <button type="button" onClick={handleSignup}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
