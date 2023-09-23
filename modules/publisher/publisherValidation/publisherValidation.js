const { body, validationResult, param} = require('express-validator')
const db = require("../../../db/db");
const { Publisher } = require("../../../db/DatabaseTables");

// check that the f_name isn't empty
let publisher_name = body('publisher_name').notEmpty().withMessage('Publisher Name cannot be empty')
    .custom(async (value) => {
        const existingPublisher = await db(Publisher).where('publisher_name', value).first();
        if (existingPublisher) {
            throw new Error('publisher name is already in use');
        }
        return true;
    });

// let existedPublisher = body('publisher_name').custom(async (value) => {
//         const existingPublisher = await db(Publisher).where('publisher_name', value).first();
//         if (existingPublisher) {
//             throw new Error('publisher name is already in use');
//         }
//         return true;
//     });

let establish_date = body('establish_date').notEmpty().withMessage('establish date cannot be empty').custom((value) => {
    if (!/^\d{4}\/\d{2}\/\d{2}$/.test(value)) {
        throw new Error('Invalid date format, should be in "YYYY/MM/DD" format');
    }
    return true;
});

let still_working = body('still_working').notEmpty().withMessage('Working status cannot be empty').isBoolean().withMessage('Value should be boolean');

// check that the given id belongs to a user
let id = param('publisher_id').custom(async (value) => {
    const publisher = await db(Publisher).where('publisher_id', value).first();
    if (!publisher) {
        throw new Error();
    }
    return true;
}).withMessage('publisher does not exist!!');

const postValidation = [
    publisher_name,
    establish_date,
    still_working
]

const putValidation = [
    id,
    publisher_name,
    establish_date,
    still_working
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