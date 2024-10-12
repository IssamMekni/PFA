import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api',{
          Headers:{
            token:localStorage.getItem("token")
        }});
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching lab results:', error);
      }
    };
    fetchResults();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
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
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.testType}</TableCell>
                <TableCell>{new Date(result.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/lab-results/${result.id}`}
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                  >
                    View
                  </Button>
                  <Button
                    component={Link}
                    to={`/lab-results/${result.id}/download`}
                    variant="outlined"
                    color="secondary"
                  >
                    Download
                  </Button>
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
