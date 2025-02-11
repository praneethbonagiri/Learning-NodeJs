const fs = require("fs")
const os = require("os")

// blocking operation
console.log("1")
const blockingData = fs.readFileSync("./data-blocking.txt", "utf-8")
console.log(blockingData)
console.log("2")

// non blocking operation
console.log("3")
// since this task is asynchronous this may be executed at last or after some time
fs.readFile("./data-non-blocking.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("Error reading from file", err)
    } else {
        console.log("The data from file is \n", data)
    }
})
console.log("4")

/**
 * Default thread pool size = 8
   the max number depends on the server's cpu cores

   we can check our systems thread pool size as below
 */
console.log("The number of cpu cores and the number of threads in my local system are :", os.cpus().length)