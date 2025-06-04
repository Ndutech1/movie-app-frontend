import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>🎬 Welcome to <span className="highlight">MovieVerse</span></h1>
        <p>Track favorites, explore movies, and build your perfect watchlist.</p>
        <div className="home-buttons">
          <Link to="/explore" className="home-btn explore-btn">Explore Now</Link>
          <Link to="/register" className="home-btn register-btn">Join Us</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
