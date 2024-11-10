import React from 'react';
import { Grid, Box, Typography, Container } from '@mui/material';
import img1 from "../img/images (2).png";
import img2 from "../img/images (3).png";
import img3 from "../img/images (4).png";
const features = [
  {
    title: 'Easy Access',
    description: 'Your test results are available 24/7, anytime, anywhere.',
    image:img1,
  },
  {
    title: 'Accuracy & Security',
    description: 'We prioritize accuracy and the security of your medical data.',
    image: img2,
  },
  {
    title: 'Comprehensive Reports',
    description: 'Access all your medical reports in one place with detailed insights.',
    image: img3,
  },
];

const FeaturesSection = ({ id }) => {
  return (
    <Box
      id={id}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f4f4f4',
      }}
    >
      <Container>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Our Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{ textAlign: 'center', p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 2 }}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  style={{  borderRadius: '8px', marginBottom: '16px',height:"100%", overflow:"hidden" }}
                />
                <Typography variant="h6" color="secondary" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
