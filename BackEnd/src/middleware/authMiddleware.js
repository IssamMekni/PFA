const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Get the secret key from environment variables
const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decodedToken = jwt.verify(token, jwtSecret); // Use the secret key to verify the JWT
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
