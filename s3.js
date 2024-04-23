// Load the AWS SDK for Node.js
require('dotenv').config();
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ 
    region: "us-east-2",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create S3 service object
s3 = new AWS.S3({ apiVersion: "2006-03-01" });

module.exports = s3;