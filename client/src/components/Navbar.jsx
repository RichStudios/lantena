import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import navbarLogo from '../images/lantena_white_navbar.png';

const Navbar = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    // Only apply scroll behavior on the sign-up page
    if (location.pathname === '/signup') {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // On other pages, always show the navbar
      setShowNavbar(true);
    }
  }, [location]);

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          transform: showNavbar ? 'translateY(-5px)' : 'translateY(-100%)'
        }
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Box
            component="img"
            src={navbarLogo}
            alt="Lantena Logo"
            sx={{ height: 40, cursor: 'pointer' }}
          />
        </Link>
        <Box sx={{ display: 'flex', gap: '2rem' }}>
          <Button color="inherit" component={Link} to="/">
            HOME
          </Button>
          <Button color="inherit" component={Link} to="/properties">
            PROPERTIES
          </Button>
          <Button color="inherit" component={Link} to="/project">
            PROJECT
          </Button>
          <Button color="inherit" component={Link} to="/pricing">
            PRICING
          </Button>
          <Button
            component={Link}
            to="/login"
            sx={{
              backgroundColor: 'white',
              color: '#2C3E50',
              '&:hover': { backgroundColor: '#f5f5f5' },
              borderRadius: '4px',
              px: 3,
            }}
          >
            LOGIN
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
