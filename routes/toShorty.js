let express = require('express');
let router = express.Router();
const generateShorty = require('../algorithm/generateShorty');
const generateUser = require('../algorithm/generateUser');
const links = require('../database/models/link');
const users = require('../database/models/user');


router.get('/', async function(req, res, next) {
    let  link_original = req.query.link;
    if (link_original.indexOf('http://') || link_original.indexOf('https://') ){
        link_original = 'http://'+link_original;
    }
    let link = '';
    let user = 0;

    let cookie = req.cookies.user;
    if (cookie === undefined){
        let us = await AddUser(generateUser.GenerateUser());
        user = us[0];
        res.cookie('user', us[1]);
    }else {
        let user_bd = await users.findOne({
            where: {
                name: cookie
            }

        })
            .catch((err) => {
                console.log(err)
            });
        user = user_bd.dataValues.id;
    }

    let link_s = await links.findOne({
        attributes: ['shorty'],
        where: {
            url: link_original
        }
    })
        .catch((err) => {
            console.log(err)
        });

    if ((link_s === undefined) || (link_s === null)){
        link = await AddShorty(link_original, generateShorty.GenerateShorty(link_original), user);
    }else{
        link = link_s.dataValues.shorty;
    }


    res.render('index', {
        link: process.env.MY_SITE+link
    });
});

/**
 * @return {string}
 */
async function AddShorty(link_original, link, user) {
    let errLink = null;
    const li = await links.create({
        url: link_original,
        shorty: link,
        user_id: user,
        transitions: 0
    })
        .catch(async (err) => {
            console.log(err);
            errLink = await AddShorty(link_original, generateShorty.GenerateShorty(link_original), user);
        });
    if (!errLink) {
        return String(li.dataValues.shorty)
    } else return errLink;
}


async function AddUser(user) {
    let errUser = null;
    const us = await users.create({
        name: user
    })
        .catch(async (err) => {
            console.log(err);
            errUser = await AddUser(generateUser.GenerateUser());
        });
    if (!errUser) {
        return [ us.dataValues.id, us.dataValues.name]
    } else return errUser;
}

module.exports = router;
