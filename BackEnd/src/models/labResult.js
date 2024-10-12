// models/labResult.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lab = require('./lab');
const User = require('./user');

const LabResult = sequelize.define('LabResult', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  result: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  testType: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  filepath: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  labId: {
    type: DataTypes.INTEGER,
    references: {
      model: Lab,
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = LabResult;
