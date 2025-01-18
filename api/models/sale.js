const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    car_data: { type: mongoose.Schema.Types.ObjectId, ref: 'cars', required: true },
    client_data: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', required: true },
    date: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true }      
});

module.exports = mongoose.model('Sale', saleSchema);
