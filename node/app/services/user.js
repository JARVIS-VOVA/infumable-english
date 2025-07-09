const crypt = require('../helpers/crypt')
const UserModel = require('../db/models').User

module.exports = {
  async index() {
    const users = await UserModel.findAll()

    return { status: 200, data: users}
  },

  async create(params) {
    console.log('params', params)
    const newParams = {
      ...params,
      // email: ''
    }

    // const user = await UserModel.create(newParams)
    // console.log('user', user)

    await UserModel.create(newParams)
      .then(result => {
        const user = result
        console.log('result ->', result)
        return { status: 201, data: user }
      })
      .catch(error => {
        console.log('error ->', error.message)
        return { status: 442, error: error.message }
      })
  },
}
