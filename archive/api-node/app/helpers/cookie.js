const EXPIRATION_ONE_HOUR = require('../../constants/expirationOneHour')

async function set(res, key, value) {
  const expires = new Date(new Date().getTime() + EXPIRATION_ONE_HOUR)

  await res.cookie(key, value, { expires })
}

async function reExpires(req, res, key) {
  const value = req.cookies[key]

  await set(res, key, value)
}

// res.clearCookie('token')

module.exports = { set, reExpires }
