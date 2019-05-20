import knex from '../../config/knex'

module.exports = {
  users: {
    index: function() {
      return knex('users')
    },
    show: function(id) {
      return knex('users').where('id', id).first()
    },
    create: function(user) {
      return knex('users').insert(user, '*')
    },
    update: function(id, user) {
      return knex('users').where('id', id).update(user)
    },
    delete: function(id) {
      return knex('users').where('id', id).del()
    }
  }
}
