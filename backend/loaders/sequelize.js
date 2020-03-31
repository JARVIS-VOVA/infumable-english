const Sequelize = require('sequelize')

const sequalizeLoader = async () => {
  const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env

  const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    dialect: 'postgres',
    logging: false
  })

  return await sequelize.authenticate()
}

module.exports = sequalizeLoader
