const { OrderModel } = require("../models/orders.model");
const express = require('express');
const orderRouter = express.Router();

// Route for placing a new order
orderRouter.post('/add', async (req, res) => {
    try {
        const userId = req.body.userId;
        const { name, price, size, gender, color, brand, rating, image, email, quantity } = req.body;

        // Check if all required fields are provided
        if (!name || !price || !size || !gender || !color || !brand || !rating || !image || !email || !quantity) {
            return res.status(400).send({ "msg": "Please fill in all the details" });
        } else {
            // Create a new order and save it to the database
            let newOrder = new OrderModel({ name, price, size, gender, color, brand, rating, image, email, quantity });
            await newOrder.save();
            return res.status(201).send({ "msg": "Order placed successfully" });
        }
    } catch (error) {
        // Handle server error
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for retrieving orders associated with an email
orderRouter.get("/get", async (req, res) => {
    try {
        const email = req.body.email;

        // Find orders by email
        const orders = await OrderModel.find({ email: email });
        res.status(200).send(orders);
    } catch (error) {
        // Handle server error
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for cancelling an order by ID
orderRouter.delete("/cancel/:id", async (req, res) => {
    const id = req.params.id;
    const email = req.body.email;

    try {
        // Find and delete an order by its ID and associated email
        const deletedOrder = await OrderModel.findOneAndDelete({ _id: id, email: email });

        if (deletedOrder) {
            return res.status(204).send({ "msg": "Order cancelled!" });
        } else {
            return res.status(404).send({ "msg": "No such order" });
        }
    } catch (error) {
        console.error(error);
        // Handle server error
        return res.status(500).send({ "msg": "Internal server error" });
    }
});

module.exports = { orderRouter };
