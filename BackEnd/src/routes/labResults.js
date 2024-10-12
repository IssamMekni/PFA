// src/routes/labResults.js
const express = require('express');
const router = express.Router();
const { getUserLabResults, viewLabResult, downloadLabResult } = require('../controllers/labResultsController');
const authMiddleware = require('../middleware/authMiddleware');

// get user labresults
router.get('/', authMiddleware, getUserLabResults);

// show PDF (could be simplified)
router.get('/:id', authMiddleware, viewLabResult);

// download labresult (PDF)
router.get('/:id/download', authMiddleware, downloadLabResult);

module.exports = router;
