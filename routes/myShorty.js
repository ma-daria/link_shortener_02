let express = require('express');
let router = express.Router();
const Links = require('../database/models/link');
const users = require('../database/models/user');

/**
 * роутер для страницы 'myShorty', ищет ссылки пользователя
 */
router.get('/', async function(req, res) {
    let links = [];
    let shorties = [];

    let cookie = req.cookies.user;
    if (cookie !== undefined) {
        let user_bd = await getIdUser(cookie);
        let resLinks = await getMyLinks(user_bd);
        links = resLinks.links;
        shorties = resLinks.shorties;
    }

    res.render('myShorty', {
        links: links,
        shorties: shorties
    });
});

/**
 * получить id юзера по токену
 * @param cookie - токен
 * @returns {Promise<*>} - id юзера
 */
async function getIdUser(cookie){
    let user_bd = await users.findOne({
        where: {
            name: cookie
        }

    })
        .catch((err) => {
            console.log(err)
        });
    return  user_bd.dataValues.id
}

/**
 * получить списко ссылко пользователя
 * @param user_bd - id пользователя
 * @returns {Promise<{links: *, shorties: *}>} - {длинные ссылки, короткие ссылки}
 */
async function getMyLinks(user_bd){
    let inf = await Links.findAll({
        where: {
            user_id: user_bd
        }
    })
        .catch((err) => {
            console.log(err)
        });

    let links = inf.map((o) => o.dataValues.url);
    let shorties = inf.map((o) => o.dataValues.shorty);
    return {links, shorties}
}

module.exports = router;
