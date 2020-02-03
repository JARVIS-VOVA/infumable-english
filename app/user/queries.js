import knex from '../../config/knex'

module.exports = {
  users: {
    create: function(user) {
      return knex('users').insert({ ...user, createdAt: new Date() }, '*')
    },
    findByEmail: email => {
      return knex('users').where('email', email).first()
    },
    findByEmailOrLogin: (email, login) => {
      return knex('users')
        .where('email', email)
        .orWhere('login', login)
        .first()
    }
  }
}
