const { userModel } = require("../models/user.model");
const express = require('express');
const cartRouter = express.Router();

cartRouter.post('/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;

        const isProductInCart = await userModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(userId), mycart: { $elemMatch: { $eq: mongoose.Types.ObjectId(productId) } } } }
        ]);

        if (isProductInCart) {
            return res.send({ "msg": "Product already in cart" })
        } else {
            const user = await userModel.findByIdAndUpdate(
                userId,
                { $push: { mycart: { product: productId, quantity: quantity } } },
                { new: true }
            ).exec();

            res.status(200).send({ "msg": "product added to cart" });
        }
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



