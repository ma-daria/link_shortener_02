const Link = require('../models/link');

async function init () {
    // await Link.sync({force:true});

    await Link.sync();
}

(async function f () {
    await init()
})();