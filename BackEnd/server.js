const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/associations'); // connecting to database
const path = require('path');
// get routes
const authRoutes = require('./src/routes/auth');
const labResultsRoutes = require('./src/routes/labResults');

// using the envirement variables
//require('dotenv').config();

const app = express();
const port = process.env.PORT; // ask a question here : why it works without "require('dotev').config()"


// configure middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure routes 
app.use('/api/auth', authRoutes); 
app.use('/api/lab-results', labResultsRoutes);



// Serve static files from the 'dist' directory
app.use(express.static(path.resolve(__dirname,"../", 'FrontEnd', 'dist')));

// test a route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,"../", 'FrontEnd', 'dist', 'index.html'));
});




// بدء تشغيل الخادم
app.listen(port, async () => {
  try {
    console.log(`Server is running on port ${port}`);
    await sequelize.authenticate(); 
    await sequelize.sync(); //synchronize the tables
    


  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
