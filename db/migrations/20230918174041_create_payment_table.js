/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('payment', table => {
        table.increments('payment_id');
        table.integer('book_id').notNullable().references('book_id').inTable('book');
        table.string('payment_method').notNullable();
        table.integer('number_of_units').defaultTo('1');
        table.integer('unit_price').notNullable();
        table.integer('total_price').notNullable();
        table.string('buyer_name').notNullable();
        table.string('buyer_address').notNullable();
        table.string('buyer_phone').notNullable();
        table.string('purchase_date').defaultTo(new Date().toISOString().replace(/[:-]/g, '').slice(0,8));
        table.interger('national_id').notNullable();
        table.primary(['payment_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('payment');
};
