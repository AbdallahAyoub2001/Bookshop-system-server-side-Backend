/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('publisher', table => {
        table.increments('publisher_id');
        table.string('publisher_name').notNullable().unique();
        table.string('establish_date').notNullable();
        table.boolean('still_working').notNullable();
        table.primary(['publisher_id']);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('publisher');
};
