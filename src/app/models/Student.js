module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    test1: DataTypes.FLOAT,
    test2: DataTypes.FLOAT,
    test3: DataTypes.FLOAT,
  })

  Student.associate = models => {
    Student.belongsTo(models.Class, { foreignKey: 'class_id', as: 'classInfo' })
    Student.belongsTo(models.User, { foreignKey: 'student_id', as: 'studentInfo' })
  }

  return Student
}
