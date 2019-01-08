const User = require('../models/user');

module.exports = (req, res, next) => {
  const token = req.cookies.w_auth;
  if(!token) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    req.token = token;
    req.user = user;
    next();
  })
}