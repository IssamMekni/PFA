import React from 'react';
import { Grid, Box, Typography, Container } from '@mui/material';

const features = [
  {
    title: 'Easy Access',
    description: 'Your test results are available 24/7, anytime, anywhere.',
    image: 'https://via.placeholder.com/500x300?text=Easy+Access',
  },
  {
    title: 'Accuracy & Security',
    description: 'We prioritize accuracy and the security of your medical data.',
    image: 'https://via.placeholder.com/500x300?text=Accuracy+%26+Security',
  },
  {
    title: 'Comprehensive Reports',
    description: 'Access all your medical reports in one place with detailed insights.',
    image: 'https://via.placeholder.com/500x300?text=Comprehensive+Reports',
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
                  style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
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
