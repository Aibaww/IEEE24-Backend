//
// routes for uploading/retrieving favicon links from S3 bucket
//

const express = require('express');
const s3 = require('../s3');
const multer = require('multer');
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

router.post('/upload', upload.single('file'), async (req, res) => {
    var params = {
        Body: req.file.buffer,
        Bucket: "ieee-favicon-bucket",
        Key: req.file.originalname,
    };
    s3.upload(params, async (err, data) => {
        if (err) {
            console.log(err);
            res.send("Error uploading favicon");
        } else {
            res.send(`https://ieee-favicon-bucket.s3.amazonaws.com/${req.file.originalname}`);
        }
    });
});


module.exports = router;