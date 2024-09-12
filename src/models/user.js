
//const SequelizeLibrary = require('sequelize');
//const Sequelize = SequelizeLibrary.Sequelize;

// models/user.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // افترض أن لديك ملف إعداد اتصال قاعدة البيانات

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false, // اجعل الحقل مطلوبًا
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false, // اجعل الحقل مطلوبًا
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;    


