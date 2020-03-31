const ROUTES = require('../../../constants/routes')
const SessionService = require('../../../services/session')
const middlewares = require('../../../middlewares')

module.exports = app => {
  app.post(ROUTES.SESSIONS, async (req, res) => {
    const { status, data, error } = await SessionService.create(req, res)

    res.status(status).json(data || error)
  })
}
