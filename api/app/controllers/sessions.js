const { SessionService } = require('../services')

const create = async (request, response) => {
  const { status, data, error } = await SessionService.create(request, response)

  response.status(status).json(data || error)
}

module.exports = {
  create,
}
