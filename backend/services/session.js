const UserModel = require('../sequelize/models').User
const crypt = require('../helpers/crypt')
const cookie = require('../helpers/cookie')

const SessionService = {
  async create(req, res) {
    const { body } = req

    console.log('!!!!!!!1')
    console.log('!!!!!!!1')
    console.log('!!!!!!!1')
    console.log('!!!!!!!1')
    const user = await UserModel.findOne({
      where: { login: body.login }
    })
    console.log('!!!!!!!2')
    console.log('!!!!!!!2')
    console.log('!!!!!!!2')
    console.log('!!!!!!!2')
    console.log('!!!!!!!2')

    if (user && user.validPassword(body.password)) {
      const token = crypt.encrypt(user.id.toString())

      await cookie.set(res, 'token', token)

      return { status: 200, data: user }
    } else {
      return { status: 422, error: 'Request missing username or password param.' }
    }
  },
}

module.exports = SessionService