const { UserService } = require('../services')

const index = async (request, response) => {
  const { status, data } = await UserService.index()

  response.status(status).json(data)
}

const create = async (request, response) => {
  const userParams = request.body
  const { status, data, error } = await UserService.create(userParams)

  response.status(status).json(data || error)
}

module.exports = {
  index,
  create,
}
