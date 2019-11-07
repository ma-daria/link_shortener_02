let express = require('express');
let router = express.Router();


router.get('/', function(req, res, next) {
    let link = null;
    let quantity = 0;

    res.render('transitions', {
        link: link,
        quantity: quantity
    });
});

module.exports = router;
