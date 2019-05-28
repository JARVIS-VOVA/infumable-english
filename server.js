import express from 'express'
import bodyParser from 'body-parser'

import _configDotenv from './config/dotenv'
import { SUCCESS } from './constants/colorsForConsole'

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes
const users = require('./app/user/routes')

app.use(users)

// error handler
app.use((req, res, next) => {
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
