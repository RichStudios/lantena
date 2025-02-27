import React from 'react';
import { Box, Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { keyframes } from '@mui/system';
import { Link } from 'react-router-dom';
import bgImage from '../images/service-bg-placeholder.jpg';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const RentCollectionAndAccounting = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', p: 4 }}>
      <Container sx={{ backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 2, p: 4, color: 'white' }}>
        <Typography variant="h2" sx={{ mb: 2, animation: `${fadeInUp} 1s ease-out` }}>
          Rent Collection & Accounting
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, animation: `${fadeInUp} 1.2s ease-out` }}>
          Step into the future of financial management. Our cutting‐edge rent collection and accounting solutions integrate real-time analytics, direct digital transfers, and automated reporting to give landlords transparency and control over their income.
        </Typography>
        <List sx={{ mb: 2, animation: `${fadeInUp} 1.4s ease-out` }}>
          <ListItem disablePadding>
            <ListItemText primary="Direct digital rent transfers" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Automated payment tracking" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Transparent monthly digital statements" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Smart late payment alerts" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Real-time financial analytics" />
          </ListItem>
        </List>
        <Button variant="contained" component={Link} to="/signup" sx={{ backgroundColor: 'white', color: '#2C3E50', px: 4, py: 1, borderRadius: 2, animation: `${fadeInUp} 1.6s ease-out` }}>
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default RentCollectionAndAccounting;
