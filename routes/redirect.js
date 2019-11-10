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
        await transitionsPlusPlus(shorty);
        res.redirect(link)
    }
});

/**
 * Получить запись из базы о ссылке
 * @param shorty - короткая ссылка
 * @returns {Promise<null|*>} - строка из базы
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
    if (link === null) {
        return null
    }
    else {
        return link.dataValues.url
    }
}

/**
 * Увелечение количества проходов оп ссылке на 1
 * @param shorty - короткая ссылка
 * @returns {Promise<void>}
 */
async function transitionsPlusPlus(shorty){
    await links.increment(
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
