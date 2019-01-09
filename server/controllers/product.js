const mongoose = require('mongoose');
const Brand = require('../models/brand');
const Wood = require('../models/wood');
const Product = require('../models/product');

exports.addBrand = async (req, res, next) => {
  const brand = new Brand(req.body);
  try {
    const newBrand = await brand.save();
    res.status(200).json({ success: true, brand: newBrand });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find();
    res.status(200).send(brands);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addWood = async (req, res, next) => {
  const wood = new Wood(req.body);
  try {
    const newWood = await wood.save();
    res.status(200).json({ success: true, wood: newWood });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getWoods = async (req, res, next) => {
  try {
    const woods = await Wood.find();
    res.status(200).send(woods);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addArticle = async (req, res, next) => {
  const product = new Product(req.body);
  try {
    const article = await product.save();
    res.status(200).json({ success: true, article })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getArticlesByAttr = async (req, res, next) => {

  const order = req.query.order ? req.query.order : 'asc';
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;

  try {
    const articles = await Product.find().populate('brand').populate('wood').sort([[sortBy, order]]).limit(limit);
    res.status(200).send(articles);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getArticlesByIds = async (req, res, next) => {
  const ids = req.query.id.split(',');
  try {
    const items = ids.map(id => mongoose.Types.ObjectId(id));
    const products = await Product.find({ '_id': { $in: items } }).populate('brand').populate('wood');
    res.status(200).send(products);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getArticles = async (req, res, next) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }

  findArgs['publish'] = true;

  try {
    const articles = await Product.
    find(findArgs).
    populate('brand').
    populate('wood').
    sort([[sortBy, order]]).
    skip(skip).
    limit(limit);
    res.status(200).json({
      size: articles.length,
      articles
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}


