/**
 * @return {string}
 */
function GenerateShorty(link) {
    let length = 7;
    let shorty = '';
    link = link.replace('https', '');
    link = link.replace('http', '');
    link = link.replace(/\//g, '');
    link = link.replace(/\./g, '');

    for (let i = 0; i < length; i++) {
        let id = Math.floor(Math.random() * link.length);

        shorty += link[id];
        // link = link.replace(link[id], '');
    }
    return 'http://localhost:3000/'+shorty;
}


module.exports.GenerateShorty = GenerateShorty;