import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewResult = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // جلب ملف الـ PDF للتحليل
  //   const fetchResult = async () => {
  //     try {
  //       const response = await axios.get(`/api/lab-results/${id}`);
  //       setPdfUrl(response.data);
        // setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching result PDF:', error);
  //     }
  //   };

  //   fetchResult();
  // }, [id]);

  return (
    <Box sx={{ paddingTop:"15vh", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading ? (
        <CircularProgress />
      ) : (
      <iframe src="https://files.fm/u/pnetzw2r2r" title="Lab Result PDF" type="application/pdf" width="80%" height="90%" />
      )}
    </Box>
  );
};

export default ViewResult;
