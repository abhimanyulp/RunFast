const { userModel } = require("../models/user.model");
// const { CartModel } = require("../models/cart.model");
const express = require('express');
const cartRouter = express.Router();

cartRouter.post('/', async (req, res) => {
    try {
        const userId = req.body.userID;
        const productId = req.body.productId;

        const user = await userModel.findByIdAndUpdate(
            userId,
            { $push: { mycart: productId } },
            { new: true }
        ).exec();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


cartRouter.get("/", async (req, res) => {
    try {
        const userId = req.body.userID;

        const user = await userModel.findById(userId).populate('mycart').exec();
        res.status(200).json(user.mycart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = { cartRouter };



