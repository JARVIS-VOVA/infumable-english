import express from 'express'

import queries from './queries'

const router = express.Router()

function isValidId(req, res, next) {
  if(!isNaN(req.params.id)) return next()
  next(new Error('Invalid ID'))
}

function validUser(user) {
  const hasLogin = typeof user.login == 'string' && user.login.trim() != ''
  const hasPassword = typeof user.password == 'string' && user.password.trim() != ''
  return hasLogin && hasPassword
}

function validUserUpdate(user) {
  const hasLogin = user.login ? typeof user.login == 'string' && user.login.trim() != '' : true
  const hasPassword = user.password
    ? typeof user.password == 'string' && user.password.trim() != ''
    : true
  return hasLogin && hasPassword
}

router.get('/users', (req, res) => {
  queries.users.index()
    .then(users => {
      res.json(users)
    })
})

router.get('/users/:id', (req, res) => {
  queries.users.show(req.params.id)
    .then(user => {
      res.json(user)
    })
})

router.put('/users/:id', isValidId, (req, res, next) => {
  if(validUserUpdate(req.body)) {
    queries.users.update(req.params.id, req.body)
      .then(users => {
        res.json(users[0])
      })
  } else {
    next(new Error('Invalid params'))
  }
})

router.post('/users', (req, res) => {
  if(validUser(req.body)) {
    queries.users.create(req.body)
      .then(results => {
        res.send(results[0])
      })
  } else {
    next(new Error('Invalid params'))
  }
})

router.delete('/users/:id', isValidId, (req, res, next) => {
  queries.users.delete(req.params.id)
    .then(() => {
      res.json({ deleted: true })
    })
})

module.exports = router
