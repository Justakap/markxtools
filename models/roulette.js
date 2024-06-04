const mongoose = require('mongoose');

const rouletteSchema = new mongoose.Schema({

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
const roulette = mongoose.model('roulette', rouletteSchema);

module.exports = roulette;
