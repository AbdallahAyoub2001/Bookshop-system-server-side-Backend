const publisherModel = require('../publisherModel/publisherModel')

class publisherService {
    async addPublisher(info) {
        return publisherModel.addPublisher(info);
    }

    async getPublishers() {
        return publisherModel.getPublishers();
    }

    async getPublisher(key, value) {
        return publisherModel.getPublisher(key, value);
    }

    async updatePublisher(id, info) {
        return publisherModel.updatePublisher(id, info);
    }

    async deletePublisher(id) {
        return publisherModel.deletePublisher(id);
    }

}

module.exports = new publisherService();