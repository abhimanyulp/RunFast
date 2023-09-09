const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    id: { type: Number, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    gender: { type: String, required: true },
    color: { type: String, enum: ['Black', 'White', 'Red', 'Cream', 'Light Brown', 'Pink'], required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
}, {
    versionKey: false
})

const productModel = mongoose.model("product", productSchema)

module.exports = { productModel }