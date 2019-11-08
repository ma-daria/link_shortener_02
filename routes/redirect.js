let express = require('express');
let router = express.Router();
const links = require('../database/models/link');

router.get('/', async function(req, res, next) {
    let shorty = req.baseUrl;
    shorty = shorty.slice(1);


    let link = await links.findOne({
        attributes: ['url'],
        where: {
            shorty: shorty
        }
    })
        .catch((err) => {
            console.log(err);
        });

    if ((link === undefined)||(link === null)){
        res.render('error404');
    }
    else {
        res.redirect(link.dataValues.url)
    }

    console.log('test');
});

module.exports = router;
