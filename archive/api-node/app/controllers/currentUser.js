const { CurrentUserService } = require('../services')

const show = async (request, response) => {
  const { status, data, error } = await CurrentUserService.show(request)

  response.status(status).json(data || error)
}

module.exports = {
  show,
}
