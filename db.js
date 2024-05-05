require('dotenv').config();
const { MongoClient } = require('mongodb');

var db_url = process.env.DATABASE_URL;
var mongoose = require('mongoose');



async function getDatabase() {
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    const db = client.db('users');
    console.log("Database connected");

    return db; // Return the client object
}

module.exports = getDatabase;