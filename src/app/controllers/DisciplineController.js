const { Discipline, User, Course } = require('../models')

class DisciplineController {
  // cria nova disicplina
  async store(req, res) {
    const { name, accountable } = req.body
    const { authorization } = req.headers
    var disc = req.body


    const user = await User.findOne({ where: { token: authorization } })

    if (user.type === 'admin') {
      if (!accountable) {
        return res.status(400).json({ error: 'A disciplina precisa de um responsavel' })
      } else {
        const prof = await User.findByPk(accountable)
        if (prof.type !== 'prof') {
          return res.status(400).json({ error: 'O usuario não é um professor' })
        }
      }
    } else if (user.type === 'prof') {
      disc.accountable = user.id
    } else {
      return res.status(401).json({ error: 'O usuario sem autorização', user })
    }

    const query = await Discipline.findAll({ where: { name } })
    if (query.length !== 0) {
      return res.status(400).json({ error: 'Disicplina ja existente' })
    }

    const discipline = await Discipline.create(req.body)

    return res.status(200).json({ discipline, user })
  }

  // lista todas as disciplinas
  async index(req, res) {
    let filter = {}

    if (req.query.course) {
      filter = {
        course_id: req.query.course
      }
    }
    const discipline = await Discipline.findAll({
      where: filter,
      raw: true,
      nest: true,
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'id'],
          as: 'accountableInfo',
        },
        {
          model: Course,
          attributes: ['name', 'id'],
          as: 'courseInfo',
        }
      ]
    })
    var resDiscipline = {}

    /* discipline.map(async item => {
      const user = await User.findByPk(item.accountable)
      resDiscipline =
        {
          ...item,
          accountable: user,
        }
      console.log(resDiscipline)
    })
    console.log(resDiscipline) */

    return res.status(200).json(discipline)
  }

  // atualiza disciplina
  async update(req, res) {
    const id = req.params.id
    const discipline = await Discipline.findByPk(id)
    console.log(discipline, id)
    if (discipline === null) {
      return res
        .status(400)
        .json({ error: 'Disciplina inexistente' })
    }

    await Discipline.update(
      req.body, {
        where: { id }
      })

    return res
      .status(200)
      .json({ mensage: 'Disciplina atualizada com sucesso' })
  }
}

module.exports = new DisciplineController()