const { User } = require('../models')

class UserController {
  // cria um novo usuario
  async store(req, res) {
    const user = await User.create(req.body)

    return res.status(200).json(user)
  }

  async test(req, res) {
    return res.status(200).json({ mensage: 'Voce tem uma conexão muito bem sucedida' })
  }

  // lista todos os usuarios
  async index(req, res) {
    const users = await User.findAll({})

    return res.status(200).json(users)
  }

  // atualiza usuario
  async update(req, res) {
    const id = req.params.id
    const query = await User.findByPk(id)

    if (query === null) {
      return res
        .status(400)
        .json({ error: 'Usuario ja exite' })
    }

    await User.update(req.body, { where: { id } })

    return res.status(200).json({ mensage: 'Usuario atualizado com sucesso' })
  }
}

module.exports = new UserController()