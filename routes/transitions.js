let express = require('express');
let router = express.Router();
const links = require('../database/models/link');

/**
 * роутер для страницы 'transitions'. Поиск количества переходов по ссылке.
 */
router.get('/', async function(req, res) {
    let link = null;
    let quantity = 0;

    if (req.query.link !== undefined){
        link = req.query.link;
        link = link.replace(process.env.MY_SITE, '');
        quantity = await getQuantity(link);
        link = process.env.MY_SITE + link;
    }

    res.render('transitions', {
        link: link,
        quantity: quantity
    });
});

/**
 * Получить количество переходов по ссылке
 * @param link - ссылка
 * @returns {Promise<link.transitions|{type}>} - количество
 */
async function getQuantity(link){
    let f = true;
    let quantity = 0;
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
    return quantity;
}
module.exports = router;
