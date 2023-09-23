const authorService = require('../authorService/authorService');

class authorController {
    async addAuthor(req, res) {
        try {
            const id = await authorService.addAuthor(req.body);
            return res.status(201).json(id);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getAuthors(req, res) {
        try {
            let key = req.query.key;

            if(key){
                key = req.query.key;
                const value = req.query.value;
                const author = await authorService.getAuthor(key, value);
                return res.status(200).json(author);

            }
            const authors = await authorService.getAuthors();
            return res.status(201).json(authors);

        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getAuthor(req, res) {
        try {
            const author_id = req.params.author_id;
            const author = await authorService.getAuthor('author_id', author_id);
            return res.status(200).json(author);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }
    async updateAuthor(req, res) {
        try {
            const id = req.params.author_id;
            const q = await authorService.updateAuthor(id, req.body);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deleteAuthor(req, res) {
        try {
            const id = req.params.author_id;
            const q = await authorService.deleteAuthor(id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

}

module.exports = new authorController();