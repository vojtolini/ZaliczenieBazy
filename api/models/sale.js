const mongoose = require('mongoose');

// Zmiana typu car_id i client_id na ObjectId, żeby móc używać populate
const saleSchema = new mongoose.Schema({
    car_data: { type: mongoose.Schema.Types.ObjectId, ref: 'cars', required: true },   // Referencja do kolekcji Car
    client_data: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', required: true }, // Referencja do kolekcji Client (lub Customer)
    date: { type: String, required: true },        // Data sprzedaży
    price: { type: Number, required: true },      // Cena sprzedaży
    status: { type: String, required: true }      // Status sprzedaży (np. "completed", "pending")
});

module.exports = mongoose.model('Sale', saleSchema);
