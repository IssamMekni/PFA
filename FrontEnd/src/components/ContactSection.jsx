import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

const ContactSection = ({ id }) => {
  return (
    <Box
      id={id}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f9f9f9',
      }}
    >
      <Container>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Get in Touch
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="secondary" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              <strong>Email:</strong> contact@medicallab.com
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              <strong>Phone:</strong> +123 456 7890
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              <strong>Address:</strong> 123 Medical St, Health City, Country
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              We are available Monday to Friday, 9 AM - 6 PM. Reach out to us with any inquiries or questions, and we’ll be happy to assist you.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="secondary" gutterBottom>
              Find Us
            </Typography>
            <img
              src="https://via.placeholder.com/600x400?text=Map+Location"
              alt="Map Location"
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;
