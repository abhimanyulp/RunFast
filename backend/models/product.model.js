const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {type: String, required:true}
},{
    versionKey: false
})

const productModel = mongoose.model("product", productSchema)

module.exports = { productModel }