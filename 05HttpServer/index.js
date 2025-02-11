const http = require("http")
const fs = require("fs")

const myServer = http.createServer((req, res) => {
    // console.log(req)
    // console.log("New request received")
    const logData = `${Date.now()} - New request received at ${req.url}\n`
    fs.appendFile("server-log.txt", logData, (err, data) => {
        // if (err) {
        //     console.log("Error processing the request")
        // } else {
        //     res.end("Hello from server")
        // }

        switch (req.url) {
            case "/": res.end("Home page")
            break
            case "/about": res.end("I am Praneeth")
            break
            default: res.end("404 web page not found")
        }
    })
})

myServer.listen(8000, () => console.log("Server started successfully"))