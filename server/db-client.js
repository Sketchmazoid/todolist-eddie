'use strict';

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : `postgresql://postgres:${process.env.DB_PASSWORD}@localhost:5432/mytodolist`,
    ssl: process.env.DATABASE_URL ? {
        rejectUnauthorized: false
    } : false
});

client
    .connect()
    .then(() => console.log('connected'))
    .catch(err => console.error('connection error', err.stack));

module.exports = client;