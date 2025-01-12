//zmienne środowiskowe
require('dotenv').config()

// importuję expresa
const express = require("express")

// tworzę instancję expresa
const app = express()

//połączenie z bazą danych
const mongoose = require("mongoose")
//mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@shop.ylpdx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
//mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@shop.ylpdx.mongodb.net/?retryWrites=true&w=majority&appName=shop`)
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@shop.ylpdx.mongodb.net/shop?retryWrites=true&w=majority&appName=shop`)

//logger
const morgan = require("morgan")
app.use(morgan("dev"))

//parsowanie body
const bodyParser = require("body-parser")
app.use(bodyParser.json()) //od tej pory w req.body mam informacje z części body

// importuję routy
const productRoutes = require("./api/router/products")
const userRoutes = require("./api/router/users")

//stosuję routy
app.use("/products", productRoutes)
app.use("/users", userRoutes)

//błąd routu
app.use((req, res, next) => {
    res.status(404).json({wiadomość: "Not Found"})
})

module.exports = app