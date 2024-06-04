const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const loan = mongoose.model('loan', loanSchema);

module.exports = loan;
