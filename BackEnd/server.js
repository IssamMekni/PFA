const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/associations'); // connecting to database
const path = require('path');
// get routes
const mainRoute = require('./src/routes/index');


// using the envirement variables
//require('dotenv').config();


const port = process.env.PORT; // ask a question here : why it works without "require('dotev').config()"


// configure middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(mainRoute);

// Serve static files from the 'dist' directory
app.use(express.static(path.resolve(__dirname,"../", 'FrontEnd', 'dist')));

// test a route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,"../", 'FrontEnd', 'dist', 'index.html'));
});




// starting the server
app.listen(port, async () => {
  try {
    console.log(`Server is running on port ${port}`);
    await sequelize.authenticate(); 
    await sequelize.sync(); //synchronize the tables
    


  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
