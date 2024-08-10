// models/labResult.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // افترض أن لديك ملف إعداد اتصال قاعدة البيانات
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
    allowNull: false, // اجعل الحقل مطلوبًا لتحديد نوع الاختبار
  },
  filepath: {
    type: DataTypes.STRING,
    allowNull: false, // يمكنك جعله مطلوبًا إذا كان كل نتيجة يجب أن تحتوي على ملف
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
