const ROUTES = require('../../../constants/routes')
const CurrentUserService = require('../../../services/currentUser')
const middlewares = require('../../../middlewares')

module.exports = app => {
  app.get(ROUTES.CURRENT_USER, middlewares.attachCurrentUser, async (req, res) => {
    const { status, data } = await CurrentUserService.show(req)

    res.status(status).json(data)
  })
}
