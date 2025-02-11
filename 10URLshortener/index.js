const express = require("express")
const urlRouter = require("./routes/url")
const {connectToMongoDb} = require("./connection")

const app = express()
const PORT = 8000

connectToMongoDb("mongodb://127.0.0.1:27017/node-js-short-url")
    .then(() => console.log("Connected to mongo DB successfully"))

app.use(express.json())

app.use("/url", urlRouter)

app.listen(PORT, () => console.log(`Server started successfully at port ${PORT}`))