/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('book', table => {
        table.increments('book_id');
        table.string('book_title').notNullable();
        table.integer('book_publisher').notNullable().references('publisher_id').inTable('publisher');
        table.string('publish_date').defaultTo(new Date().toISOString().replace(/[:-]/g, '').slice(0,8));
        table.integer('book_author').notNullable().references('author_id').inTable('author');
        table.string('book_file').defaultTo('null').references('file_id').inTable('file_manager');
        table.string('book_tags').defaultTo('null');
        table.integer('available_units').defaultTo('1');
        table.integer('unit_price').notNullable();
        table.primary(['book_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('book');
};
