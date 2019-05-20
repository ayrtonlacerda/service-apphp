module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define('Form', {
    table_name: DataTypes.STRING,
    enable: DataTypes.BOOLEAN,
    validity: DataTypes.DATE,
    data: DataTypes.JSON
  })

  Form.associate = models => {
    Form.belongsTo(models.Discipline, { foreignKey: 'discipline_id', as: 'disciplineInfo' })
  }
  return Form
}