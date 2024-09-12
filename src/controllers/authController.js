const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// تحميل المتغيرات البيئية من ملف .env
dotenv.config();

// استخدام متغير البيئة للمفتاح السري لـ JWT
const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';

// تسجيل مستخدم جديد
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // التحقق من أن البريد الإلكتروني غير مستخدم مسبقاً
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'البريد الإلكتروني مستخدم مسبقاً' });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء المستخدم
    const user = await User.create({ firstName, lastName, email, password: hashedPassword });
    
    // إنشاء رمز JWT
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    // إزالة كلمة المرور من كائن المستخدم قبل إرجاعه
    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.status(201).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error('خطأ في تسجيل المستخدم:', error);
    
    // التحقق من نوع الخطأ
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'البريد الإلكتروني مستخدم مسبقاً' });
    } else {
      res.status(500).json({ message: 'خطأ في تسجيل المستخدم' });
    }
  }
};

// تسجيل الدخول
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // البحث عن المستخدم بواسطة البريد الإلكتروني
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    // مقارنة كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    // إنشاء رمز JWT
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    // إزالة كلمة المرور من كائن المستخدم قبل إرجاعه
    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    res.status(500).json({ message: 'خطأ في تسجيل الدخول' });
  }
};

// تسجيل الدخول باستخدام جوجل
exports.googleAuth = async (req, res) => {
  // التعامل مع تسجيل الدخول بواسطة جوجل
  // يجب عليك استخدام مكتبة مثل passport.js مع استراتيجية Google OAuth
  res.json({ message: 'تسجيل الدخول باستخدام جوجل قيد التنفيذ' });
};
