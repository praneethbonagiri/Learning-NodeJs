const http = require("http")
// const fs = require("fs")
// const url = require("url")
const express = require("express")

// old way without using express
// // handler function to handle all web requests
// function myHandler (req, resp) {
//     // this request is defaultly done by the browser
//     if (req.url === "/favicon.ico") return resp.end()

//         const logData = `${Date.now()} - a new request received at ${req.url}\n`
//         // if we only use req.url it is not able to parse the url into domain name
//         // path, query parameters etc
    
//         // so there is a module url which parses a given url and we can access
//         // its path, query params, protocol etc
//         const myUrl = url.parse(req.url)
//         console.log(myUrl)
        
//         fs.appendFile("./server-log.txt", logData, (err, data) => {
            
//             // switch (req.url) {
//             switch (myUrl.pathname) {
//                 case "/": resp.end("Welcome to home page")
//                 break
//                 case "/about": resp.end("Hi I am Praneeth")
//                 break
//                 default: resp.end("404 error - unable to find the requested page")
//             }
//         })
// }

// const myServer = http.createServer(myHandler)

// myServer.listen(8000, ()=> console.log("Server started successfully"))

// using express js
const app = express()

app.get("/", (req, resp) => {
    return resp.send("Welcome to Home page")
})

app.get("/about", (req, resp) => {
    return resp.send(`This is about page, Welcome ${req.query.name}`)
})

// old way
// const myServer = http.createServer(app)
// myServer.listen(8000, () => console.log("Server started successfully"))

app.listen(8000, () => console.log("Server started successfully"))