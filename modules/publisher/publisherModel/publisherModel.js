const db = require('../../../db/db');
const { Publisher } = require("../../../db/DatabaseTables");

class publisherModel {
    async addPublisher(info) {
        let [publisher_id] = await db(Publisher).insert({
            publisher_name: info.publisher_name, establish_date: info.establish_date, still_working: info.still_working,
        });

        return publisher_id;
    }

    async getPublishers() {
        return db.select().from(Publisher);
    }

    async getPublisher(key, value) {
        let publisher;
        publisher = await db(Publisher).where(key, value);
        return publisher;
    }

    async updatePublisher(id, info) {

        return db(Publisher)
            .where({ publisher_id: id })
            .update({
                publisher_name: info.publisher_name,
                establish_date: info.establish_date,
                still_working: info.still_working,
            }, ['publisher_id']);

    }

    async deletePublisher(id) {
        return db(Publisher)
            .where({ publisher_id: id })
            .del();
    }
}

module.exports = new publisherModel();