module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.STRING,
    token: DataTypes.STRING,
    validity: DataTypes.DATE
  })

  return User
}