const express = require("express")
const {logReqResp} = require("./middlewares/log")
const userRouter = require("./routes/user")
const {connectToMongoDb} = require("./connection")


const app = express()
const PORT = 8000

// connection to mongo db
connectToMongoDb("mongodb://127.0.0.1:27017/node-js-users-project")
    .then(() => console.log("Connected to Mongo DB successfully"))

// middleware plugin
app.use(express.urlencoded({exteneded : false}))

// logging
app.use(logReqResp("log.txt"))

// routes
app.use("/api/users", userRouter)

app.listen(PORT, () => console.log(`Server started successfully at port : ${PORT}`))