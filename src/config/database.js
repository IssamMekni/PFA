// config/database.js

const { Sequelize } = require('sequelize');

// إعدادات الاتصال بقاعدة البيانات
const sequelize = new Sequelize('pfaDB', 'fileuser', 'fileuserpassword', {
  host: 'localhost',
  dialect: 'postgres', // استخدام PostgreSQL كقاعدة بيانات
  logging: false, // تعطيل السجلات في وحدة التحكم
});

// التحقق من الاتصال
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
