// index.js أو config/associations.js

const sequelize = require('./config/database');
const User = require('./models/user');
const LabResult = require('./models/labResult');
const Lab = require('./models/lab');

// علاقة المستخدمين مع النتائج المخبرية (كل مستخدم يمكن أن يكون لديه عدة نتائج مخبرية)
User.hasMany(LabResult, { foreignKey: 'userId' });
LabResult.belongsTo(User, { foreignKey: 'userId' });

// علاقة المعامل مع النتائج المخبرية (كل معمل يمكن أن يكون لديه عدة نتائج مخبرية)
Lab.hasMany(LabResult, { foreignKey: 'labId' });
LabResult.belongsTo(Lab, { foreignKey: 'labId' });

// مزامنة النماذج مع قاعدة البيانات
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
