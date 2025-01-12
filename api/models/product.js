const mongoose = require("mongoose")

//schemat produktu
const productSchema = mongoose.Schema({
    //_id nie trzeba wpisywać
    _id: mongoose.Types.ObjectId,
    name: String,
    price: Number
})

module.exports = mongoose.model("Product", productSchema)