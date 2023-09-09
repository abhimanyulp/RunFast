const express = require("express")
require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()
const { userModel } = require("../models/user.model")


userRouter.post("/login", async (req, res) => {

    const { email, password, userID } = req.body

    try {
        const user = await userModel.findOne({ email })

        if (user) {

            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, process.env.PrivateKey, { expiresIn: '3h' });
                    res.status(200).send({ "msg": "Signin Success!", token, userID})
                } else {
                    res.status(400).send({ "msg": "Incorrect Password" })
                }
            });


        } else {
            res.status(400).send({ "msg": "No user found with given email" })
        }

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }

})

userRouter.post("/register", async (req, res) => {

    const { email, password, name } = req.body

    try {
        const user = await userModel.findOne({ email })

        if (user) {
            res.status(400).send({ "msg": "User already exist!" })
        } else {
            bcrypt.hash(password, 3).then(async (hash) => {
                const user = new userModel({ email, password: hash, name })
                await user.save()
                res.status(200).send({ "msg": "Registeration completed!" })
            });
        }

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }

})

module.exports = { userRouter }