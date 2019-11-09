const sequelize = require('../lib/bdConnector');
const Sequelize = require('sequelize');

const  user = sequelize.define('user', {
    name: {
        type: Sequelize.STRING(700),
        unique: true
    }
});

module.exports = user;