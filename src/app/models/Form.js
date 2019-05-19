module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define('Form', {
    table_name: DataTypes.STRING,
    id_table: DataTypes.INTEGER,
  })

  return Form
}