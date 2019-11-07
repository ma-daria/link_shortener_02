const sequelize = require('../lib/bdConnector');
const Sequelize = require('sequelize');

const  link = sequelize.define('link', {
    url: {
        type: Sequelize.STRING(3000),
    },

    shorty: {
        type: Sequelize.STRING(3000),
    },

    autor: {
        type: Sequelize.STRING(3000),
    },

    transitions: {
        type: Sequelize.INTEGER,
    }
});

module.exports = link;