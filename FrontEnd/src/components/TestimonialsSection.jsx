import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

const testimonials = [
  {
    name: 'John Doe',
    content: 'The service was fast and efficient, and I was able to access my results in no time.',
    image: 'https://via.placeholder.com/150x150?text=John+Doe',
  },
  {
    name: 'Jane Smith',
    content: 'Very professional lab with reliable reports. Highly recommend!',
    image: 'https://via.placeholder.com/150x150?text=Jane+Smith',
  },
];

const TestimonialsSection = ({ id }) => {
  return (
    <Box
      id={id}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#ffffff',
      }}
    >
      <Container>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          What Our Clients Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ textAlign: 'center', p: 3, bgcolor: '#f4f4f4', borderRadius: 2, boxShadow: 2 }}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{ borderRadius: '50%', marginBottom: '16px' }}
                />
                <Typography variant="h6" color="secondary" gutterBottom>
                  {testimonial.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {testimonial.content}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
