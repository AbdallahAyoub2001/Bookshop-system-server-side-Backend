const db = require('../../../db/db');
const { Author } = require("../../../db/DatabaseTables");

class authorModel {
    async addAuthor(info) {
        let [author_id] = await db(Author).insert({
            first_name: info.first_name, middle_name: info.middle_name, last_name: info.last_name,
            date_of_birth: info.date_of_birth, country_of_residence:info.country_of_residence,
            death_date: info.death_date, official_website: info.official_website
        });

        return author_id;
    }

    async getAuthors() {
        return db.select().from(Author);
    }

    async getAuthor(key, value) {
        let author;
        author = await db(Author).where(key, value);
        return author;
    }

    async updateAuthor(id, info) {

        return db(Author)
            .where({ author_id: id })
            .update({
                first_name: info.first_name,
                middle_name: info.middle_name,
                last_name: info.last_name,
                date_of_birth: info.date_of_birth,
                country_of_residence:info.country_of_residence,
                death_date: info.death_date,
                official_website: info.official_website
            }, ['author_id']);

    }

    async deleteAuthor(id) {
        return db(Author)
            .where({ author_id: id })
            .del();
    }

}

module.exports = new authorModel();