const ROUTES = require('../../../constants/routes')
const UserService = require('../../../services/user')
const middlewares = require('../../../middlewares')

module.exports = app => {
  app.get(ROUTES.USERS, middlewares.attachCurrentUser, async (req, res) => {
    const { status, data } = await UserService.index(req)

    res.status(status).json(data)
  })

  app.post(ROUTES.USERS, async (req, res) => {
    const userParams = req.body
    const { status, data } = await UserService.create(userParams)

    res.status(status).json(data)
  }),

  app.get(ROUTES.USERS, middlewares.attachCurrentUser, async (req, res) => {
    console.log('!!!!!!!!!', req.currentUser)
    console.log('!!!!!!!!!', req.currentUser)
    console.log('!!!!!!!!!', req.currentUser)
    const { status, data } = await UserService.show()

    res.status(status).json(data)
  })


  // app.get(ROUTES.SESSIONS, async (req, res) => {
  //   const { status, data } = await SessionService.get(req, res)

  //   res.status(status).json(data)
  // })
}


// function isValidId(req, res, next) {
//   if(!isNaN(req.params.id)) return next()
//   next(new Error('Invalid ID'))
// }

// function validUser(user) {
//   const hasLogin = typeof user.login == 'string' && user.login.trim() != ''
//   const hasPassword = typeof user.password == 'string' && user.password.trim() != ''
//   return hasLogin && hasPassword
// }

// function validUserUpdate(user) {
//   const hasLogin = user.login ? typeof user.login == 'string' && user.login.trim() != '' : true
//   const hasPassword = user.password
//     ? typeof user.password == 'string' && user.password.trim() != ''
//     : true
//   return hasLogin && hasPassword
// }

// router.get('/users', (req, res) => {
//   queries.users.index()
//     .then(users => {
//       res.json(users)
//     })
// })

// router.get('/users/:id', (req, res) => {
//   queries.users.show(req.params.id)
//     .then(user => {
//       res.json(user)
//     })
// })

// router.put('/users/:id', isValidId, (req, res, next) => {
//   if(validUserUpdate(req.body)) {
//     queries.users.update(req.params.id, req.body)
//       .then(users => {
//         res.json(users[0])
//       })
//   } else {
//     next(new Error('Invalid params'))
//   }
// })

// router.post('/users', (req, res) => {
//   if(validUser(req.body)) {
//     queries.users.create(req.body)
//       .then(results => {
//         res.send(results[0])
//       })
//   } else {
//     next(new Error('Invalid params'))
//   }
// })

// router.delete('/users/:id', isValidId, (req, res, next) => {
//   queries.users.delete(req.params.id)
//     .then(() => {
//       res.json({ deleted: true })
//     })
// })


// const User = require('../../sequelize/models/User')

// router.get('/users', async (req, res) => {
//   console.log('REQ');
//
//   // const users = await User.find({})
//
//   // console.log('REQ', users);
//
//   // res.render('index', {
//   //   title: 'Todos list',
//   //   isIndex: true,
//   //   users
//   // })
//
//   // res.json(users)
//
//   // queries.users.index()
//   //   .then(users => {
//   //     res.json(users)
//   //   })
// })
//
//
//
//
//
//
// module.exports = router
