const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// download variable envirement from .env
dotenv.config();

//  JWT secret key from .env
const jwtSecret = process.env.JWT_SECRET ;

// register new user
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // check if email used before
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'this email is used with another account' });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({ firstName, lastName, email, password: hashedPassword });
    
    // create JWT
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    //remove password from object
    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.status(201).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error('error in registering the new user :', error);
    
   
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: "email already exist" });
    } else {
      res.status(500).json({ message: "error in registering" });
    }
  }
};

// login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // search for user this email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'wrong email' });
    }

    // comparing the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'wrong password' });
    }

    //  create JWT
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    // إزالة كلمة المرور من كائن المستخدم قبل إرجاعه
    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error('error in login:', error);
    res.status(500).json({ message: 'error in login' });
  }
};

// athenticate with google
exports.googleAuth = async (req, res) => {

  res.json({ message: 'not done yet' });
};
