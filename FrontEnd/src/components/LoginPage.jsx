import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const result = await login(formData);
      setSuccess(result.message);
      localStorage.setItem('token', result.token);
      // بعد تسجيل الدخول الناجح، يمكنك تحويل المستخدم إلى الصفحة الرئيسية أو أي صفحة أخرى
      navigate('/d');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#f5f7fa',
        px: 2,
        pt: 8
      }}
    >
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 400 }}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          Login
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link to="/signup" underline="hover">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
