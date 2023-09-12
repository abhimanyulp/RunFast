const mongoose = require('mongoose')
const express = require('express');
const cartRouter = express.Router();
const { userModel } = require("../models/user.model");

// Route for adding a product to the user's cart
cartRouter.post('/add', async (req, res) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;

        console.log(typeof (userId), typeof (productId));


        // Check if the product is already in the user's cart
        const isProductInCart = await userModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                    mycart: { $elemMatch: { product: new mongoose.Types.ObjectId(productId) } }
                }
            }
        ]);

        if (isProductInCart.length > 0) {
            return res.send({ "msg": "Product already in cart" });
        } else {
            // Add the product to the user's cart
            const user = await userModel.findByIdAndUpdate(
                userId,
                { $push: { mycart: { product: productId, quantity: quantity } } },
                { new: true }
            ).exec();

            res.status(200).send({ "msg": "Product added to cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for getting the user's cart
cartRouter.get("/get", async (req, res) => {
    try {
        const userId = req.body.userId;

        // Find the user by ID
        const user = await userModel.findById(userId).populate({
            path: 'mycart',
            populate: {
                path: 'product',
                model: 'product'
            }
        }).exec();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.mycart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json(user.mycart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Route for deleting a product from the user's cart or clearing the entire cart
cartRouter.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;
    const userId = req.body.userID;

    if (id) {
        try {
            // Remove a specific product from the user's cart
            const user = await userModel.findByIdAndUpdate(
                userId,
                { $pull: { mycart: { product: productId } } },
                { new: true }
            ).exec();

            if (user) {
                return res.status(204).send({ "msg": "Product removed from cart!" });
            } else {
                return res.status(404).send({ "msg": "No such item" });
            }
        } catch (error) {
            return res.status(500).send({ "msg": "Internal server error" });
        }
    } else {
        try {
            // Clear the entire cart
            const user = await userModel.findByIdAndUpdate(
                userId,
                { $pull: { mycart: [] } },
                { new: true }
            ).exec();
            return res.send({ "msg": "Cart is cleared" });
        } catch (error) {
            return res.status(500).send({ "msg": "Internal server error" });
        }
    }
});

module.exports = { cartRouter };
