const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { productRouter } = require("./routes/product.routes")
const { cartRouter } = require("./routes/cart.routes")

const app = express()
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.status(200).send({ "msg": "Welcome to RunFast" })
})

app.use("/user", userRouter)
app.use("/product", productRouter)
app.use("/cart", cartRouter)

const Port = process.env.Port || 8080
app.listen(Port, async () => {
    try {
        await connection
        console.log(`Connected to MongoDB @ Port ${Port}`)
    } catch (error) {
        console.log(error)
    }
})