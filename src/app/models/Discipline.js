module.exports = (sequelize, DataTypes) => {
  const Discipline = sequelize.define('Discipline', {
    name: DataTypes.STRING,
    accountable: DataTypes.INTEGER,
    start: DataTypes.DATE,
    finish: DataTypes.DATE,
  })

  Discipline.associate = models => {
    Discipline.belongsTo(models.Course, { foreignKey: 'course_id', as: 'courseInfo' })
    Discipline.belongsTo(models.User, { foreignKey: 'accountable', as: 'accountableInfo' })
  }

  return Discipline
}