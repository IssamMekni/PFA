// src/routes/auth.js
const path = require('path');

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleAuth } = require('../controllers/authController');

// register new user
router.post('/register', registerUser);




// login user
router.post('/login', loginUser);


// authenticate with google
router.post('/google', googleAuth);

module.exports = router;
