const UserModel = require('../db/models').User
const crypt = require('../helpers/crypt')
const cookie = require('../helpers/cookie')

module.exports = {
  async show(request) {
    const { currentUser } = request

    if (currentUser) {
      return { status: 200, data: currentUser}
    } else {
      return { status: 422, error: 'current user not found' }
    }
  },
}
