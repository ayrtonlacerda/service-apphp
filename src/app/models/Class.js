module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    attribute: DataTypes.STRING,
    code: DataTypes.INTEGER,
    validity: DataTypes.DATE
  })

  Class.associate = models => {
    Class.belongsTo(models.Discipline, { foreignKey: 'discipline_id', as: 'disciplineInfo' })
  }

  return Class
}