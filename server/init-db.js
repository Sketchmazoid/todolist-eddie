'use strict';

const dbClient = require('./db');

module.exports = function() {
    dbClient.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL,
        name varchar(400),
        surname varchar(100),
        email varchar(100),
        phone varchar(50),
        PRIMARY KEY(id)
      );`).then(() => dbClient.end());
    db.query(`CREATE TABLE IF NOT EXISTS lists (
        id SERIAL,
        name varchar(400),
        user_id integer,
        PRIMARY KEY(id)
      );`).then(() => dbClient.end());
    db.query(`CREATE TABLE IF NOT EXISTS items (
        id SERIAL,
        body varchar(40),
        list_id integer,
        PRIMARY KEY(id)
      );`).then(() => dbClient.end());
}