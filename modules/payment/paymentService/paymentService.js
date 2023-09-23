const paymentModel = require('../paymentModel/paymentModel')

class paymentService {
    async addPayment(info) {
        return paymentModel.addPayment(info);
    }

    async getPayments() {
        return paymentModel.getPayments();
    }

    async getPayment(key, value) {
        return paymentModel.getPayment(key, value);
    }

    async updatePayment(id, info) {
        return paymentModel.updatePayment(id, info);
    }

    async deletePayment(id) {
        return paymentModel.deletePayment(id);
    }
}

module.exports = new paymentService();