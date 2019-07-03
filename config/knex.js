import path from 'path'

const appDir = path.dirname(require.main.filename)

const config = require(appDir + '/config/knexfile');
const environment = process.env.NODE_ENV || 'development';

const environmentConfig = config[environment];

import knex from 'knex'
const connection = knex(environmentConfig);

module.exports = connection;
