module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'user@gmail.com',
      login: 'Mary Poppins',
      password: 'password',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
