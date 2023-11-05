const express = require('express');
const router = express.Router();
const { handleGetAllUsers, handleGetUpdateUserById, handleGetDeleteUserById, handleAddNewUser, handleGetUserById } = require('../controllers/user')
router.route('/')
    .get(handleGetAllUsers)
    .post(handleAddNewUser)
router.route('/:id')
    .get(handleGetUserById)
    .patch(handleGetUpdateUserById)
    .delete(handleGetDeleteUserById)

module.exports = router;