const databaseConfig = require('../../config/database')
const knex = require('knex')(databaseConfig)
const { Form, User, Discipline } = require('../models')

const multerConfig = require('../../config/multer')
const upload = require('multer')(multerConfig)

class TestController {

  // teste e o usuario
  async show(req, res) {
    const { test } = req.body;
    const { id } = req.params;
    const { authorization } = req.headers;

    let user
    let testUser = []

    if (!authorization) {
      return res
        .status(400)
        .json({ mensage: 'Acesso negado' })
    }

    try {
      user = await User.findOne({ where: { token: authorization } })
      if (!user) {
        return res
          .status(400)
          .json({ mensage: 'Usuario inexistente' })
      }

      if (user.type === 'student') {
        return res
          .status(401)
          .json({ mensage: 'Usuario não tem authorização' })
      }
    } catch (error) {
      return res
        .status(500)
        .json({ mensage: 'SEVERAL ERROR - USER', error })
    }

    try {
      user = await User.findOne({ where: { token: id } })
      if (!user) {
        return res
          .status(400)
          .json({ mensage: 'Consultar Usuario inexistente' })
      }
    } catch (error) {
      return res
        .status(500)
        .json({ mensage: 'SEVERAL ERROR - USER', error })
    }


    try {
      const table = await knex.schema.hasTable(test)
      console.log('\n\n', table, '\n\n')
      if (!table) {
        return res
          .status(400)
          .json({ error: 'Teste inexistente' })
      }
    } catch (error) {
      return res
        .status(500)
        .json({ mensage: 'SEVERAL ERROR - TEST', error })
    }

    try {
      testUser = await knex(test).where({ student_id: user.id })
    } catch (error) {
      return res
        .status(500)
        .json({ mensage: 'SEVERAL ERROR - TEST', error })
    }

    if (testUser.length === 0) {
      return res
        .status(400)
        .json({ error: 'Não ha testes para o usuario' })
    }

    return res
      .status(200)
      .json(testUser[0])
  }
}

module.exports = new TestController()