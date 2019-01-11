const cloudinary = require('cloudinary');
const SHA1 = require('crypto-js/sha1');
const mongoose = require('mongoose');
const async = require('async');

const User = require('../models/user');
const Product = require('../models/product');
const Payment = require('../models/payment');

exports.register = async (req, res, next) => {
  const user = new User(req.body);
  try {
    const result = await user.save();
    res.status(200).json({ sucess: true, userdata: result })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ 'email': req.body.email });
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
  } catch (err) {
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
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.uploadImage = async (req, res, next) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.files.file.path, { public_id: `waves/${Date.now()}` });
    res.status(200).send({
      public_id: result.public_id,
      url: result.url
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removeImage = async (req, res, next) => {
  const image_id = req.query.public_id;

  try {
    await cloudinary.uploader.destroy(image_id);
    res.status(200).send('ok');
  } catch (err) {
    //res.json({succes:false, error});
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.addToCart = (req, res, next) => {

  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;

    doc.cart.forEach((item) => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    })

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": mongoose.Types.ObjectId(req.query.productId) },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        () => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart)
        }
      )
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart)
        }
      )
    }
  })
};


exports.removeFromCart = (req, res) => {

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      "$pull":
        { "cart": { "id": mongoose.Types.ObjectId(req.query._id) } }
    },
    { new: true },
    (err, doc) => {
      let cart = doc.cart;
      let array = cart.map(item => {
        return mongoose.Types.ObjectId(item.id)
      });

      Product.
        find({ '_id': { $in: array } }).
        populate('brand').
        populate('wood').
        exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart
          })
        })
    }
  );
};

exports.successBuy = (req, res) => {
  let history = [];
  let transactionData = {}
  const date = new Date();
  const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(req.user._id).toString().substring(0, 8)}`

  // user history
  req.body.cartDetail.forEach((item) => {
    history.push({
      porder: po,
      dateOfPurchase: Date.now(),
      name: item.name,
      brand: item.brand.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID
    })
  })

  // PAYMENTS DASH
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email
  }
  transactionData.data = {
    ...req.body.paymentData,
    porder: po
  };
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        let products = [];
        doc.product.forEach(item => {
          products.push({ id: item.id, quantity: item.quantity })
        })

        async.eachSeries(products, (item, callback) => {
          Product.update(
            { _id: item.id },
            {
              $inc: {
                "sold": item.quantity
              }
            },
            { new: false },
            callback
          )
        }, (err) => {
          if (err) return res.json({ success: false, err });
          //sendEmail(user.email, user.name, null, "purchase", transactionData);
          res.status(200).json({
            success: true,
            cart: user.cart,
            cartDetail: []
          })
        })
      });
    }
  )
};