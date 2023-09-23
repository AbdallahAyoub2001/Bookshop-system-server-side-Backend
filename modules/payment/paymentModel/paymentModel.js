const db = require('../../../db/db');
const { Payment } = require("../../../db/DatabaseTables");

class paymentModel {
    async addPayment(info) {
        // console.log(info)
        let [payment_id] = await db(Payment).insert({
            book_id: info.book_id, payment_method: info.payment_method, number_of_units: info.number_of_units,
            unit_price: info.unit_price, total_price: info.total_price, buyer_name: info.buyer_name,
            buyer_address: info.buyer_address, buyer_phone: info.buyer_phone,
            purchase_date: info.purchase_date, national_id: info.national_id,
        });

        // let [payment_id] = await db(Payment).insert({
        //     book_id: info[0], payment_method: info=[1], number_of_units: info[2],
        //     unit_price: info[3], total_price: info[4], buyer_name: info[5],
        //     buyer_address: info[5], buyer_phone: info[6],
        //     purchase_date: info[7], national_id: info[8],
        // });

        return payment_id;
    }

    async getPayments() {
        return db.select().from(Payment);
    }

    async getPayment(key, value) {
        let payment;
        payment = await db(Payment).where(key, value);
        return payment;
    }

    async updatePayment(id, info) {

        return db(Payment)
            .where({ payment_id: id })
            .update({
                book_id: info.book_id,
                payment_method: info.payment_method,
                number_of_units: info.number_of_units,
                unit_price: info.unit_price,
                total_price: info.total_price,
                buyer_name: info.buyer_name,
                buyer_address: info.buyer_address,
                buyer_phone: info.buyer_phone,
                purchase_date: info.purchase_date,
                national_id: info.national_id,
            }, ['payment_id']);

    }

    async deletePayment(id) {
        return db(Payment)
            .where({ payment_id: id })
            .del();
    }

}

module.exports = new paymentModel();