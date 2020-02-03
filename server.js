import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import _configDotenv from './config/dotenv'
import { SUCCESS, DANGER } from './constants/colorsForConsole'

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes
const users = require('./app/user/routes')
const sessions = require('./app/session/routes')

app.use((req, res, next) => {
  showParams(SUCCESS, req)

  next()
})

app.use(users)
app.use(sessions)

// error handler
app.use((req, res, next) => {
  showParams(DANGER, req)

  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
})

app.listen(port, () => {
  console.log(SUCCESS, `Listening on ${port}`)
})

const showParams = (color, req) => {
  console.log(color, '###')
  console.log(color, req.url, req.method, req.body)
  console.log(color, '###')
}
