const { Sequelize } = require('sequelize');
// using the envirement variables
require('dotenv').config();
const databaseUrl = process.env.DATABASE_URL;

// connectiong databse
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres', // using postgres as database
  logging: false, 
});

// checking connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
