import { useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext.jsx';
import API_BASE from '../utils/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@mui/material';

const TMDB_API_KEY = 'bd3a027dee12f7f128d9a8a49c71da54'; // Replace with your key

const Explore = () => {
  const { token } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
    );
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
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Explore Movies
      </Typography>

      <Box display="flex" gap={2} mb={4}>
        <TextField
          label="Search for movies..."
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      <Grid container spacing={3}>
        {results.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="360"
                image={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image'
                }
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6" noWrap>{movie.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.release_date}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleAdd('favorites', movie)}>
                  + Favorite
                </Button>
                <Button size="small" onClick={() => handleAdd('watchlist', movie)}>
                  + Watchlist
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Explore;
