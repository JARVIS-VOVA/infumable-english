const UserModel = require('../sequelize/models').User
const crypt = require('../helpers/crypt')
const cookie = require('../helpers/cookie')

module.exports = {
  async show(req, res) {
    const { currentUser } = req

    if (currentUser) {
      // await cookie.reExpires(req, res, 'token')
      return { status: 200, data: currentUser}
    } else {
      return { status: 422 }
    }
  },
}
