const paymentModel = require('../reservationModel/reservationModel')

class reservationService {
    async addPayment(info) {
        return paymentModel.addReservation(info);
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

module.exports = new reservationService();