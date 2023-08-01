const mongoose = require("mongoose")

const connection = mongoose.connect(process.env.MongoURL)

module.exports = { connection }