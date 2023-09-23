const bookService = require('../bookService/bookService');
const fManager = require('../../fileManager/fManagerModel/fManagerModel');
const {Book} = require("../../../db/DatabaseTables");


class bookController {
    async addBook(req, res) {

        try {
            if ( req.file ) { //&& req.file.length > 0
                const uploadedFiles = req.file;
                const file = await fManager.uploadFile(uploadedFiles);
                const id = await bookService.addBook(req.body, file.file_id);
                return res.status(201).json(id);
            } else {
                const id = await bookService.addBook(req.body, null);
                return res.status(201).json(id);
            }

        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async reserveBook(req, res) {
        try {
            const book_id = req.body.book_id;
            const book_title = req.body.book_title;
            if(!book_id && !book_title){
                return res.status(500).json('You need to enter either the book ID or the title!');
            }

            let book;
            if(book_id)
                book = await bookService.getBook('book_id', book_id);
            else if(book_title)
                book = await bookService.getBook('book_title', book_title);

            const number_of_units = req.body.number_of_units;
            if(number_of_units < 0){
                // throw new Error('Invalid unit number.');
                return res.status(500).json('Invalid unit number.');
            } else if (number_of_units > book[0].available_units){
                // throw new Error('There is no enough units');
                return res.status(500).json('There is no enough units');
            }
            const buyer_name = req.body.buyer_name;
            const buyer_address = req.body.buyer_address;
            const buyer_phone = req.body.buyer_phone;
            const purchase_date = req.body.purchase_date;
            const national_id = req.body.national_id;
            const payment_method = req.body.payment_method;
            const total_price = Number(book[0].unit_price) * Number(number_of_units);

            const paymentDetails = { book_id: book[0].book_id, payment_method, number_of_units, unit_price: book[0].unit_price,
                total_price, buyer_name, buyer_address, buyer_phone, purchase_date, national_id };

            const payment = await bookService.reserveBook(paymentDetails);
            if(payment) {
                const done = await bookService.updateAvailableUnits(book[0].book_id, book[0].available_units - number_of_units);

                if (done)
                    return res.status(201).json(payment);
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async uploadBookFile(req, res) {
        const book_id = req.params.book_id;
        try {

            // Access the uploaded file details from req.file
            const uploadedFiles = req.file;
            // console.log(uploadedFiles)

            const file = await fManager.uploadFile(uploadedFiles);
            await bookService.uploadBookFile(book_id, file.file_id);

            res.status(200).json(file);

        } catch (error) {
            console.error('Error handling file upload and insertion:', error);
            return res.status(500).json({ message: 'File upload and insertion failed' });
        }
    }

    // async getBooks(req, res) {
    //     try {
    //         let value = req.query.value;
    //
    //         if(value){
    //             value = req.query.value;
    //             const key = req.query.key;
    //             let constrainedBooks;
    //             const minAvailableUnits = req.body.minAvailableUnits;
    //             const maxAvailableUnits = req.body.maxAvailableUnits;
    //             const book = await bookService.getBook(key, value);
    //             if(minAvailableUnits && maxAvailableUnits){
    //                 constrainedBooks = book.filter((value) => {return value.available_units >= minAvailableUnits && value.available_units <= maxAvailableUnits});
    //             }
    //             const minUnitPrice = req.body.minUnitPrice;
    //             const maxUnitPrice = req.body.maxUnitPrice;
    //             let priceConstBooks;
    //             if(minUnitPrice && maxUnitPrice){
    //                 priceConstBooks = book.filter((value) => {return value.unit_price >= minUnitPrice && value.unit_price <= maxUnitPrice});
    //             }
    //
    //             if(constrainedBooks && priceConstBooks){
    //                 const filteredElements = [...constrainedBooks].filter(element => new Set(priceConstBooks).has(element));
    //                 return res.status(200).json(filteredElements);
    //             }
    //             else if(constrainedBooks){
    //                 return res.status(200).json(constrainedBooks);
    //             }
    //             else if(priceConstBooks){
    //                 return res.status(200).json(priceConstBooks);
    //             }
    //
    //             return res.status(200).json(book);
    //         }
    //         const books = await bookService.getBooks();
    //         return res.status(201).json(books);
    //
    //     } catch (err) {
    //         console.error(err);
    //         return res.status(500).json("Something went wrong!");
    //     }
    // }

    async getBooks(req, res) {
        try {
            let result;
            const { key, value } = req.query;
            const { minAvailableUnits, maxAvailableUnits, minUnitPrice, maxUnitPrice } = req.body;

            if (value && !key){
                result = await bookService.getBookAny(value);
            }
            else if (value && key) {
                result = await bookService.getBook(key, value);
            }
            else if (!value && !key){
                result = await bookService.getBooks();
            }

            const filteredResult = result
                .filter((book) => {
                    if (!isNaN(minAvailableUnits) && book.available_units < parseInt(minAvailableUnits)) {
                        return false;
                    }
                    if (!isNaN(maxAvailableUnits) && book.available_units > parseInt(maxAvailableUnits)) {
                        return false;
                    }
                    if (!isNaN(minUnitPrice) && book.unit_price < parseFloat(minUnitPrice)) {
                        return false;
                    }
                    return !(!isNaN(maxUnitPrice) && book.unit_price > parseFloat(maxUnitPrice));

                });

            res.status(200).json(filteredResult);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getBook(req, res) {
        try {
            const book_id = req.params.book_id;
            const book = await bookService.getBook('book_id', book_id);
            const bookFile = await fManager.getBookFile(book_id);
            if(bookFile)
                return res.status(200).json(book + bookFile);
            else
                return res.status(200).json(book);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }
    async updateBook(req, res) {
        try {
            const id = req.params.book_id;
            const q = await bookService.updateBook(id, req.body);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deleteBook(req, res) {
        try {
            const id = req.params.book_id;
            let bookFile = await db(Book).where('book_id', id);
            await fManager.deleteFile(bookFile.book_file);
            const q = await bookService.deleteBook(id);
            return res.status(200).json(q);

        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deleteFileOfBook(req, res) {
        const { file_id } = req.params.file_id;

        try {
            // Calling the deleteFile method to delete the file from the server and database
            await fManager.deleteFile(file_id);

            return res.status(200).json({ message: 'File deleted successfully' });
        } catch (error) {
            console.error('Error deleting file:', error);
            return res.status(500).json({ message: 'File deletion failed' });
        }
    }

}

module.exports = new bookController();