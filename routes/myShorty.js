let express = require('express');
let router = express.Router();


router.get('/', function(req, res, next) {
    let links = [];
    let shorties = [];

    res.render('myShorty', {
        links: links,
        shorties: shorties
    });
});

module.exports = router;
