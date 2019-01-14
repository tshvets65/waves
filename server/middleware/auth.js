const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.cookies.w_auth;
  if(!token) {
    return res.json({ isAuth: false });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken) {
      return res.json({ isAuth: false });
    }
    const user = await User.findOne({_id: decodedToken, token});
    if(!user) return res.json({ isAuth: false });
    req.token = decodedToken;
    req.user = user;
    next();
  } catch(err) {
    return res.json({ isAuth: false });
  }
};