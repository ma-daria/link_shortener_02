let express = require('express');
let router = express.Router();
const links = require('../database/models/link');
const redis = require("../redis");

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
 * Получить длинную ссылку
 * @param shorty - короткая ссылка
 * @returns {Promise<unknown>} - длинная ссылка
 */
async function getLink(shorty){

    let link = await getLinkRedis(shorty);
    if (link === null){
         let link_bd = await links.findOne({
             attributes: ['url', 'transitions'],
             where: {
                 shorty: shorty
             }
         })
             .catch((err) => {
                 console.log(err);
             });
         link = link_bd.dataValues.url;
    }
    return link;
}

/**
 * запрос в редис
 * @param shortLink - короткая ссылка
 * @returns {Promise<unknown>} - длинная ссылка
 */
async function getLinkRedis(shortLink) {
    const redisClient = await redis.waitForConnection();

    return new Promise((resolve) => {
        redisClient.get(shortLink, (err, reply) => resolve(reply));
    });
}

/**
 * Увелечение количества проходов оп ссылке на 1
 * @param shorty - короткая ссылка
 * @returns {Promise<void>}
 */
function transitionsPlusPlus(shorty){
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
