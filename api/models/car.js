const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  mark: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  price: { type: Number, required: true } 
});

module.exports = mongoose.model('Car', carSchema);
