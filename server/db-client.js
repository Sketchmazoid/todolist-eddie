'use strict';

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client
    .connect()
    .then(() => console.log('connected'))
    .catch(err => console.error('connection error', err.stack));

module.exports = client;