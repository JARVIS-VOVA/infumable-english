const UserModel = require('../sequelize/models').User
const crypt = require('../helpers/crypt')
const cookie = require('../helpers/cookie')

const SessionService = {
  async create(req, res) {
    const { body } = req

    console.log('start finding user...')

    const user = await UserModel.findOne({
      where: { login: body.login }
    })

    console.log('finish. user ->', user)

    console.log('password', user.password)
    console.log('body', body)

    console.log('user.validPassword(body.password)', user.validPassword(body.password))

    if (user && user.validPassword(body.password)) {
      console.log('pass is VALID')
      const token = crypt.encrypt(user.id.toString())

      await cookie.set(res, 'token', token)

      return { status: 200, data: user }
    } else {
      return { status: 422, error: 'Request missing username or password param.' }
    }
  },
}

module.exports = SessionService
