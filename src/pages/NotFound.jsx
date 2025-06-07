import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      minHeight="80vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      px={2}
    >
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found 🚫
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 3 }}
      >
        ← Go back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
