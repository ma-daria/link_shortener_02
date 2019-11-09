const Link = require('../models/link');
const User = require('../models/user');

User.hasMany(Link, { foreignKey: 'user_id', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});
Link.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });


async function init () {

    // await User.sync({force:true});
    // await Link.sync({force:true});


    await User.sync();
    await Link.sync();

}

(async function f () {
    await init()
})();