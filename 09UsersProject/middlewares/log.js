const fs = require("fs")

function logReqResp(filename){
    return (req, resp, next) => {
        fs.appendFile(
            filename,
            `${Date.now()} : ${req.ip} ${req.method} ${req.path}\n`,
            (err, data) => {
                next()
            }
        )
    }
}

module.exports = {
    logReqResp,
}