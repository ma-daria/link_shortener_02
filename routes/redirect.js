let express = require('express');
let router = express.Router();
const links = require('../database/models/link');

/**
 * открытие короткой ссылки и превращения ее в длинную
 */
router.get('/', async function(req, res) {
    let shorty = req.baseUrl;
    shorty = shorty.slice(1);

    let link = await links.findOne({
        attributes: ['url', 'transitions'],
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
        await links.update(
        {transitions: link.dataValues.transitions + 1},
        {where:{
                shorty: shorty
            }}
        )
            .catch((err) => {
                console.log(err);
            });

        res.redirect(link.dataValues.url)
    }
});

module.exports = router;
