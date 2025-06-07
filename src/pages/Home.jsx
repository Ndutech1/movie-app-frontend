import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Stack } from '@mui/material';

const Home = () => {
  return (
    <Box
      minHeight="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      px={2}
    >
      <Box maxWidth="600px">
        <Typography variant="h3" component="h1" gutterBottom>
          🎬 Welcome to <span style={{ color: '#1976d2' }}>MovieVerse</span>
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Track favorites, explore movies, and build your perfect watchlist.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          mt={4}
        >
          <Button
            component={Link}
            to="/explore"
            variant="contained"
            color="primary"
            size="large"
          >
            Explore Now
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            color="secondary"
            size="large"
          >
            Join Us
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
