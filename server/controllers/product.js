const Brand = require('../models/brand');
const Wood = require('../models/wood');

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
    res.status(200).json({ success: true, brands });
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
    res.status(200).json({ success: true, woods });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
