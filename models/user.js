const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Ensure name is required
  },
  email: {
    type: String,
    required: true, // Ensure email is required
    unique: true // Ensure email is unique
  },
  contact: {
    type: String,
    required: true // Ensure contact is required
  },
  password: {
    type: Number,
    required: true
  },
  image: {
    type: String,

  },
  balance: {
    default: 0,
    type: Number
  },
  chipsBalance: {
    default: 0,
    type: Number
  },
  LoanAmount: {
    default: 0,
    type: Number
  }

});

const User = mongoose.model('User', userSchema);

module.exports = User;
