const { Sequelize } = require('sequelize');

// استخدام متغير البيئة لقاعدة البيانات
const databaseUrl = process.env.DATABASE_URL || 'postgres://fileuser:fileuserpassword@localhost:5432/pfaDB';

// إعدادات الاتصال بقاعدة البيانات باستخدام URL
const sequelize = new Sequelize(databaseUrl, {
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
