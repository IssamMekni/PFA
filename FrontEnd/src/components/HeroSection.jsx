import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import img1 from "../img/landing1.jpeg";
import img2 from "../img/images (5).jpeg";
import img3 from "../img/images (6).jpeg";
import img4 from "../img/images (7).jpeg";
import img5 from "../img/landing1.jpeg";
const sliderImages = [
  img1,
];

const HeroSection = ({ id }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto slide every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(slideInterval); // Cleanup interval
  }, [currentSlide]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === sliderImages.length - 1 ? 0 : prevSlide + 1
      );
      setIsAnimating(false);
    }, 500); // Match the transition duration
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? sliderImages.length - 1 : prevSlide - 1
      );
      setIsAnimating(false);
    }, 4500); // Match the transition duration
  };

  return (
    <Box
      id={id}
      sx={{
        bgcolor: '#3f50b5',
        color: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            transform: `translateX(${-currentSlide * 100}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {sliderImages.map((image, index) => (
            <Box
              key={index}
              component="img"
              src={image}
              alt={`Slide ${index + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                flexShrink: 0,
              }}
            />
          ))}
        </Box>
      </Box>

      <Typography variant="h3" gutterBottom sx={{ zIndex: 1 }}>
        Welcome to Medical Lab
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ zIndex: 1 }}>
        Fast, secure, and easy access to your medical test results.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        href="#about-us-section"
        sx={{ zIndex: 1 }}
      >
        Learn More
      </Button>

      {/* Slider Controls */}
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
          color: 'white',
          zIndex: 1,
        }}
        onClick={handlePrevious}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        sx={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          color: 'white',
          zIndex: 1,
        }}
        onClick={handleNext}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default HeroSection;
