const mongoose = require('mongoose');

const chipsSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  chipsAmount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const chips = mongoose.model('chips', chipsSchema);

module.exports = chips;
