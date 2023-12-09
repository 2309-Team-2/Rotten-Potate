const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/users');

const verifyAuthToken = async (token) => {
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserById(decoded.id);
    return user;
  } catch (err) {
    console.error('Token verification error:', err);
    return null;
  }
};

const authenticateToken = async (req, res, next) => {
  const auth = req.header('Authorization');
  if (!auth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = auth.slice(7);
  const user = await verifyAuthToken(token);
  if (!user) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  req.user = user;
  next();
};

module.exports =  authenticateToken ;