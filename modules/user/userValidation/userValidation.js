const { body, validationResult, param} = require('express-validator')
const db = require("../../../db/db");
const { Users} = require('../../../db/DatabaseTables');

// check that the username isn't empty
let username = body('username').notEmpty().withMessage('Enter a username!!');

let existed_username = body('username').custom(async (value) => {
    const existingUsername = await db(Users).where('username', value).first();
    if (existingUsername) {
        throw new Error('Username is already in use');
    }
    return true;
});

let password = body('password').notEmpty().withMessage('Enter a password!!').isLength({ min: 5 }).withMessage('password should be at least 5 characters');

// check that the given id belongs to a user
let id = param('user_id').custom(async (value) => {
    const user = await db(Users).where('id', value).first();
    if (!user) {
        throw new Error();
    }
    return true;
}).withMessage('User does not exist!!');

const postValidation = [
    username,
    existed_username,
    password,
]

const putValidation = [
    id,
    username,
    password,
]

const getValidation = [
    id
]

const deleteValidation = [
    id
]

const signupValidation = [
    username,
    existed_username,
    password,
]

const loginValidation = [
    username,
    password
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
    signupValidation,
    loginValidation,

    validate,
}