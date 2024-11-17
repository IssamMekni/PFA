import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import downloadLabResult from './downloadLabResult.js'; // Import the download function
import downloadLabResult from    './downloadResult';

const Dashboard = () => {
  const [results, setResults] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${location.origin}/api/lab-results`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.data) {
          setResults(response.data);
        }
        console.log(response.data.message);
      } catch (error) {
        console.error('Error fetching lab results:', error);
      }
    };
    fetchResults();
  }, []);

  const handleDownload = (id) => {
    downloadLabResult(id); // Trigger the download function
  };

  return (
    <Box sx={{ p: "15vh 10px", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Lab Results Dashboard
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.length && results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.testType}</TableCell>
                <TableCell>{new Date(result.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Grid container spacing={isSmallScreen ? 1 : 2}>
                    <Grid item xs={12} sm="auto">
                      <Button
                        fullWidth={isSmallScreen}
                        component={Link}
                        to={`/lab-results/${result.id}`}
                        variant="contained"
                        color="primary"
                        size={isSmallScreen ? 'small' : 'medium'}
                      >
                        View
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm="auto">
                      <Button
                        fullWidth={isSmallScreen}
                        variant="outlined"
                        color="secondary"
                        size={isSmallScreen ? 'small' : 'medium'}
                        onClick={() => handleDownload(result.id)} // Call the download function
                      >
                        Download
                      </Button>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
