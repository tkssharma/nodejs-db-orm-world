const knex = require('knex');

const knexFile = require('../knexfile');

const env = process.env.NODE_ENV || 'development';
const options = knexFile[env];

module.exports = knex(options);