const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    gender: { type: String, required: true },
    color: { type: String, enum: ['Black', 'White', 'Red', 'Cream', 'Light Brown', 'Pink'], required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true },
    quantity: { type: Number, required: true }
}, {
    versionKey: false
})

const OrderModel = mongoose.model("order", orderSchema)

module.exports = { OrderModel }