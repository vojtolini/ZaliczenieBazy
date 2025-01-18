const mongoose = require('mongoose');
const insurenceSchema = new mongoose.Schema({
    car_id: { type: mongoose.Schema.Types.ObjectId, ref: 'cars', required: true },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'clients', required: true }
})

insurenceSchema.virtual('year_fee').get(function () {
    if (this.car_id && this.car_id.price) {
        return this.car_id.price * 0.01;
    }
    return null;
});

insurenceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Insurence', insurenceSchema);
