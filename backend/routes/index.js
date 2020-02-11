const { Router } = require('express')

const session = require('./api/v1/session')
const user = require('./api/v1/user')
const currentUser = require('./api/v1/currentUser')

const app = Router()

module.exports = () => {
  session(app)
  user(app)
  currentUser(app)

  return app
}
