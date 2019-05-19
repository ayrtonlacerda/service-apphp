const { Discipline, User, Course } = require('../models')

class DisciplineController {
  // cria nova disicplina
  async store(req, res) {
    const { name, accountable } = req.body
    const query = await Discipline.findAll({ where: { name } })
    if (query.length !== 0) {
      return res.status(400).json({ error: 'Disicplina ja existente' })
    }
    const user = await User.findByPk(accountable)
    if (user.type !== 'prof') {
      return res.status(400).json({ error: 'O usuario nao tem autorização pra ser um responsavel' })
    }
    const discipline = await Discipline.create(req.body)

    return res.status(200).json(discipline)
  }

  // lista todas as disciplinas
  async index(req, res) {
    const discipline = await Discipline.findAll({
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