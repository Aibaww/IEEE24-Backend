//
// root & placeholder api
//

// if you see hello world when u go to localhost:5555/
// the server is up and running

// if you see hello world when u do an api request (not to the root)
// your path is wrong :)

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Hello World');
});

module.exports = router;
