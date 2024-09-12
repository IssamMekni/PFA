// src/routes/auth.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleAuth } = require('../controllers/authController');

// تسجيل مستخدم جديد
router.post('/register', registerUser);

// تسجيل الدخول
router.post('/login', loginUser);

// تسجيل الدخول باستخدام جوجل
router.post('/google', googleAuth);

module.exports = router;
