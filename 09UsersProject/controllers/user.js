const User = require("../models/user")

async function handleGetAllUsers(req, resp) {
    const allUsers = await User.find({})
    return resp.json(allUsers)
}

async function handleGetUserById(req, resp) {
    const id = req.params.id
    const user = await User.findById(id)

    if (!user) {
        return resp.status(404).json({error : `User with id: ${id} dosen't exists`})
    }

    resp.json(user)
}

async function handleCreateUser(req, resp) {
    if (req.body.first_name == "" || 
        req.body.last_name == "" || 
        req.body.email == "" ||         
        req.body.gender == "" ||         
        req.body.job_title == "") {
        return resp.status(400).json({"message" : "User fileds cannot be null"})
    }

    try {
        const user = await User.create({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        jobTitle: req.body.job_title,
    })

    return resp.status(201).json({
        "message": `User created successfully with id : ${user._id}`})

    } catch (error) {
        resp.status(400).json({"message" : "Error creating user, email already exists. Email cannot be duplicate"})
    }
}

async function handleUpdateUserById(req, resp) {
    await User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        jobTitle: req.body.job_title,
    })

    return resp.json({"message": "User details updates successfully"})
}

async function handleDeleteUserById(req, resp) {
    const id = req.params.id
    await User.findByIdAndDelete(id)

    return resp.json({"message" : `Deleted user with id : ${id}`})
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById,
}