// Routes page
const express = require('express');
const paymentController = require('../paymentController/paymentController');
const { postValidation, putValidation, getValidation, deleteValidation, validate } = require('../paymentValidation/paymentValidation.js')
const bodyParser = require("body-parser");
const authService = require('../../middlewares/authentication');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// Insert publisher using post http://localhost:3000/publishers
router.post('/payments', authService.authenticated, postValidation, validate, paymentController.addPayment);

// Select all publishers OR:
// select a specific user using key and value http://localhost:3000/publisher/?key=name&value=Abood
router.get('/payments', authService.authenticated, paymentController.getPayments);

//Get publisher using one of his attributes http://localhost:3000/publisher/key/value
router.get('/payments/:payment_id', authService.authenticated, getValidation, validate, paymentController.getPayment)

// Update publisher's info using his id http://localhost:3000/publisher/id
router.put('/payments/:payment_id', authService.authenticated, putValidation, validate, paymentController.updatePayment);

// delete a publisher using his ID
router.delete('/payments/:payment_id', authService.authenticated, deleteValidation, validate, paymentController.deletePayment);

module.exports = router;