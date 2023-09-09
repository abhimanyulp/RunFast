const express = require("express")
require("dotenv").config()

const productRouter = express.Router()
const { productModel } = require("../models/product.model")


productRouter.post("/add", async (req, res) => {

    const { name, price, size, gender, color, brand, rating, image } = req.body

    try {
        let newProduct = new productModel({ name, price, size, gender, color, brand, rating, image })
        await newProduct.save()
        return res.status(200).send({ "msg": "New product is added!" })
    } catch (error) {
        return res.status(400).send({ "msg": error.message })
    }

})

productRouter.get("/data", async (req, res) => {

    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 10;
    const sortField = req.query._sort || '_id';
    const sortOrder = req.query._order === 'desc' ? -1 : 1;
    const maxPrice = parseFloat(req.query.price);

    try {

        const filters = {};

        // Add filters based on query parameters
        if (req.query.price) {
            filters.price = { $lte: parseFloat(req.query.price) };
        }
        if (req.query.brand) {
            filters.brand = {
                $regex: req.query.brand,      // Regular expression pattern
                $options: 'i'                 // Case-insensitive option
            };
        }
        if (req.query.rating) {
            filters.rating = parseFloat(req.query.rating);
        }
        if (req.query.color) {
            filters.color = {
                $regex: req.query.color,      // Regular expression pattern
                $options: 'i'                 // Case-insensitive option
            };
        }

        const pipeline = [
            {
                $match: filters,
            },
            {
                $sort: { [sortField]: sortOrder },
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            },
        ];

        const data = await productModel.aggregate(pipeline);

        const totalItems = await productModel.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / limit);

        console.log("someone was there!", "page:", page, "limit:", limit, "sortField:", sortField, "sortOrder:", sortOrder, "maxPrice:", maxPrice, "totalItems:", totalItems)

        res.json({
            data,
            totalPages,
            totalItems,
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }

})

module.exports = { productRouter }