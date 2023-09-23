const authorModel = require('../authorModel/authorModel')

class authorService {
    async addAuthor(info) {
        return authorModel.addAuthor(info);
    }

    async getAuthors() {
        return authorModel.getAuthors();
    }

    async getAuthor(key, value) {
        return authorModel.getAuthor(key, value);
    }

    async updateAuthor(id, info) {
        return authorModel.updateAuthor(id, info);
    }

    async deleteAuthor(id) {
        return authorModel.deleteAuthor(id);
    }

}

module.exports = new authorService();