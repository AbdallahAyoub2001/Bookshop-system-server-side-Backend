const publisherService = require('../publisherService/publisherService');

class publisherController {
    async addPublisher(req, res) {
        try {
            const id = await publisherService.addPublisher(req.body);
            return res.status(201).json(id);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getPublishers(req, res) {
        try {
            let key = req.query.key;

            if(key){
                key = req.query.key;
                const value = req.query.value;
                const apartment = await publisherService.getPublisher(key, value);
                return res.status(200).json(apartment);

            }
            const publishers = await publisherService.getPublishers();
            return res.status(201).json(publishers);

        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getPublisher(req, res) {
        try {
            const publisher_id = req.params.publisher_id;
            const publisher = await publisherService.getPublisher('publisher_id', publisher_id);
            return res.status(200).json(publisher);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }
    async updatePublisher(req, res) {
        try {
            const id = req.params.publisher_id;
            const q = await publisherService.updatePublisher(id, req.body);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deletePublisher(req, res) {
        try {
            const id = req.params.publisher_id;
            const q = await publisherService.deletePublisher(id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

}

module.exports = new publisherController();