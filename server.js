const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/database'); // الاتصال بقاعدة البيانات
const authRoutes = require('./src/routes/auth');
const labResultsRoutes = require('./src/routes/labResults');

const app = express();
const PORT = process.env.PORT || 3000;


// إعداد الميدل وير
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// إعداد المسارات (Routes)
app.use('/api/auth', authRoutes);
app.use('/api/lab-results', labResultsRoutes);

// صفحة افتراضية لاختبار السيرفر
app.get('/', (req, res) => {
  res.send('Welcome to LabConnect API');
});

// بدء تشغيل الخادم
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // مزامنة الجداول
    console.log('Database & tables synced!');
    console.log(`Server is running on port ${PORT}`);


  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
