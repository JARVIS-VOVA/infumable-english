const bcrypt = require('../../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: user => {
        user.password = bcrypt.hashSync(user.password)
      }
    }
  })

  // User.associate = function(models) {
  // }

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  return User
}
