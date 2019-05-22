const { User, Class, Student } = require('../models')
const crypto = require('crypto')

class UserController {
  // cria um novo usuario
  async store(req, res) {
    const { email, type } = req.body
    const { authorization } = req.headers
    let token

    if (type === 'prof') {
      if (authorization) {
        const admin = await User.findOne({ where: { authorization } })
        if (admin !== null) {
          if (admin.type !== 'admin') {
            return res.status(401).json({ error: ' Usuario não tem permissão de cadastrar professor' })
          }
        }
      } else {
        return res.status(401).json({ error: 'Precisa de um usuario admin' })
      }
    }



    // so admin pode adcionar prof
    const userResult = await User.findOne({ where: { email } })
    if (userResult !== null) {
      // adicionar nova turma        
      return res.status(400).json({ error: 'Usuario ja cadastrado' })
    }

    token = crypto.randomBytes(32).toString('hex')

    console.log(token)
    const user = await User.create({ ...req.body, token })

    return res.status(200).json({
      mensage: "Cadastrado com sucesso",
      user
    })
  }

  async test(req, res) {
    return res.status(200).json({ mensage: 'Temos uma conexão com CI/CL' })
  }

  // lista todos os usuarios
  async index(req, res) {
    const users = await User.findAll({})

    return res.status(200).json(users)
  }

  async login(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res
        .status(400)
        .json({
          error: 'Usuario inexistente'
        })
    } else if (user.password_hash !== password) {
      return res
        .status(400)
        .json({
          error: 'Senha incorreta!'
        })
    }

    return res
      .status(200)
      .json({
        name: user.name,
        email: user.email,
        token: user.token
      })
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

    return res.status(200).json({ mensage: 'Usuario atualizado com sucesso!!' })
  }
}

module.exports = new UserController()