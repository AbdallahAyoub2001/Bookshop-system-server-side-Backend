const db = require('../../../db/db');
const { Book } = require("../../../db/DatabaseTables");

class bookModel {
    async addBook(info, file_id) {

            let [book_id] = await db(Book).insert({
                book_title: info.book_title, book_publisher: info.book_publisher, publish_date: info.publish_date,
                book_author: info.book_author, book_file: file_id, book_tags: info.book_tags,
                available_units: info.available_units, unit_price: info.unit_price,
            });
            return book_id;
    }

    async uploadBookFile(id, file_id) {
``
        return db(Book)
            .where({ book_id: id })
            .update({
                book_file: file_id
            }, ['book_id']);
    }

    async updateAvailableUnits(id, units) {
        return db(Book)
            .where({ book_id: id })
            .update({
                available_units: units
            });
    }

    async getBooks() {
        return db.select().from(Book);
    }

    async getBook(key, value) {
        let book;

        if (key === 'book_publisher') {
            // If searching by publisher name, join with 'publisher' table
            book = await db
                .join('publisher', 'book.book_publisher', '=', 'publisher.publisher_id')
                .where('publisher.publisher_name', 'like', `%${value}%`);
        } else if (key === 'book_author') {
            // If searching by author name, join with 'author' table
            book = await db
                .join('author', 'book.book_author', '=', 'author.author_id')
                .where('author.first_name', 'like', `%${value}%`)
                .orWhere('author.middle_name', 'like', `%${value}%`)
                .orWhere('author.last_name', 'like', `%${value}%`);
        } else {
            // Search in other book columns
            book = await db(Book).where(key, value);
        }

        return book;
    }

    async getBookAny(value) {
        const books = await db(Book).where((builder) => {
            builder
                .where('book_title', 'like', `%${value}%`)
                .orWhere('book_publisher', 'in', function () {
                    this.select('publisher_id').from('publisher').where('publisher_name', 'like', `%${value}%`);
                })
                .orWhere('book_author', 'in', function () {
                    this.select('author_id').from('author').where('first_name', 'like', `%${value}%`)
                        .orWhere('middle_name', 'like', `%${value}%`)
                        .orWhere('last_name', 'like', `%${value}%`);
                })
                .orWhere('book_tags', 'like', `%${value}%`);
        });
        return books;
    }

    async updateBook(id, info) {
            return db(Book)
                .where({book_id: id})
                .update({
                    book_title: info.book_title, book_publisher: info.book_publisher, publish_date: info.publish_date,
                    book_author: info.book_author, book_file: info.book_file, book_tags: info.book_tags,
                    available_units: info.available_units, unit_price: info.unit_price,
                }, ['book_id']);
    }

    async deleteBook(id) {
        return db(Book)
            .where({ book_id: id })
            .del();
    }
}

module.exports = new bookModel();