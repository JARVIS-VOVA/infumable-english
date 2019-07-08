exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          email: 'example@gmail.com',
          login: 'MaryPoppins',
          password: 'password',
          createdAt: new Date()
        }
      ])
    })
}
