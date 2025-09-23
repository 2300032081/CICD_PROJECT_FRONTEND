import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user info
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="logo">MyPortfolio</div>

      <div className="navbar-right">
        <ul className="nav-links">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
