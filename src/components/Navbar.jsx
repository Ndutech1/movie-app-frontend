import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack
} from '@mui/material';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          🎬 MovieApp
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/explore" color="inherit">Explore</Button>

          {user ? (
            <>
              <Button component={Link} to="/profile" color="inherit">Profile</Button>
              <Button onClick={handleLogout} color="inherit">Logout</Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">Login</Button>
              <Button component={Link} to="/register" color="inherit">Register</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
