'use strict';
module.exports = {
    development: {
        dialect: 'postgres',
        timezone: '+00:00',
        host: process.env.DB_HOST,
        username: 'admin',
        password: 'admin',
        database: 'users',
        port: 5432
    },
    app_url: 'http://localhost:5050/'
};
