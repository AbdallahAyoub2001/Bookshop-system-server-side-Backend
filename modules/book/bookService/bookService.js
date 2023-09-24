const bookModel = require('../bookModel/bookModel')
const reservationModel = require('../../reservation/reservationModel/reservationModel')

class bookService {
    async addBook(info, file_id) {
        return bookModel.addBook(info, file_id);
    }

    async reserveBook(reservationDetails){
        // console.log('Book Service: ', reservationDetails);
        return reservationModel.addReservation(reservationDetails);
    }

    async uploadBookFile(id, file_id) {
        return bookModel.uploadBookFile(id, file_id);
    }

    async getBook(key, value) {
        return bookModel.getBook(key, value);
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