import React from 'react';
import { Box, Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { keyframes } from '@mui/system';
import { Link } from 'react-router-dom';
import bgImage from '../images/service-bg-placeholder.jpg';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const PropertyMarketing = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', p: 4 }}>
      <Container sx={{ backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 2, p: 4, color: 'white' }}>
        <Typography variant="h2" sx={{ mb: 2, animation: `${fadeInUp} 1s ease-out` }}>
          Property Marketing
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, animation: `${fadeInUp} 1.2s ease-out` }}>
          Revolutionize your property's visibility with our futuristic marketing solutions. Harness AI-driven strategies, immersive virtual tours, and targeted campaigns to captivate and convert your audience.
        </Typography>
        <List sx={{ mb: 2, animation: `${fadeInUp} 1.4s ease-out` }}>
          <ListItem disablePadding>
            <ListItemText primary="AI-driven strategic advertising" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Immersive virtual tours & professional photography" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Tailored digital marketing campaigns" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Interactive brand management" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Smart lead conversion tools" />
          </ListItem>
        </List>
        <Button variant="contained" component={Link} to="/signup" sx={{ backgroundColor: 'white', color: '#2C3E50', px: 4, py: 1, borderRadius: 2, animation: `${fadeInUp} 1.6s ease-out` }}>
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default PropertyMarketing;
