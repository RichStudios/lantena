import React from 'react';
import { Box, Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { keyframes } from '@mui/system';
import { Link } from 'react-router-dom';
import bgImage from '../images/service-bg-placeholder.jpg';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Assessment = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', p: 4 }}>
      <Container sx={{ backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 2, p: 4, color: 'white' }}>
        <Typography variant="h2" sx={{ mb: 2, animation: `${fadeInUp} 1s ease-out` }}>
          Assessment of Rent & Service Charges
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, animation: `${fadeInUp} 1.2s ease-out` }}>
          Unlock the power of smart data with our futuristic assessment services. Our digital tools and advanced market analytics ensure competitive and fair rent and service charges, optimizing your property's financial performance.
        </Typography>
        <List sx={{ mb: 2, animation: `${fadeInUp} 1.4s ease-out` }}>
          <ListItem disablePadding>
            <ListItemText primary="Advanced market analytics" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Digital property valuation" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Transparent service charge breakdown" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Smart cost optimization" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Interactive financial reporting" />
          </ListItem>
        </List>
        <Button variant="contained" component={Link} to="/signup" sx={{ backgroundColor: 'white', color: '#2C3E50', px: 4, py: 1, borderRadius: 2, animation: `${fadeInUp} 1.6s ease-out` }}>
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default Assessment;
