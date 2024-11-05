require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const paymentRoute = require("./routes/payment-routes")

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use("/payment",paymentRoute)

app.listen(8000,()=>"Server is running on port 8000")