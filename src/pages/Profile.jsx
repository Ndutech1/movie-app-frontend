import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Authcontext';
import API_BASE from '../utils/api';
import Spinner from '../components/Spinner';
import {
  Box,
  Typography,
  TextField,
  Tabs,
  Tab,
  Button,
  Stack,
  Paper
} from '@mui/material';

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
      <Stack spacing={2} mt={2}>
        {list.map((movie) => (
          <Paper key={movie.movieId} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>{movie.title}</Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(type, movie.movieId)}
            >
              ✖ Remove
            </Button>
          </Paper>
        ))}
      </Stack>
    ) : (
      <Typography mt={3} variant="body2" color="text.secondary">
        No movies found.
      </Typography>
    );
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>
        {user?.email}'s Dashboard
      </Typography>

      <TextField
        fullWidth
        label="Search movies"
        placeholder="🔍 Search movies..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Tabs
        value={currentTab}
        onChange={(e, newVal) => setCurrentTab(newVal)}
        textColor="primary"
        indicatorColor="primary"
        aria-label="Profile tabs"
      >
        <Tab label="Favorites" value="favorites" />
        <Tab label="Watchlist" value="watchlist" />
        <Tab label="Ratings" value="ratings" />
      </Tabs>

      {profile ? (
        <Box mt={3}>
          {renderList(currentTab)}
        </Box>
      ) : (
        <Spinner /> // or <Typography>Loading...</Typography> if you prefer
      )}
    </Box>
  );
};

export default Profile;
