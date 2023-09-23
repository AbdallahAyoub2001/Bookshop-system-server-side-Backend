/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('author', table => {
        table.increments('author_id');
        table.string('first_name').notNullable();
        table.string('middle_name').notNullable();
        table.string('last_name').notNullable();
        table.string('date_of_birth').notNullable();
        table.string('country_of_residence').notNullable();
        table.string('death_date').defaultTo('null');
        table.string('official_website').notNullable();
        table.primary(['author_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('author')
};
