const databaseConfig = require('../../config/database')
const knex = require('knex')(databaseConfig)
//const Form = require('../models/Forms')


class FormController {
  // cria uma tabela de form
  async store(req, res) {
    console.log(req.body)
    const form = req.body
    // console.log(knex.schema)

    // verifica se ja existe uma tabela caso contrario cria uma
    const table = knex.schema.hasTable(form.tableName).then(function (exists) {
      if (!exists) {
        return knex.schema.createTable(form.tableName, function (t) {
          t.increments();
          t.timestamps();
        });
      }
    });

    form.columns.map(async item => {
      if (item.type === 'text') {
        await knex.schema.table(form.tableName, function (table) {
          table.string(item.data_name)
        })
      }
      if (item.type === 'date') {
        await knex.schema.table(form.tableName, function (table) {
          table.date(item.data_name)
        })
      }
    })

    return res.json(table)
  }

  async createForm(req, res) {
    const form = {
      name: 'tabela',
      id_table: 6723,
    }

    //console.log(Form)
    // const f = await Form.create(form)
    //console.log(f)
    return res.send('ok')
  }
}

module.exports = new FormController()