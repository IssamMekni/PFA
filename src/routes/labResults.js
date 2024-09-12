// src/routes/labResults.js
const express = require('express');
const router = express.Router();
const { getUserLabResults, viewLabResult, downloadLabResult } = require('../controllers/labResultsController');
const authMiddleware = require('../middleware/authMiddleware');

// عرض تحاليل المستخدم بعد تسجيل الدخول
router.get('/', authMiddleware, getUserLabResults);

// عرض ملف PDF (could be simplified)
router.get('/:id', authMiddleware, viewLabResult);

// تنزيل ملف PDF
router.get('/:id/download', authMiddleware, downloadLabResult);

module.exports = router;
