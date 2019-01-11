const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  user: {
    type: Array,
    default: []
  },
  data: {
    type: Array,
    default: []
  },
  product: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('Payment', paymentSchema);
