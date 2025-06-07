import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        px: 2,
        textAlign: 'center',
        bgcolor: 'background.paper',
        borderTop: '1px solid #ccc',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} MovieVerse 🎬 | Built with ❤️ by Ndutech
      </Typography>
    </Box>
  );
};

export default Footer;
