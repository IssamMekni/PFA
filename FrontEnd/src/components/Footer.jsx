import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 3 }}>
      <Container>
        <Typography variant="body1" align="center">
          © 2024 Medical Lab Results - All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
