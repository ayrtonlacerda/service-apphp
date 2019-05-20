const { User, Student, Class, Discipline } = require('../models')

class StudentController {
  //adciona usuario a uma disciplina
  async store(req, res) {
    const { authorization } = req.headers
    const { code } = req.body

    // verifica se o usuario pode se matricular
    const user = await User.findOne({
      where: {
        token: authorization
      }
    })
    if (!user) {
      return res
        .status(400)
        .json({ error: 'Usuario inexistente' })
    } else if (user.type !== 'student') {
      return res
        .status(401)
        .json({ error: 'So alunos podem se matricular' })
    }

    // verifica existencia da turma
    const classResult = await Class.findOne({ where: { code } })

    if (!classResult) {
      return res
        .status(400)
        .json({ error: 'Classe inexistente' })
    }

    const student = await Student.create({
      class_id: classResult.id,
      student_id: user.id
    })

    return res
      .status(200)
      .json({ mensage: 'Success', data: student })

  }

  async index(req, res) {
    const { authorization } = req.headers

    const user = await User.findOne({
      where: {
        token: authorization
      },
    })
    if (!user) {
      return res
        .status(400)
        .json({ error: 'Usuario inexistente' })
    }

    const studetsClass = await Student.findAll({
      where: {
        student_id: user.id
      },
      raw: true,
      nest: true,
      require: true,
      include: [
        {
          model: Class,
          attributes: [],
          as: 'classInfo',
        }
      ]
    })

    return res
      .status(200)
      .json({
        mensage: 'Matriculado com sucesso',
        data: studetsClass
      })
  }
}

module.exports = new StudentController()