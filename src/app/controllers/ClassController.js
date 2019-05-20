const { Class, Discipline, User } = require('../models')

class ClassController {
  // criar classe
  async store(req, res) {
    const { attribute, discipline_id } = req.body
    const { authorization } = req.headers

    let min = Math.ceil(1000000);
    let max = Math.floor(10000000);
    const code = Math.floor(Math.random() * (max - min)) + min;
    console.log(code)

    const user = await User.findOne({ where: { token: authorization } })
    if (user.type === 'student') {
      return res.status(401).json({ error: 'Usuario não tem permissão' })
    }

    const query = await Class.findAll({ where: { attribute } })
    if (query.length !== 0) {
      query.map(item => {
        if (item.discipline_id === discipline_id)
          return res.status(400).json({ error: 'Classe ja existente', data: item })
      })
    }


    /* const user = await User.findByPk(accountable)
    if (user.type !== 'prof') {
      return res.status(400).json({ error: 'O usuario nao tem autorização pra ser um responsavel' })
    } */

    const classResult = await Class.create({ ...req.body, code })

    return res.status(200).json(classResult)
  }

  // lista classes
  async index(req, res) {
    let filter = {}

    if (req.query.discipline) {
      filter = {
        discipline_id: req.query.discipline
      }
    }

    const classes = await Class.findAll({
      where: filter,
      raw: true,
      nest: true,
      include: [
        {
          model: Discipline,
          attributes: ['name', 'accountable', 'id', 'course_id', 'start', 'finish'],
          as: 'disciplineInfo',
        },
      ]
    })

    return res.status(200).json(classes)
  }

  // atualiza class
  async update(req, res) {
    const id = req.params.id
    const classResult = await Class.findByPk(id)
    console.log(classResult, id)
    if (classResult === null) {
      return res
        .status(400)
        .json({ error: 'Classe inexistente' })
    }

    await Class.update(
      req.body, {
        where: { id }
      })

    return res
      .status(200)
      .json({ mensage: 'Class atualizada com sucesso' })
  }
}

module.exports = new ClassController()