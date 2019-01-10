const cloudinary = require('cloudinary');

const User = require('../models/user');

exports.register = async (req, res, next) => {
  const user = new User(req.body);
  try {
    const result = await user.save();
    res.status(200).json({sucess: true, userdata: result})
  } catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({'email': req.body.email});
    if (!user) {
      const error = new Error('Auth failed, email not found');
      error.statusCode = 401;
      throw error;
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const updatedUser = await user.generateToken();
    res.cookie('w_auth', updatedUser.token).status(200).json({ loginSuccess: true });
  } catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.auth = (req, res, next) => {
  res.status(200).json({
      isAdmin: req.user.role === 1,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      cart: req.user.cart,
      history: req.user.history
  })
};

exports.logout = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { token: '' });
    if (!user) {
      const error = new Error('Logout failed, user not found');
      error.statusCode = 401;
      throw error;
    }
    res.clearCookie('w-auth');
    res.status(200).json({ success: true });
  } catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



exports.uploadImage = async (req, res, next)=>{
  try {
    const result = await cloudinary.v2.uploader.upload(req.files.file.path, {public_id: `waves/${Date.now()}`});
    res.status(200).send({
      public_id: result.public_id,
      url: result.url
    });
  } catch(err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removeImage = async (req, res, next)=>{
  const image_id = req.query.public_id;

  try {
    await cloudinary.uploader.destroy(image_id);
    res.status(200).send('ok');
  } catch(err) {
    //res.json({succes:false, error});
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}