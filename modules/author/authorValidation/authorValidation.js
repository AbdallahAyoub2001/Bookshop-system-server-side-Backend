const { body, validationResult, param} = require('express-validator')
const db = require("../../../db/db");
// const { Neighborhood } = require("../../../db/DatabaseTables");

// check that the f_name isn't empty
let f_name = body('first_name').notEmpty().withMessage('First Name cannot be empty');

let m_name = body('middle_name').notEmpty().withMessage('Middle Name cannot be empty');

let l_name = body('last_name').notEmpty().withMessage('Last Name cannot be empty');

let DOB = body('date_of_birth').notEmpty().withMessage('DOB cannot be empty');

let country = body('country_of_residence').notEmpty().withMessage('COR cannot be empty');

let website = body('official_website').notEmpty().withMessage('website cannot be empty');

// check that the given id belongs to a user
let id = param('author_id').custom(async (value) => {
    const author = await db('author').where('author_id', value).first();
    if (!author) {
        throw new Error();
    }
    return true;
}).withMessage('author does not exist!!');

const postValidation = [
    f_name,
    m_name,
    l_name,
    DOB,
    country,
    website
]

const putValidation = [
    id,
    f_name,
    m_name,
    l_name,
    DOB,
    country,
    website
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