module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: DataTypes.STRING,
    enable: DataTypes.BOOLEAN,
  })

  return Course
}