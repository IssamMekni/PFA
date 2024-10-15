const express = require("express");
const router = express.Router();

const admin = require("./admin");
const auth =require("./auth");
const labresults = require("./labResults");


// configure routes 
router.use('/api/auth', auth); 
router.use('/api/lab-results',labresults);
router.use("/api/admin",admin);

module.exports = router;


