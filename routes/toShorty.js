let express = require('express');
let router = express.Router();
const links = require('../database/models/link');
const users = require('../database/models/user');

/**
 * роутер для страницы 'toShorty'.
 */
router.get('/', async function(req, res) {
    let  link_original = req.query.link;
    let cookie = req.cookies.user;
    let us = await cheackCookie(cookie);
    if (us[1] !== '') {
        res.cookie('user', us[1]);
    }

    let link = await toShorty(link_original, us[0]);


    res.render('index', {
        link: process.env.MY_SITE+link
    });
});

/**
 * Проверка пользователя
 * @param cookie - куки браузера
 * @returns {Promise<*[]>}  - [id пользователя, токен пользователя]
 */
async function cheackCookie(cookie){
    let user;
    if (cookie === undefined){
        return await AddUser(GenerateUser());
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
        return [user, '']
    }
}

/**
 * перевод длинной ссылки в короткую
 * @param link_original - динная сслыка
 * @param user - id пользователя
 * @returns {Promise<*>} - короткая ссылка
 */
async function toShorty(link_original, user){
    if (link_original.indexOf('http://') === -1 && link_original.indexOf('https://') === -1 ){
        link_original = 'http://'+link_original;
    }
    let link = '';


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
        link = await AddShorty(link_original, GenerateShorty(link_original), user);
    }else{
        link = link_s.dataValues.shorty;
    }
    return link
}

/**
 * Генерация короткой ссылке на основе исходной
 * @param link - исходная ссылка
 * @returns {string} - короткая ссыла
 */
function GenerateShorty(link) {
    let length = 7;
    let shorty = '';
    link = link.replace('https://', '');
    link = link.replace('http://', '');
    link = link.replace(/\//g, '');
    link = link.replace(/\./g, '');
    for (let i = 0; i < length; i++) {
        let id = Math.floor(Math.random() * link.length);
        shorty += link[id];
    }
    return shorty;
}

/**
 * Добавление ссылки в базу
 * @param link_original - длинная ссылка
 * @param link - короткая ссылка
 * @param user - id пользователья
 * @returns {Promise<string|*>} - короткая ссылка
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
            errLink = await AddShorty(link_original, GenerateShorty(link_original), user);
        });
    if (!errLink) {
        return String(li.dataValues.shorty)
    } else return errLink;
}

/**
 * Герерация пользователя
 * @returns {string} - токен пользовотеля
 */
function GenerateUser(){
    let d = new Date();
    return   'user_'+ String(Math.floor(Math.random() * 100000)) + '_' + d.toISOString()
}

/**
 * Добавление пользоватля в базу
 * @param user - токен пользователя
 * @returns {Promise<*[]|*>} -  [id пользователя, токен пользователя]
 */
async function AddUser(user) {
    let errUser = null;
    const us = await users.create({
        name: user
    })
        .catch(async (err) => {
            console.log(err);
            errUser = await AddUser(GenerateUser());
        });
    if (!errUser) {
        return [ us.dataValues.id, us.dataValues.name]
    } else return errUser;
}

module.exports = router;
