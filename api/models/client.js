const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },             
  phone: { type: String, required: true },            
  email: { type: String, required: true, unique: true }, 
    street: { type: String, required: true },        
    city: { type: String, required: true },          
    postal_code: { type: String, required: true }    
});

module.exports = mongoose.model('Client', clientSchema);
