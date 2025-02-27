import React, { useState } from "react";
import axios from "axios";
import { Grid, Typography, Paper, Divider, Stack, IconButton, Avatar, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// Import background video from images folder
import loginBgVideo from '../images/Login background loop.mp4';

// Import social logos (PNG files)
import appleLogo from '../images/apple.png';
import googleLogo from '../images/google.png';
import outlookLogo from '../images/outlook.png';
import yahooLogo from '../images/yahoo.png';

const socialProviders = [
  { name: 'Google', logo: googleLogo },
  { name: 'Apple', logo: appleLogo },
  { name: 'Yahoo', logo: yahooLogo },
  { name: 'Outlook', logo: outlookLogo },
];

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", loginData);
      console.log(response.data); // JWT token or success message
      // Optionally store the token and redirect
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  // Updated social login handler: Redirects to the backend OAuth endpoint
  const handleSocialLogin = (provider) => {
    let url = "";
    switch (provider) {
      case 'Google':
        url = "http://localhost:5000/api/auth/google";
        break;
      case 'Apple':
        url = "http://localhost:5000/api/auth/apple";
        break;
      case 'Yahoo':
        url = "http://localhost:5000/api/auth/yahoo";
        break;
      case 'Outlook':
        url = "http://localhost:5000/api/auth/outlook";
        break;
      default:
        return;
    }
    window.location.href = url;
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(100%) blur(3px)',
          zIndex: -1,
        }}
      >
        <source src={loginBgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', p: 3 }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box sx={{ transform: 'scale(0.85)', margin: 'auto' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.9)' }}>
              <Typography variant="h4" align="center" gutterBottom>
                Property Management Login
              </Typography>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <Button type="submit" variant="contained" sx={{ backgroundColor: '#2C3E50', color: 'white', mt: 2 }}>
                  Login
                </Button>
              </form>
              <Divider sx={{ my: 3 }}>OR</Divider>
              <Stack direction="row" spacing={2} justifyContent="center">
                {socialProviders.map((provider) => (
                  <IconButton
                    key={provider.name}
                    onClick={() => handleSocialLogin(provider.name)}
                    sx={{ border: '1px solid #ccc', borderRadius: '50%', p: 1 }}
                  >
                    <Avatar
                      src={provider.logo}
                      alt={`${provider.name} logo`}
                      sx={{ width: 30, height: 30, bgcolor: 'transparent' }}
                      title={provider.name === 'Google' ? 'Google icons created by Freepik - Flaticon' : ''}
                    />
                  </IconButton>
                ))}
              </Stack>
              {/* Sign Up Section */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Don't have an account?
                </Typography>
                <Button variant="contained" component={Link} to="/signup" sx={{ backgroundColor: '#2C3E50', color: 'white' }}>
                  Sign Up
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
