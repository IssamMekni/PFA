// models/lab.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // افترض أن لديك ملف إعداد اتصال قاعدة البيانات

const Lab = sequelize.define('Lab', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Lab;
