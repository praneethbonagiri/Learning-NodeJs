const express = require("express")
const router = express.Router()
const {handleGetAllUsers, handleGetUserById, handleCreateUser, handleUpdateUserById, handleDeleteUserById} = require("../controllers/user")

router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateUser)

router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

module.exports = router