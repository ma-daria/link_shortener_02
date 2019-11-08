/**
 * @return {string}
 */
function GenerateShorty(url) {
    let length = 7;
    let shorty = '';
    url.replace('https', '');
    url.replace('http', '');
    url.replace('/', '');
    url.replace('.', '');

    for (let i = 0; i < length; i++) {
        let id = Math.floor(Math.random() * url.length);

        shorty += url[id];
        url.replace(url[id], '');
    }
    return shorty;
}


module.exports.GenerateShorty = GenerateShorty;