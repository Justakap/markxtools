const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const deposit = mongoose.model('deposit', depositSchema);

module.exports = deposit;
