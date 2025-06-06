import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Authcontext';
import API_BASE from '../utils/api';
import '../styles/Profile.css';
import Spinner from '../components/Spinner';


const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState('');
  const [currentTab, setCurrentTab] = useState('favorites');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleDelete = async (type, movieId) => {
    try {
      const res = await fetch(`${API_BASE}/${type}/${movieId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setProfile((prev) => ({
          ...prev,
          [type]: prev[type].filter((movie) => movie.movieId !== movieId),
        }));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const renderList = (type) => {
    const list = profile?.[type]?.filter((movie) =>
      movie.title?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return list.length ? (
      list.map((movie) => (
        <div key={movie.movieId} className="movie-card">
          <span>{movie.title}</span>
          <button onClick={() => handleDelete(type, movie.movieId)}>✖ Remove</button>
        </div>
      ))
    ) : (
      <p className="empty-message">No movies found.</p>
    );
  };

  return (
    <div className="profile-container">
      <h2>{user?.email}'s Dashboard</h2>
      
      <input
        type="text"
        className="search-bar"
        placeholder="🔍 Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="tab-controls">
        <button className={currentTab === 'favorites' ? 'active' : ''} onClick={() => setCurrentTab('favorites')}>Favorites</button>
        <button className={currentTab === 'watchlist' ? 'active' : ''} onClick={() => setCurrentTab('watchlist')}>Watchlist</button>
        <button className={currentTab === 'ratings' ? 'active' : ''} onClick={() => setCurrentTab('ratings')}>Ratings</button>
      </div>

      <div className="movie-list">
        {renderList(currentTab)}
      </div>
    </div>
  );
};

export default Profile;
