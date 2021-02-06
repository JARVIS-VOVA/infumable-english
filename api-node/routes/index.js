const { Router } = require('express')

const middlewares = require('../app/middlewares')
const controllers = require('../app/controllers')
const ROUTES = require('../constants/routes')

const router = new Router()

router.post(ROUTES.SESSIONS, controllers.sessions.create)

router.get(ROUTES.USERS, controllers.users.index)
router.post(ROUTES.USERS, controllers.users.create)

router.get(ROUTES.CURRENT_USER, middlewares.attachCurrentUser, controllers.currentUser.show)

module.exports = router
