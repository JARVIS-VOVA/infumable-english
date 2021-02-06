const Sequelize = require('sequelize')

const { ENV } = process.env

const config = require('../config/db.config')[ENV]

const sequelizeLoader = async () => {
  const sequelize = new Sequelize(config.database, config.username, config.password, config)

  return await sequelize.authenticate()
}

module.exports = sequelizeLoader
