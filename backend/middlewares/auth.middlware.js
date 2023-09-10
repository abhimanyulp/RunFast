const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");


const auth = async (req, res, next) => {
    const token = req.headers.authorization

    let blacklistedUser = await BlacklistModel.findOne({ token: token })
    if (blacklistedUser) {
        return res.status(401).send({ "msg": "Token is expired" })
    } else {
        if (token) {
            const decoded = jwt.verify(token, process.env.PrivateKey)
            if (decoded) {
                // console.log("auth working!")
                req.body.userID = decoded.userID
                next();

            } else {
                res.status(400).send({ "msg": "Please login first" })
            }
        } else {
            res.status(400).send({ "msg": "Please login first" })
        }
    }
}

module.exports = { auth };