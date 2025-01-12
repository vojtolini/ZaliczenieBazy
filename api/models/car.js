const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  mark: { type: String, required: true },  // Marka samochodu (wymagana)
  model: { type: String, required: true }, // Model samochodu (wymagana)
  year: { type: String, required: true },  // Rok produkcji samochodu (wymagany)
  price: { type: Number, required: true }  // Cena samochodu (wymagana)
});

module.exports = mongoose.model('Car', carSchema);
