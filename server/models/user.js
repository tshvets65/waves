const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const moment = require('moment');
const SALT_I = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  resetToken: {
    type: String
  },
  resetTokenExp: {
    type: Number
  },
  confirmed: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_I);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

userSchema.methods.generateToken = async function () {
  const token = jwt.sign(this._id.toHexString(), process.env.SECRET);
  this.token = token;
  const updatedUser = await this.save();
  return updatedUser;
}

userSchema.methods.generateResetToken = async function () {
  const buffer = crypto.randomBytes(20);
  const token = buffer.toString('hex');
  // const today = moment().startOf('day').valueOf();
  const tomorrow = moment().endOf('day').valueOf();
  this.resetToken = token;
  this.resetTokenExp = tomorrow;
  const updatedUser = await this.save();
  return updatedUser;
}

module.exports = mongoose.model('User', userSchema);