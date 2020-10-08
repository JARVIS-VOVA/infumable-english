const UserModel = require('../db/models').User
const crypt = require('../helpers/crypt')
const cookie = require('../helpers/cookie')

const SessionService = {
  async create(require, response) {
    const { login, password } = require.body

    const user = await UserModel.findOne({
      where: { login: login }
    })

    if (user && user.validPassword(password)) {
      const token = crypt.encrypt(user.id.toString())

      await cookie.set(response, 'token', token)

      return { status: 200, data: user }
    } else {
      return { status: 422, error: 'Request missing username or password param.' }
    }
  },
}

module.exports = SessionService
