const expressLoader = require('./express')
const sequelizeConnect = require('./sequelize')
const { SUCCESS, ERROR  } = require('../constants/colorsForConsole')

const loaders = async ({ expressApp }) => {
  await sequelizeConnect()
    .then(() => console.log(SUCCESS, 'Connection to postgress has been established successfully.'))
    .catch(error => console.log(ERROR, 'Unable to connect to the database: ' + error))

  await expressLoader({ app: expressApp })
    .then(() => console.log(SUCCESS, 'Express intialized'))
    .catch(error => console.log(ERROR, error))
}

module.exports = loaders
