const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from Authorization header
  
  if (!token) {
    return res.status(401).json({ error: 'Please authenticate' });
  }

  try {
    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    // Attach userId to the request object for further use
    req.user = user;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authenticateUser;
