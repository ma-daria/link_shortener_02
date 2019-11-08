let express = require('express');
let router = express.Router();
const links = require('../database/models/link');

router.get('/', async function(req, res, next) {
    let link = null;
    let quantity = 0;

    if (req.query.link !== undefined){
        link = req.query.link;
        link = link.replace(process.env.MY_SITE, '');

        let li = await links.findOne({
            attributes: ['transitions'],
            where: {
                shorty: link
            }
        })
            .catch((err) => {
                console.log(err)
            });
        quantity = li.dataValues.transitions
    }

    res.render('transitions', {
        link: process.env.MY_SITE+link,
        quantity: quantity
    });
});

module.exports = router;
