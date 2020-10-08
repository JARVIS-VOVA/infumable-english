const crypt = require('../helpers/crypt')
const UserModel = require('../db/models').User

// TODO: Add email confirmation

module.exports = {
  async index() {
    const users = await UserModel.findAll()

    return { status: 200, data: users}
  },

  async create(params) {
    const user = await UserModel.create(params)

    return { status: 201, data: user }
  },
}
