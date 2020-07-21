const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
// const session = require('express-session')

const UserModel = require('../sequelize/models').User
const crypt = require('../helpers/crypt')
const routes = require('../routes')
const { SUCCESS, ERROR } = require('../constants/colorsForConsole')

const { FRONTEND_URL, FRONTEND_PORT } = process.env

console.log('FRONTEND_URL, FRONTEND_PORT', FRONTEND_URL, FRONTEND_PORT)

module.exports = async ({ app }) => {

  const corsOptions = {
    origin: FRONTEND_URL + ':' + FRONTEND_PORT,
    // optionsSuccessStatus: 200,
    credentials: true,
  }

  app.use(cors(corsOptions))
  app.use(cookieParser())

  // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
  // This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
  // app.use('', async (req, res, next) => {

  // })

  // app.use(attachCurrentUser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use((req, res, next) => {
    console.log(SUCCESS, req.method + ' ' + req.url)
    // const expireTime = req.session.cookie.expires // / 1000

    // console.log(SUCCESS, 'Expired time: ' + expireTime)

    next()
  })

  app.use(routes())

  // error handler
  app.use((req, res, next) => {
    console.log(ERROR, req.method + ' ' + req.url)

    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  app.use((err, req, res) => {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
    })
  })

  return app
}
