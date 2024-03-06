require('dotenv').config();

var db_url = process.env.DATABASE_URL;
var mongoose = require('mongoose');

const connectDB = () => {

    const url = db_url + "/" + process.env.DATABASE_TABLE;
    try {
        console.log("Connecting to database...");
        mongoose.connect(url);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
    const dbConnection = mongoose.connection;
    dbConnection.once("open", (_) => {
        console.log(`Database connected: ${url}`);
    });
 
    dbConnection.on("error", (err) => {
        console.error(`connection error: ${err}`);
    });
    return;
}

module.exports = connectDB;