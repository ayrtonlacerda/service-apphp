const { User, Discipline, Class } = require('./index')

module.exports = (sequelize, DataTypes) => {
  const ClassForUser = sequelize.define('ClassForUser', {})

  return ClassForUser
}