const sequelize = require('../lib/bdConnector');
const Sequelize = require('sequelize');

const  link = sequelize.define('link', {
    url: {
        type: Sequelize.STRING(700),
        unique: true
    },

    shorty: {
        type: Sequelize.STRING(700),
        unique: true
    },

    user_id: {
        type: Sequelize.INTEGER,
    },

    transitions: {
        type: Sequelize.INTEGER,
    }
});

module.exports = link;