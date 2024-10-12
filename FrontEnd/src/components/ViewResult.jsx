import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewResult = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب ملف الـ PDF للتحليل
    const fetchResult = async () => {
      try {
        const response = await axios.get(`/api/lab-results/${id}`);
        setPdfUrl(response.data.file);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching result PDF:', error);
      }
    };

    fetchResult();
  }, [id]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <iframe src={pdfUrl} title="Lab Result PDF" width="80%" height="90%" />
      )}
    </Box>
  );
};

export default ViewResult;
