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
    var response = []
    let discInfo


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
          attributes: ['id', 'attribute', 'discipline_id'],
          as: 'classInfo',
        }
      ]
    })
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
        }
      ]
      console.log('response----------------------------------------------\n\n')
      console.log(response)
      console.log('----------------------------------------------\n\n')
    }

    /* studetsClass.some(async item => {
      discInfo = await Discipline.findOne({
        where: item.classInfo.discipline_id,
        include: [
          {
            model: User,
            attributes: ['name', 'email'],
            as: 'accountableInfo',
          }
        ]
      })

      console.log('discInfo----------------------------------------------\n\n')
      console.log(discInfo)
      console.log('----------------------------------------------\n\n')

      response = [
        ...response,
        {
          class: item.classInfo.attribute,
          classId: item.class_id,
          discipline: discInfo.name,
          disciplineId: discInfo.id,
          disciplineStart: discInfo.start,
          disciplineFinish: discInfo.finish,
          accountable: discInfo.accountableInfo.name,
          accountableEmail: discInfo.accountableInfo.email,
        }
      ]
      console.log('response----------------------------------------------\n\n')
      console.log(response)
      console.log('----------------------------------------------\n\n')

      count = count + 1;
      return count < studetsClass.length + 1;
    }) */

    console.log('teste de resposta 324r----------------------------------------------\n\n')
    console.log(response)
    console.log('----------------------------------------------\n\n')



    return res
      .status(200)
      .json({
        mensage: 'Matriculado com sucesso',
        data: response
      })
  }
}

module.exports = new StudentController()