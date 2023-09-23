// Routes page
const express = require('express');
const authorController = require('../authorController/authorController');
const { postValidation, putValidation, getValidation, deleteValidation, validate } = require('../authorValidation/authorValidation.js')
const bodyParser = require("body-parser");
const authService = require('../../middlewares/authentication');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// Insert User using post http://localhost:3000/users
router.post('/authors', authService.authenticated, postValidation, validate, authorController.addAuthor);

// Select all users
// select a specific user using key and value http://localhost:3000/users/?key=name&value=Abood
router.get('/authors', authService.authenticated, authorController.getAuthors);

//Get User using one of his attributes http://localhost:3000/users/key/value
router.get('/authors/:author_id', authService.authenticated, getValidation, validate, authorController.getAuthor)

// Update user's info using his id http://localhost:3000/users/id
router.put('/authors/:author_id', authService.authenticated, putValidation, validate, authorController.updateAuthor);

// delete a user using his ID
router.delete('/authors/:author_id', authService.authenticated, deleteValidation, validate, authorController.deleteAuthor);

module.exports = router;