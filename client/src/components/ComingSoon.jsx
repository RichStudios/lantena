import React from 'react';
import { Box, Typography } from '@mui/material';
import heroLogo from '../images/lantena_white_herosection.png';
import flagVideo from '../images/flag2.mp4';

const ComingSoon = ({ pageName }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2,
        }}
      >
        <source src={flagVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay to darken the video (40% opacity) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: -1,
        }}
      />
      
      {/* Foreground Content */}
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
          p: 2,
        }}
      >
        {/* White Circular Container for Logo */}
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '50%',
            width: { xs: '165px', md: '220px' },
            height: { xs: '165px', md: '220px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
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
        {/* Page Title */}
        <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2, color: '#fff' }}>
          {pageName || 'Coming Soon'}
        </Typography>
        {/* "Coming Soon" Subtitle */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            textTransform: 'uppercase',
            letterSpacing: 4,
            color: '#fff',
          }}
        >
          Coming Soon
        </Typography>
      </Box>
    </Box>
  );
};

export default ComingSoon;
