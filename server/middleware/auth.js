const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.cookies.w_auth;
  if(!token) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    const user = await User.findOne({_id: decodedToken, token});
    if(!user) return res.json({ isAuth: false });
    req.token = decodedToken;
    req.user = user;
    next();
  } catch(err) {
    next(err);
  }
};