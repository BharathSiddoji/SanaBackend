const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  const decodedToken = token.split(' ')[1];
  
  if (decodedToken === undefined || !token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(decodedToken, process.env.SECRET_TOKEN);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send('Access denied. You do not have permission to perform this action.');
    }
    next();
  };
};

module.exports = { authenticate, authorize };