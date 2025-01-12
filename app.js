require('dotenv').config()

const express = require("express")

const app = express()

const mongoose = require("mongoose")
//mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@shop.ylpdx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
//mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@shop.ylpdx.mongodb.net/?retryWrites=true&w=majority&appName=shop`)
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@shop.ylpdx.mongodb.net/shop?retryWrites=true&w=majority&appName=shop`)

const morgan = require("morgan")
app.use(morgan("dev"))

const bodyParser = require("body-parser")
app.use(bodyParser.json()) 

const userRoutes = require("./api/router/users")
const clientRoutes = require("./api/router/clients")
const carRoutes = require("./api/router/cars")
const saleRoutes = require("./api/router/sales")
const salesInfoRoutes =  require("./api/router/salesInfo")

app.use("/users", userRoutes)
app.use("/clients", clientRoutes)
app.use("/cars", carRoutes)
app.use("/sales", saleRoutes)
app.use("/salesInfo", salesInfoRoutes)


app.use((req, res, next) => {
    res.status(404).json({wiadomość: "Not Found"})
})

module.exports = app