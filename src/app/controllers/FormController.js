const databaseConfig = require('../../config/database')
const knex = require('knex')(databaseConfig)
const { Form, User, Discipline } = require('../models')


class FormController {
  // cria uma tabela de form
  async store(req, res) {
    console.log(req.body)
    const form = req.body
    const { authorization } = req.headers

    const user = await User.findOne({
      where: {
        token: authorization,
      }
    })

    if (!user) {
      return res.status(200).json({
        mensage: 'Você tem que esta logado para cadastrar formularios'
      })
    } else if (user.type === 'student') {
      return res.status(200).json({
        mensage: 'Usuario não autorizado'
      })
    }

    var formResult
    // console.log(knex.schema)

    const query = await Form.findAll({
      where: {
        discipline_id: form.discipline
      }
    })

    console.log('minha query -->', query)

    if (query.length !== 0) {
      query.map(item => {
        if (item.table_name === form.form_name) {
          return res.status(400).json({ mensage: 'Ja existe esse teste para essa disciplina' })
        }
      })
    } else {
      console.log('---------------------------------------------')
      const queryDiscipline = await Discipline.findByPk(form.discipline)
      if (!queryDiscipline) {
        return res.status(400).json({
          error: 'Não existe a disciplina'
        })
      }

      formResult = await Form.create({
        table_name: form.form_name,
        enable: true,
        discipline_id: form.discipline,
        data: form
      })
      console.log('---------------------fiz a relaçao------------------------')
      const table = knex.schema.hasTable(form.form_name).then(function (exists) {
        if (!exists) {
          return knex.schema.createTable(form.form_name, function (t) {
            t.increments();
            t.timestamps();
          });
        }
      });

      form.steps.map(step => {
        step.components.map(async component => {

          if (component.component_type === 'text' || component.component_type === 'scanner' || component.component_type === 'camera') {
            await knex.schema.table(form.form_name, function (table) {
              table.string(component.data_name)
            })
          }
          if (component.component_type === 'date') {
            await knex.schema.table(form.form_name, function (table) {
              table.date(component.data_name)
            })
          }
        })
      })
      console.log('---------------------construiu tabela------------------------')
    }
    // verifica se ja existe uma tabela caso contrario cria uma



    return res.status(200).json({ mensage: 'Sucesso', data: formResult })
  }

  async index(req, res) {
    let filter = {}
    if (req.query.discipline) {
      filter = {
        discipline_id: req.query.discipline
      }
    }

    const forms = await Form.findAll({
      where: filter
    })

    //console.log(Form)
    // const f = await Form.create(form)
    //console.log(f)
    return res.status(200).json(forms)
  }

  async update(req, res) {
    const id = req.params.id
    const forms = await Form.findByPk(id)
    if (!forms) {
      return res
        .status(400)
        .json({ error: 'Formulario inexistente' })
    }

    await Form.update(req.body, {
      where: { id }
    })

    return res
      .status(200)
      .json({ mensage: 'Formulario atualizado com sucesso' })
  }


}

module.exports = new FormController()