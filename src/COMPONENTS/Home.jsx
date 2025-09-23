import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [portfolio, setPortfolio] = useState(null);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/portfolio/user/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Portfolio API response:", data);

          if (data) {
            setPortfolio(data);
          }
        } else {
          console.error("Failed to fetch portfolio");
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };

    if (userId) {
      fetchPortfolio();
    }
  }, [userId]);

  // Helper to render social links
  const renderSocialLinks = (links) => {
    if (!links) return null;

    try {
      // Try parsing as JSON first
      const parsed = JSON.parse(links);
      return Object.entries(parsed).map(([key, value]) => (
        <a
          key={key}
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
        >
          {key}
        </a>
      ));
    } catch (err) {
      // Fallback for plain comma-separated URLs
      return links.split(",").map((link, idx) => {
        const trimmed = link.trim();
        let label = "Link";

        if (trimmed.includes("linkedin.com")) label = "LinkedIn";
        else if (trimmed.includes("github.com")) label = "GitHub";

        return (
          <a
            key={idx}
            href={trimmed}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            {label}
          </a>
        );
      });
    }
  };

  return (
    <div>
      <div className="home-container">
        <h1>Welcome, {username}!</h1>
        <h2>Your Portfolio</h2>
        {portfolio ? (
          <div className="portfolio-card">
            <img
              src={
                portfolio.imageUrl
                  ? `http://localhost:8081${portfolio.imageUrl}`
                  : "https://picsum.photos/150"
              }
              alt="Profile"
              className="portfolio-image"
              onError={(e) => {
                e.target.src = "/default.jpg"; // fallback to local image
              }}
            />
            <h3>{portfolio.username}</h3>
            <p>
              <strong>Bio:</strong> {portfolio.bio}
            </p>
            <p>
              <strong>Skills:</strong> {portfolio.skills}
            </p>
            <p>
              <strong>Projects:</strong> {portfolio.projects}
            </p>
            <div className="social-links">
              {renderSocialLinks(portfolio.socialLinks)}
            </div>
          </div>
        ) : (
          <p>No portfolio found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
