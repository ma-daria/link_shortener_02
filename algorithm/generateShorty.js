/**
 * Генерация короткой ссылке на основе исходной
 * @param link - исходная ссылка
 * @returns {string} - короткая ссыла
 * @constructor
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

module.exports.GenerateShorty = GenerateShorty;