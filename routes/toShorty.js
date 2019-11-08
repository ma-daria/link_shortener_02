let express = require('express');
let router = express.Router();
const generateShorty = require('../algorithm/generateShorty');
const links = require('../database/models/link');


router.get('/', async function(req, res, next) {
    let  link_original = req.query.link;
    let link = '';


    let cityFromID = await links.findOne({
        attributes: ['shorty'],
        where: {
            url: link_original
        }
    })
        .catch((err) => {
            console.log(err)
        });

    if ((cityFromID === undefined) || (cityFromID === null)){
        link = await AddBD(link_original, generateShorty.GenerateShorty(link_original));
    }else{
        link = cityFromID.ldataValues.shorty;
    }


    res.render('index', {
        link: link
    });
});

/**
 * @return {string}
 */
async function AddBD(link_original, link) {
    let errLink = null;
    const li = await links.create({
        url: link_original,
        shorty: link,
        autor: '',
        transitions: 0
    })
        .catch(async (err) => {
            console.log(err);
            errLink = await AddBD(link_original, generateShorty.GenerateShorty(link_original));
        });
    if (!errLink) {
        return String(li.dataValues.shorty)
    } else return errLink;
}

module.exports = router;
