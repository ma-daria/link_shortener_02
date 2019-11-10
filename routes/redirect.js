let express = require('express');
let router = express.Router();
const links = require('../database/models/link');

/**
 * открытие короткой ссылки
 */
router.get('/', async function(req, res) {
    let shorty = req.baseUrl;
    shorty = shorty.slice(1);

    let link = await getLink(shorty);

    if ((link === undefined)||(link === null)){
        res.render('error404');
    }
    else {
        transitionsPlusPlus(shorty);
        res.redirect(link)
    }
});

/**
 * Получить запись из базы о ссылке
 * @param shorty - короткая ссылка
 * @returns {Promise<*>} - строка из базы
 */
async function getLink(shorty){
    let link = await links.findOne({
        attributes: ['url', 'transitions'],
        where: {
            shorty: shorty
        }
    })
        .catch((err) => {
            console.log(err);
        });
    if (link == null) {
        return null
    }
    return link.dataValues.url
}


/**
 * Увелечение количества проходов оп ссылке на 1
 * @param shorty - коротчкая ссылка
 * @returns {Promise<void>}
 */
function transitionsPlusPlus( shorty){
    links.increment(
        {transitions: 1},
        {where:{
                shorty: shorty
            }}
        )
        .catch((err) => {
            console.log(err);
        });
}

module.exports = router;
