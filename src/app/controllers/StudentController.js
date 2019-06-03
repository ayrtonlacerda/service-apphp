const { User, Student, Class, Discipline } = require('../models')

class StudentController {
  //adciona usuario a uma disciplina
  async store(req, res) {
    const { authorization } = req.headers
    const { code } = req.body
    let user
    // verifica se o usuario pode se matricular

    try {
      user = await User.findOne({
        where: {
          token: authorization
        }
      })
    } catch (error) {
      return res
        .status(500)
        .json({ mensage: 'SEVERAL ERROR', error })
    }

    console.log("\n\nUSer\n\n", user)
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

    // verifica se ja esta matriculado
    const studentExist = await Student.findAll({ where: { student_id: user.id } })
    console.log(studentExist)

    if (studentExist.length !== 0) {
      for (let i = 0; i < studentExist.length; i++) {
        const element = studentExist[i];
        if (element.class_id === classResult.id) {
          return res
            .status(400)
            .json({ error: 'Já esta matriculado' })
        }
      }
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
    var response = []
    let discInfo
    let user
    let queryUser = {}

    try {
      user = await User.findOne({
        where: {
          token: authorization
        },
      })
      if (!user) {
        return res
          .status(400)
          .json({ error: 'Usuario inexistente' })
      }
    } catch (error) {
      return res
        .status(500)
        .json({ mensage: 'SEVERAL ERROR - USER', error: error })
    }

    const studetsClass = await Student.findAll({
      where: {
        student_id: user.id,
      },
      raw: true,
      nest: true,
      require: true,
      include: [
        {
          model: Class,
          attributes: ['id', 'attribute', 'discipline_id'],
          as: 'classInfo',
        }
      ]
    })

    if (studetsClass.length === 0) {
      return res
        .status(206)
        .json({ mensage: 'Não esta matriculado em nenhuma turma' })
    }
    console.log('studetsClass----------------------------------------------\n\n')
    console.log(studetsClass)
    console.log('----------------------------------------------\n\n')

    for (let i = 0; i < studetsClass.length; i++) {
      discInfo = await Discipline.findOne({
        where: studetsClass[i].classInfo.discipline_id,
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
            as: 'accountableInfo',
          }
        ]
      })

      if (!discInfo) {
        return res
          .status(500)
          .json({ error: 'Error interno' })
      }

      console.log('discInfo----------------------------------------------\n\n')
      console.log(discInfo)
      console.log('----------------------------------------------\n\n')

      response = [
        ...response,
        {
          class: studetsClass[i].classInfo.attribute,
          classId: studetsClass[i].class_id,
          discipline: discInfo.name,
          disciplineId: discInfo.id,
          disciplineStart: discInfo.start,
          disciplineFinish: discInfo.finish,
          accountable: discInfo.accountableInfo.name,
          accountableEmail: discInfo.accountableInfo.email,
          test1: studetsClass[i].test1,
          test2: studetsClass[i].test2,
          test3: studetsClass[i].test3,
        }
      ]
      console.log('response----------------------------------------------\n\n')
      console.log(response)
      console.log('----------------------------------------------\n\n')
    }

    console.log('teste de resposta 324r----------------------------------------------\n\n')
    console.log(response)
    console.log('----------------------------------------------\n\n')


    return res
      .status(200)
      .json({
        total: response.length,
        data: response
      })

  }

  async show(req, res) {
    const { id } = req.params
    let arrayStudents = []
    let studentsOfClass
    try {
      studentsOfClass = await Student.findAll({ where: { class_id: id } })
      if (studentsOfClass.length === 0) {
        return res
          .status(200)
          .json(studentsOfClass)
      }
    } catch (error) {
      return res
        .status(500)
        .json({ mensage: 'SEVERAL ERROR - STUDENT!', error })
    }

    for (let i = 0; i < studentsOfClass.length; i++) {
      let user
      const element = studentsOfClass[i];
      user = await User.findByPk(element.student_id)
      arrayStudents = [
        ...arrayStudents,
        {
          name: user.name,
          email: user.email,
          id: user.id
        }

      ]
    }

    return res
      .status(200)
      .json(arrayStudents)

  }
}

module.exports = new StudentController()