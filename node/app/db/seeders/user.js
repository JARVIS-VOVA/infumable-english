const bcrypt = require('../../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const hashedPassword = bcrypt.hashSync('password');

    return queryInterface.bulkInsert('Users', [{
      email: 'user@gmail.com',
      login: 'Mary Poppins',
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
