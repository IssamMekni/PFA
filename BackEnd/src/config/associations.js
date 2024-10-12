//config/associations.js

const sequelize = require('./database');
const User = require('../models/user');
const LabResult = require('../models/labResult');
const Lab = require('../models/lab');

// user has many results
User.hasMany(LabResult, { foreignKey: 'userId' });
LabResult.belongsTo(User, { foreignKey: 'userId' });

// lab has many results
Lab.hasMany(LabResult, { foreignKey: 'labId' });
LabResult.belongsTo(Lab, { foreignKey: 'labId' });

// synchronize with database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables synchronized!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

  module.exports=sequelize;
