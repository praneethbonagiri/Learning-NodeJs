const fs = require("fs")

// synchronous method
// only 2 args
fs.writeFileSync("./test.txt", "Hello, this file is created by node js fs module :)")

// asynchronous method
// require 3 args, 3rd is just a call back function which need to execute in case of error
fs.writeFile("./test2.txt", "Hello this file is created by fs.writeFile() which is async", (err) => {})

// synchronous function
// reads and returns data
// in case of any error like file not found or unable to open file we need to handle with try catch
const data = fs.readFileSync("./contacts.txt", "utf-8")
console.log(data)

// asynchronous function
// does not return any data, expects a call back function with error and result as parameters
// in case of any error we can handle logic in call back function
fs.readFile("./contacts.txt", "utf-8", (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result)
    }
})


fs.appendFileSync("./text.txt", new Date().toDateString())