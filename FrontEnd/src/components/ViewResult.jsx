import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios

const ViewResult = () => {
  const { id } = useParams(); // Retrieve the 'id' from the URL
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(true); // Start with loading state as true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(`${location.origin}/api/lab-results/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach token
          },
          responseType: 'blob', // To handle binary data
        });

        const url = URL.createObjectURL(response.data); // Convert blob to URL
        setPdfUrl(url);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching result PDF:', err);
        setError('Failed to fetch the PDF. Please try again later.');
        setLoading(false);
      }
    };

    fetchResult();

    // Cleanup: Revoke the created object URL to prevent memory leaks
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [id]);

  return (
    <Box
      sx={{
        paddingTop: '15vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <iframe
          src={pdfUrl}
          title="Lab Result PDF"
          type="application/pdf"
          width="80%"
          height="90%"
        />
      )}
    </Box>
  );
};

export default ViewResult;
