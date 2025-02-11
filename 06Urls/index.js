const http = require("http")
const fs = require("fs")
const url = require("url")

const myServer = http.createServer((req, resp) => {
    // this request is defaultly done by the browser
    if (req.url === "/favicon.ico") return resp.end()

    const logData = `${Date.now()} - a new request received at ${req.url}\n`
    // if we only use req.url it is not able to parse the url into domain name
    // path, query parameters etc

    // so there is a module url which parses a given url and we can access
    // its path, query params, protocol etc
    const myUrl = url.parse(req.url)
    console.log(myUrl)
    
    fs.appendFile("./server-log.txt", logData, (err, data) => {
        
        // switch (req.url) {
        switch (myUrl.pathname) {
            case "/": resp.end("Welcome to home page")
            break
            case "/about": resp.end("Hi I am Praneeth")
            break
            default: resp.end("404 error - unable to find the requested page")
        }
    })
})

myServer.listen(8000, ()=> console.log("Server started successfully"))