/**
 * Герерация пользователя
 * @returns {string} - токен пользовотеля
 * @constructor
 */
function GenerateUser(){
    let d = new Date();
    return   'user_'+ String(Math.floor(Math.random() * 100000)) + '_' + d.toISOString()
}

module.exports.GenerateUser = GenerateUser;