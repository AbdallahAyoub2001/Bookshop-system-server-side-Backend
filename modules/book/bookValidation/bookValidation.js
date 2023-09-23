const { body, validationResult, param} = require('express-validator')
const db = require("../../../db/db");
const { Book, File_Manager} = require("../../../db/DatabaseTables");

// check that the f_name isn't empty
let book_title = body('book_title').notEmpty().withMessage('book Name cannot be empty');

let book_publisher = body('book_publisher').notEmpty().withMessage('book publisher cannot be empty');

let book_author = body('book_author').notEmpty().withMessage('book author cannot be empty');

// let book_file = body('book_file').custom((value, { req }) => {
//     if (!req.files.originalname.match(/\.(pdf)$/i)) {
//         throw new Error('File must be in PDF format.');
//     }
//     return true;
// });

let available_units = body('available_units').isInt().withMessage('This field have to be a number.');

let unit_price = body('unit_price').notEmpty().withMessage('You should enter the price.').isInt().withMessage('This field have to be a number.');

let publish_date = body('publish_date').custom((value) => {

    if (value && (!/^\d{4}\/\d{2}\/\d{2}$/.test(value))) {
        throw new Error('Invalid date format, should be in "YYYY/MM/DD" format');
    }
    return true;
});

// check that the given id belongs to a user
let id = param('book_id').custom(async (value) => {
    const book = await db(Book).where('book_id', value).first();
    if (!book) {
        throw new Error();
    }
    return true;
}).withMessage('publisher does not exist!!');

let file_id = param('file_id').isInt().withMessage('Invalid File_ID').custom(async (value) => {
    const file = await db(File_Manager).where('file_id', value).first();

    if (!file) {
        throw new Error();
    }
    return true;
}).withMessage('File does not exist!!');

const postValidation = [
    book_title,
    book_publisher,
    publish_date,
    book_author,
    // book_file,
    available_units,
    unit_price,
]

const putValidation = [
    id,
    book_title,
    book_publisher,
    publish_date,
    book_author,
    // book_file,
    available_units,
    unit_price,
]

const getValidation = [
    id
]

const deleteValidation = [
    id
]

const addBookFilesValidation = [
    id
]

const deleteBookFilesValidation = [
    file_id,
    id
]

const reserveBookValidation = [

]

const searchBookValidation = [
    body('minAvailableUnits').optional()
        .isInt().withMessage('The minimum available units must be an integer.')
        .custom((value, { req }) => {
            const max = parseInt(req.body.maxAvailableUnits);
            if (!isNaN(value) && isNaN(max)) {
                throw new Error('Please provide both minimum and maximum available units.');
            }
            if (!isNaN(value) && !isNaN(max) && value >= max) {
                throw new Error('The minimum available units must be less than the maximum.');
            }
            return true;
        }),

    body('maxAvailableUnits').optional()
        .isInt().withMessage('The maximum available units must be an integer.'),

    body('minUnitPrice').optional()
        .isInt().withMessage('The minimum unit price must be an integer.')
        .custom((value, { req }) => {
            const max = parseInt(req.body.maxUnitPrice);
            if (!isNaN(value) && isNaN(max) ) {
                throw new Error('Please provide both minimum and maximum unit price.');
            }
            if (!isNaN(value) && !isNaN(max) && value >= max) {
                throw new Error('The minimum unit price must be less than the maximum.');
            }
            return true;
        }),

    body('maxUnitPrice').optional()
        .isInt().withMessage('The maximum unit price must be an integer.'),

    param('key')
        .optional()
        .custom((value, { req }) => {
            const { key, value: searchValue } = req.params;
            if (!key && !searchValue) {
                throw new Error('At least one of key or value must be provided.');
            }
            return true;
        }),

    param('value').optional(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    },
];


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
    addBookFilesValidation,
    deleteBookFilesValidation,
    reserveBookValidation,
    searchBookValidation,

    validate,
}