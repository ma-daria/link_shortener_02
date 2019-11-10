let express = require('express');
let router = express.Router();
const links = require('../database/models/link');

router.get('/', async function(req, res, next) {
    let link = null;
    let quantity = 0;
    let f = true;

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
                f = false;
                console.log(err)
            });
        if ((f)&&(li !== undefined)&&(li !== null)) {
            quantity = li.dataValues.transitions;
        }
        else {
            quantity = 'not found';
        }
        link = process.env.MY_SITE + link;
    }

    res.render('transitions', {
        link: link,
        quantity: quantity
    });
});

module.exports = router;
