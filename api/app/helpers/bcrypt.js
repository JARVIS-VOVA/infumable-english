const bcrypt = require('bcrypt')

const hashSync = password => {
  const salt = bcrypt.genSaltSync()

  return bcrypt.hashSync(password, salt)
}

const compareSync = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword)
}

module.exports = { hashSync, compareSync }
