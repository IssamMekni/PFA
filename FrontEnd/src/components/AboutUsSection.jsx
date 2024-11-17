import React from 'react';
import { Grid, Box, Typography, Container } from '@mui/material';
import imgdoctor from "../img/doctor.jpg";

const AboutUsSection = ({ id }) => {
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src= {imgdoctor}
              alt="About Us"
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" color="primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              At Medical Lab, we provide cutting-edge diagnostic services. With a commitment to accuracy and patient safety, our team delivers fast, secure, and reliable test results. Our lab is equipped with state-of-the-art technology to serve you better.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              We believe in empowering patients and doctors through easy access to lab results. Your health data is protected by the highest security standards, ensuring privacy and confidentiality.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUsSection;
