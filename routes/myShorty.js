let express = require('express');
let router = express.Router();
const Links = require('../database/models/link');
const users = require('../database/models/user');

/**
 * роутер для страницы 'myShorty', ищет ссылки пользователя
 */
router.get('/', async function(req, res, next) {
    let links = [];
    let shorties = [];

    let cookie = req.cookies.user;
    if (cookie !== undefined) {

        let user_bd = await users.findOne({
            where: {
                name: cookie
            }

        })
            .catch((err) => {
                console.log(err)
            });

        let inf = await Links.findAll({
            where: {
                user_id: user_bd.dataValues.id
            }

        })
            .catch((err) => {
                console.log(err)
            });

        links = inf.map((o) => o.dataValues.url);
        shorties = inf.map((o) => o.dataValues.shorty);
    }

    res.render('myShorty', {
        links: links,
        shorties: shorties
    });
});

module.exports = router;
