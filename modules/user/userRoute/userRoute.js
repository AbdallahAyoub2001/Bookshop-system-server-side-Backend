// Routes page
const express = require('express');
const userController = require('../UserController/UserController');
const { postValidation, putValidation, getValidation,
    deleteValidation, signupValidation, loginValidation,
    validate } = require('../UserValidation/UserValidation.js')
const authService = require('../../middlewares/authentication');


const router = express.Router();

// Insert User using post http://localhost:3000/users
router.post('/users', authService.authenticated, postValidation, validate, userController.addUser);

// Select all users
// select a specific user using key and value http://localhost:3000/users/?key=name&value=Abood
router.get('/users', authService.authenticated, userController.getUsers);

//Get User using one of his attributes http://localhost:3000/users/key/value
router.get('/users/:user_id', authService.authenticated, getValidation, validate, userController.getUser);

// Update user's info using his id http://localhost:3000/users/id
router.put('/users/:user_id', authService.authenticated, putValidation, validate, userController.updateUser);

// delete a user using his ID
router.delete('/users/:user_id', authService.authenticated, deleteValidation, validate, userController.deleteUser);

// sign-up a new user
router.post('/signup', signupValidation, validate, userController.signup);
router.post('/login', loginValidation, validate, userController.login);

module.exports = router;