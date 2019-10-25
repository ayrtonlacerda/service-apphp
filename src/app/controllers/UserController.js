const { User, Class, Student } = require('../models')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

class UserController {
  // cria um novo usuario
  async store(req, res) {
    const { email, type, name } = req.body
    const password = req.body.password_hash
    const { authorization } = req.headers
    let token
    let password_hash

    if (type === 'prof') {
      if (authorization) {
        try {
          const admin = await User.findOne({ where: { token: authorization } })
          console.log('\n\nteste admin\n\n', admin)
          if (admin !== null) {
            if (admin.type !== 'admin') {
              return res.status(401).json({ error: ' Usuario não tem permissão de cadastrar professor' })
            }
          }
        } catch (error) {
          return res.status(500).json({ error: 'Error Interno' })
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

    if (password) {
      token = crypto.randomBytes(32).toString('hex')
      password_hash = bcrypt.hashSync(password, 8)
    } else {
      return res.status(400).json({ error: 'É necessario senha' })
    }
    console.log(token)
    console.log(password_hash)

    const createUser = {
      name,
      email,
      type,
      token,
      password_hash,
      validity: true
    }
    try {
      const user = await User.create(createUser)

      return res.status(200).json({
        mensage: "Cadastrado com sucesso",
        user: {
          name,
          email,
          type,
          validity: true
        }
      })
    } catch (error) {
      return res.status(500).json({ "ERROR_CREATE_USER": error, createUser })
    }

  }

  async test(req, res) {
    return res.status(200).json({ mensage: 'Temos uma conexão com CI/CL' })
  }

  // lista todos os usuarios
  async index(req, res) {
    const { dev } = req.headers;
    let responseUser = [];

    try {
      const users = await User.findAll({})
      console.log({ user: users[0].id })
      users.map(user => {
        responseUser = [
          ...responseUser,
          {
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            validity: user.validity,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          }
        ]
      })
      console.log({ responseUser })
      if (dev) {
        return res.status(200).json(users)
      }
      return res.status(200).json(responseUser)
    } catch (error) {
      return res.status(500).json({ "ERROR LIST USER": error })
    }
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
    }
    const password_hash2 = await bcrypt.hash(password, 8)
    console.log({})
    console.log({ password_hash: user.password_hash })
    console.log('--- \n')
    console.log({ password_hash2: password_hash2 })

    try {
      const validity = await bcrypt.compare(password, user.password_hash)
      const validity2 = bcrypt.compareSync(password, user.password_hash)

      console.log({ validity2, validity })

      if (!validity2) {
        return res
          .status(400)
          .json({
            error: 'Senha incorreta!'
          })
      }
    } catch (error) {
      return res
        .status(500)
        .json({
          "ERROR_HASH": error
        })
    }


    return res
      .status(200)
      .json({
        name: user.name,
        email: user.email,
        token: user.token,
        id: user.id,
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
