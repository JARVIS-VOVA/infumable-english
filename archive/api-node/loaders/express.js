const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const routes = require('../routes')
const { SUCCESS, ERROR } = require('../constants/colorsForConsole')

const { FRONTEND_URL, FRONTEND_PORT } = process.env

module.exports = async ({ app }) => {

  const corsOptions = {
    origin: FRONTEND_URL + ':' + FRONTEND_PORT,
    // optionsSuccessStatus: 200,
    credentials: true,
  }

  app.use(cors(corsOptions))
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use((req, res, next) => {
    console.log(SUCCESS, req.method + ' ' + req.url)
    // const expireTime = req.session.cookie.expires // / 1000
    // console.log(SUCCESS, 'Expired time: ' + expireTime)

    next()
  })

  app.use(routes)

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
