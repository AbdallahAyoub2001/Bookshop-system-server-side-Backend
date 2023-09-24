const { body, validationResult, param} = require('express-validator')
const db = require("../../../db/db");
const { Payment, Book} = require("../../../db/DatabaseTables");

let payment_method = body('payment_method').notEmpty().withMessage('establish date cannot be empty')
    .isIn(['Cash', 'Credit Card', 'Paypal']).withMessage('Invalid reservation method!');

let number_of_units = body('number_of_units').isInt().withMessage('This field have to be a number.');

let buyer_name = body('buyer_name').notEmpty().withMessage('buyer Name cannot be empty');

let buyer_address = body('buyer_address').notEmpty().withMessage('buyer address cannot be empty');

let buyer_phone = body('buyer_phone').notEmpty().withMessage('buyer phone cannot be empty');

let purchase_date = body('establish_date').custom((value) => {
    if ((value) && (!/^\d{4}\/\d{2}\/\d{2}$/.test(value))) {
        throw new Error('Invalid date format, should be in "YYYY/MM/DD" format');
    }
    return true;
});

let national_id = body('national_id').notEmpty().withMessage('national id cannot be empty');

// check that the given book_id belongs to a user
let book_id = body('book_id').custom(async (value) => {
    if(value){
        const book = await db(Book).where('book_id', value).first();
        if (!book) {
            throw new Error();
        }
    }
    return true;
}).withMessage('book does not exist!!');

let book_title = body('book_title').custom(async (value) => {
    if(value){
        const book = await db(Book).where('book_title', value).first();
        if (!book) {
            throw new Error();
        }
    }
    return true;
}).withMessage('book does not exist!!');

let id = param('payment_id').custom(async (value) => {
    const payment = await db(Payment).where('payment_id', value).first();
    if (!payment) {
        throw new Error();
    }
    return true;
}).withMessage('reservation does not exist!!');

const postValidation = [
    book_id,
    book_title,
    payment_method,
    number_of_units,
    buyer_name,
    buyer_address,
    buyer_phone,
    purchase_date,
    national_id
]

const putValidation = [
    id,
    book_id,
    book_title,
    payment_method,
    number_of_units,
    buyer_name,
    buyer_address,
    buyer_phone,
    purchase_date,
    national_id
]

const getValidation = [
    id
]

const deleteValidation = [
    id
]

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    deleteValidation,
    putValidation,
    postValidation,
    getValidation,

    validate,
}