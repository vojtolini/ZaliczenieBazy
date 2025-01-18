const mongoose = require('mongoose');
const insurenceSchema = new mongoose.Schema({
    car_data: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    client_data: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true }
})

insurenceSchema.virtual('year_fee').get(function () {
    if (this.car_data && this.car_data.price) {
        return this.car_data.price * 0.01;
    }
    return null;
});

insurenceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Insurence', insurenceSchema);
