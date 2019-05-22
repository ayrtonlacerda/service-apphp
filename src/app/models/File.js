module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    file: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    subtype: DataTypes.STRING,
  })

  return File
}