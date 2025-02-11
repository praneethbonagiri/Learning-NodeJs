const shortid = require("shortid")
const URL = require("../models/url")

async function handleGenerateNewShortURL(req, resp) {
    const shortID = shortid()
    const body = req.body

    if(!body.url) {
        return resp.status(400).json({error: "URL is required"})
    }

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    })

    return resp.status(201).json({id : shortID})

}

async function handleGetRedirectURL(req, resp) {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        }, 
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                    }
                }
        })

    return resp.redirect(entry.redirectUrl)
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetRedirectURL,
}