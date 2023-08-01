const express = require("express")
require("dotenv").config()
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

const productRouter = express.Router()
const { productModel } = require("../models/product.model")


productRouter.post("/add", async (req, res) => {

    const {  } = req.body

    try {
        res.status(200).send({ "msg": "",})

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }

})

productRouter.get("/get", async (req, res) => {

    try {
        const data = await productModel.find()
        res.status(200).send({ "msg": "Data retrieved!", data })

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }

})

module.exports = { productRouter }