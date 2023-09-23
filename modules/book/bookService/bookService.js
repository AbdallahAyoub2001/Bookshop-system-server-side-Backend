const bookModel = require('../bookModel/bookModel')
const paymentModel = require('../../payment/paymentModel/paymentModel')

class bookService {
    async addBook(info, file_id) {
        return bookModel.addBook(info, file_id);
    }

    async reserveBook(paymentDetails){
        // console.log('Book Service: ', paymentDetails);
        return paymentModel.addPayment(paymentDetails);
    }

    async uploadBookFile(id, file_id) {
        return bookModel.uploadBookFile(id, file_id);
    }

    async getBooks() {
        return bookModel.getBooks();
    }

    async getBook(key, value) {
        return bookModel.getBook(key, value);
    }

    async getBookAny(value) {
        return bookModel.getBookAny(value);
    }

    async updateAvailableUnits(id, units) {
        return bookModel.updateAvailableUnits(id, units);
    }

    async updateBook(id, info) {
        return bookModel.updateBook(id, info);
    }

    async deleteBook(id) {
        return bookModel.deleteBook(id);
    }
}

module.exports = new bookService();