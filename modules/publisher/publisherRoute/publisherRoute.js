// Routes page
const express = require('express');
const publisherController = require('../publisherController/publisherController');
const { postValidation, putValidation, getValidation, deleteValidation, validate } = require('../publisherValidation/publisherValidation.js')
const bodyParser = require("body-parser");
const authService = require('../../middlewares/authentication');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// Insert publisher using post http://localhost:3000/publishers
router.post('/publishers', authService.authenticated, postValidation, validate, publisherController.addPublisher);

// Select all publishers OR:
// select a specific user using key and value http://localhost:3000/publishers/?key=name&value=Abood
router.get('/publishers', authService.authenticated, publisherController.getPublishers);

//Get publisher using one of his attributes http://localhost:3000/publishers/key/value
router.get('/publishers/:publisher_id', authService.authenticated, getValidation, validate, publisherController.getPublisher)

// Update publisher's info using his id http://localhost:3000/publishers/id
router.put('/publishers/:publisher_id', authService.authenticated, putValidation, validate, publisherController.updatePublisher);

// delete a publisher using his ID
router.delete('/publishers/:publisher_id', authService.authenticated, deleteValidation, validate, publisherController.deletePublisher);

module.exports = router;