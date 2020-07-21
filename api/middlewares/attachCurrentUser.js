const { ERROR } = require('../constants/colorsForConsole')
const crypt = require('../helpers/crypt')
const UserModel = require('../sequelize/models').User

module.exports = async (req, res, next) => {
  const { token } = req.cookies

  if (token) {
    const id = crypt.decrypt(token)
    const currentUser = await UserModel.findOne({ where: { id } })
    // console.log('currentUser: ', currentUser.validPassword('password'))

    if (currentUser) {
      req.currentUser = currentUser

      return next()
    }
  }

  console.log(ERROR, '🔥 Error attaching user to req')
  // new Error('Error attaching user to req')
  // next()

  return res.status(422).json({ error: 'Error attaching user to req' })
}
