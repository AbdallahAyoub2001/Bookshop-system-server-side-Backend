module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'bookshop_project_sys'
        },
        migrations: { // knex migrate:latest
            directory: "./db/migrations",

        }
    },
};