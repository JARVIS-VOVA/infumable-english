const { ERROR } = require('../../constants/colorsForConsole')
const crypt = require('../helpers/crypt')
const UserModel = require('../db/models').User

module.exports = async (req, res, next) => {
  const { token } = req.cookies

  if (token) {
    const id = crypt.decrypt(token)
    const currentUser = await UserModel.findOne({ where: { id } })

    if (currentUser) {
      req.currentUser = currentUser

      return next()
    }
  }

  console.log(ERROR, '🔥 Error attaching user to req')
  // new Error('Error attaching user to req')

  return res.status(422).json({ error: 'Error attaching user to req' })
}
