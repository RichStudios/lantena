import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, ButtonBase, IconButton, Fade } from '@mui/material';
import { keyframes } from '@mui/system';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

// Import images for the hero section
import backgroundHero from '../images/BackgroundHeroSection.jpg';
import heroLogo from '../images/lantena_white_herosection.png';

// Import service images as PNGs (note the corrected path for Rent Collection image)
import rentCollectionImg from '../images/Rent Collection and Accounting.png';
import tenantManagementImg from '../images/Tenant Management.png';
import propertyManagementImg from '../images/Property Management.png';
import assessmentImg from '../images/Assessment of Rent and Service Charges.png';
import mriFilingImg from '../images/MRI and Filing.png';
import propertyMarketingImg from '../images/Property Marketing.png';
import projectManagementImg from '../images/Project Management.png';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Landing = () => {
  // State to control the overlay explainer
  const [selectedService, setSelectedService] = useState(null);

  // Services array with descriptions for each service
  const services = [
    { 
      title: 'Rent Collection & Accounting', 
      image: rentCollectionImg, 
      description: 'Experience efficient digital rent collection, automated tracking, and transparent monthly statements for smooth financial management.' 
    },
    { 
      title: 'Tenant Management', 
      image: tenantManagementImg, 
      description: 'Utilize smart screening, automated lease processing, and intuitive communication tools to enhance tenant relations.' 
    },
    { 
      title: 'Property Management', 
      image: propertyManagementImg, 
      description: 'Modernize your property oversight with innovative tools for maintenance coordination and performance optimization.' 
    },
    { 
      title: 'Assessment of Rent & Service Charges', 
      image: assessmentImg, 
      description: 'Leverage advanced market analytics and interactive reporting to set competitive rates and optimize costs.' 
    },
    { 
      title: 'MRI & Filing', 
      image: mriFilingImg, 
      description: 'Keep your property records organized with secure digital filing and automated compliance reviews.' 
    },
    { 
      title: 'Property Marketing', 
      image: propertyMarketingImg, 
      description: 'Boost your property’s visibility using immersive virtual tours, targeted campaigns, and professional branding strategies.' 
    },
    { 
      title: 'Project Management', 
      image: projectManagementImg, 
      description: 'Drive projects with real-time tracking, automated scheduling, and smart contractor coordination for timely delivery.' 
    },
  ];

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  const handleCloseOverlay = (e) => {
    e.stopPropagation();
    setSelectedService(null);
  };

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden' }}>
      {/* Hero Section (70% of viewport height) */}
      <Box
        sx={{
          position: 'relative',
          height: '70vh',
          backgroundImage: `url(${backgroundHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Dark overlay behind hero content */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            zIndex: 0,
          }}
        />
        {/* Hero Content – Shown only when no service is selected */}
        {!selectedService && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: 'white',
              px: 2,
              zIndex: 1,
            }}
          >
            {/* White Circular Container for Hero Logo */}
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: '50%',
                width: { xs: 165, md: 220 },
                height: { xs: 165, md: 220 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                animation: `${fadeInUp} 1s ease-out`,
              }}
            >
              <Box
                component="img"
                src={heroLogo}
                alt="Hero Logo"
                sx={{
                  width: '90%',
                  height: '90%',
                  objectFit: 'contain',
                }}
              />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                animation: `${fadeInUp} 1.2s ease-out`,
              }}
            >
              MAXIMIZE YOUR PROPERTY'S POTENTIAL
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: '#2C3E50',
                px: 4,
                py: 1,
                borderRadius: 2,
                mb: 2,
                animation: `${fadeInUp} 1.4s ease-out`,
              }}
            >
              Get Started
            </Button>
            <Typography
              variant="h4"
              sx={{
                position: 'absolute',
                bottom: 20,
                width: '100%',
                textAlign: 'center',
                animation: `${fadeInUp} 1.6s ease-out`,
              }}
            >
              Our Services
            </Typography>
          </Box>
        )}
        {/* Explainer Overlay – Appears over the hero section only */}
        {selectedService && (
          <Box
            onClick={() => setSelectedService(null)}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '70vh',
              backgroundColor: 'rgba(13,65,87,0.4)', // #0d4157 at 40% opacity
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              p: 2,
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={handleCloseOverlay}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                transform: 'translate(-200%, 300%)',
                color: 'white',
              }}
            >
              <CloseIcon />
            </IconButton>
            <Fade in={true} timeout={500} key={selectedService.title}>
              <Box sx={{ maxWidth: { xs: '90%', md: '60%' } }}>
                <Typography variant="h4" sx={{ mb: 2, color: 'white' }}>
                  {selectedService.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'white' }}>
                  {selectedService.description}
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  to="/signup"
                  onClick={() => setSelectedService(null)}
                  sx={{ backgroundColor: '#2C3E50', color: 'white' }}
                >
                  Get Started
                </Button>
              </Box>
            </Fade>
          </Box>
        )}
      </Box>
      {/* End of Hero Section */}
  
      {/* Services Section (30% of viewport height) */}
      <Box
        sx={{
          height: '30vh',
          backgroundColor: '#fff',
          overflowY: 'auto',
          maxWidth: 1440,
          mx: 'auto',
          py: 2,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          {services.map((service, index) => (
            <ButtonBase
              key={index}
              onClick={() => handleCardClick(service)}
              sx={{
                width: 140,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Card
                sx={{
                  boxShadow: 0,
                  borderRadius: 2,
                  width: '100%',
                  transition: 'box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={service.image}
                  alt={service.title}
                  sx={{
                    width: '100%',
                    height: 45,
                    objectFit: 'contain',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />
                <CardContent sx={{ py: 1, px: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: '600',
                      color: '#2C3E50',
                      fontSize: '0.9rem',
                      textAlign: 'center',
                    }}
                  >
                    {service.title}
                  </Typography>
                </CardContent>
              </Card>
            </ButtonBase>
          ))}
        </Box>
      </Box>
      {/* End of Services Section */}
    </Box>
  );
};

export default Landing;
