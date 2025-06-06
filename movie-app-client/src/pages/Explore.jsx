import { useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import API_BASE from '../utils/api';
import '../styles/Explore.css';

const TMDB_API_KEY = 'bd3a027dee12f7f128d9a8a49c71da54'; // Replace with your key

const Explore = () => {
  const { token } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
    const data = await res.json();
    setResults(data.results || []);
  };

  const handleAdd = async (type, movie) => {
    try {
      await fetch(`${API_BASE}/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: movie.id,
          title: movie.title,
        }),
      });
      alert(`${movie.title} added to ${type}`);
    } catch (err) {
      console.error(err);
      alert('Failed to add movie.');
    }
  };

  return (
    <div className="explore-wrapper">
      <h2 className="explore-title">Explore Movies</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="explore-container">
        {results.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Image'
              }
              alt={movie.title}
            />
            <div className="movie-content">
              <div className="movie-title">{movie.title}</div>
              <div className="movie-meta">{movie.release_date}</div>
              <div className="movie-buttons">
                <button onClick={() => handleAdd('favorites', movie)}>+ Favorite</button>
                <button onClick={() => handleAdd('watchlist', movie)}>+ Watchlist</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
