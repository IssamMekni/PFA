import React from 'react';
import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import AboutUsSection from './AboutUsSection';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';

const HomePage = () => {
  return (
    <Box sx={{ bgcolor: '#f9f9f9', minHeight: '100vh', pt: 8 }}>
      <HeroSection id="hero-section" />
      <FeaturesSection id="features-section" />
      <AboutUsSection id="about-us-section" />
      <TestimonialsSection id="testimonials-section" />
      <ContactSection id="contact-section" />
    </Box>
  );
};

export default HomePage;
