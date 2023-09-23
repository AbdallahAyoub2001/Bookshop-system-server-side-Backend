const paymentService = require('../paymentService/paymentService');

class paymentController {
    async addPayment(req, res) {
        try {
            const id = await paymentService.addPayment(req.body);
            return res.status(201).json(id);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getPayments(req, res) {
        try {
            let key = req.query.key;

            if(key){
                key = req.query.key;
                const value = req.query.value;
                const payment = await paymentService.getPayment(key, value);
                return res.status(200).json(payment);

            }
            const payments = await paymentService.getPayments();
            return res.status(201).json(payments);

        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getPayment(req, res) {
        try {
            const payment_id = req.params.payment_id;
            const payment = await paymentService.getPayment('payment_id', payment_id);
            return res.status(200).json(payment);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }
    async updatePayment(req, res) {
        try {
            const id = req.params.payment_id;
            const q = await paymentService.updatePayment(id, req.body);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deletePayment(req, res) {
        try {
            const id = req.params.payment_id;
            const q = await paymentService.deletePayment(id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }
}

module.exports = new paymentController();