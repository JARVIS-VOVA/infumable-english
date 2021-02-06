const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env

const defaultConfig = {
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  dialect: 'postgres',
  // operatorsAliases: Sequelize.Op
}

const dbConfig = {
  development: {
    ...defaultConfig
  },
  test: {
    ...defaultConfig,
    database: 'test_db',
    password: 'null',
    logging: false,
  },
  production: {
    ...defaultConfig,
    database: 'production_db',
  },
  staging: {
    ...defaultConfig,
    database: 'staging_db',
  }
}

module.exports = dbConfig
