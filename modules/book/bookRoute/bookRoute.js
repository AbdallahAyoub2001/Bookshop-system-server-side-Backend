const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
const bookController = require('../bookController/bookController');
const { postValidation, putValidation, getValidation, deleteValidation,
    addBookFilesValidation, deleteBookFilesValidation, searchBookValidation, validate } = require('../bookValidation/bookValidation.js')

const paymentValidation = require('../../payment/paymentValidation/paymentValidation')
const authService = require('../../middlewares/authentication');
const fManager = require('../../fileManager/fManagerModel/fManagerModel');

// Insert Book using post http://localhost:3000/books
router.post('/books', authService.authenticated, fManager.upload.single('book_file'), postValidation, validate, bookController.addBook);

// Add a file for a book
router.post('/books/:book_id/files', authService.authenticated, fManager.upload.single('book_file'), addBookFilesValidation, validate, bookController.uploadBookFile);

// Reserve a book
router.post('/books/reserve', authService.authenticated, paymentValidation.postValidation, validate, bookController.reserveBook);

// Select all Books OR:
// select a specific Book using key and value http://localhost:3000/books/?key=name&value=Abood
router.get('/books', authService.authenticated, searchBookValidation, validate, bookController.getBooks);

//Get Book using one of his attributes http://localhost:3000/books/key/value
router.get('/books/:book_id', authService.authenticated, getValidation, validate, bookController.getBook)

// Update Book's info using his id http://localhost:3000/books/id
router.put('/books/:book_id', authService.authenticated, putValidation, validate, bookController.updateBook);

// delete a Book using his ID
router.delete('/books/:book_id', authService.authenticated, deleteValidation, validate, bookController.deleteBook);

// Delete a file for a user
router.delete('/books/:book_id/files/:file_id', authService.authenticated, deleteBookFilesValidation, validate, bookController.deleteFileOfBook);

module.exports = router;