const databaseConfig = require('../../config/database')
const knex = require('knex')(databaseConfig)
const { Form, User, Discipline } = require('../models')

const multerConfig = require('../../config/multer')
const upload = require('multer')(multerConfig)

var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var path = require('path');
var ImageModule = require("docxtemplater-image-module");


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
      return res.status(401).json({
        mensage: 'Você tem que esta logado para cadastrar formularios'
      })
    } else if (user.type === 'student') {
      return res.status(401).json({
        mensage: 'Usuario não autorizado'
      })
    }

    var formResult
    // console.log(knex.schema)

    const query = await Form.findAll({
      where: {
        discipline_id: form.discipline,
        table_name: form.form_name
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
      const table = await knex.schema.hasTable(form.form_name)
      if (!table) {
        await knex.schema.createTable(form.form_name, function (t) {
          t.increments()
          t.integer('student_id')
          t.timestamps()
        })
      } else {
        return res
          .status(400)
          .json({ error: 'O testes tem nome unico!' })
      }
      console.log('---------------------construiu tabela------------------------')

      var schemaTable = []
      form.steps.map(step => {
        step.components.map(async component => {
          if (component.component_type === 'camera' || component.component_type === 'croqui') {
            schemaTable = [
              ...schemaTable,
              {
                name: component.data_name,
                type: 'array'
              },
              {
                name: `leg_${component.data_name}`,
                type: 'integer'
              }
            ]
          }

          if (component.component_type === 'text' ||
            component.component_type === 'scanner' ||
            component.component_type === 'ocr' ||
            component.component_type === 'audiorec') {
            schemaTable = [
              ...schemaTable,
              {
                name: component.data_name,
                type: 'string'
              }
            ]
          }
          if (component.component_type === 'checkbox' || component.component_type === 'geoloc') {
            schemaTable = [
              ...schemaTable,
              {
                name: component.data_name,
                type: 'json'
              }
            ]
          }
          if (component.component_type === 'radio') {
            schemaTable = [
              ...schemaTable,
              {
                name: component.data_name,
                type: 'integer'
              }
            ]
          }
          if (component.component_type === 'date') {
            schemaTable = [
              ...schemaTable,
              {
                name: component.data_name,
                type: 'date'
              }
            ]
          }
        })
      })


      schemaTable.map(async item => {
        if (item.type === 'string') {
          await knex.schema.table(form.form_name, function (t) {
            t.string(item.name)
          })
        }
        if (item.type === 'json') {
          await knex.schema.table(form.form_name, function (t) {
            t.string(item.name)
          })
        }
        if (item.type === 'integer') {
          await knex.schema.table(form.form_name, function (t) {
            t.string(item.name)
          })
        }
        if (item.type === 'date') {
          await knex.schema.table(form.form_name, function (t) {
            t.date(item.name)
          })
        }
        if (item.type === 'array') {
          await knex.schema.table(form.form_name, function (t) {
            t.specificType(item.name, 'text[]')
          })
        }
      })
      /* .then(async function (exists) {
        if (!exists) {
          return await knex.schema.createTable(form.form_name, function (t) {
            t.increments()
            form.steps.map(step => {
              step.components.map(async component => {

                if (component.component_type === 'text' || component.component_type === 'scanner' || component.component_type === 'camera') {
                  await knex.schema.table(form.form_name, function (t) {
                    t.string(component.data_name)
                  })
                }
                if (component.component_type === 'date') {
                  await knex.schema.table(form.form_name, function (t) {
                    t.date(component.data_name)
                  })
                }
              })
            })
            t.timestamps()
          });
        }
      }); */

      console.log('---------------------fiz a relaçao------------------------', table)


      console.log('---------------------construiu tabela------------------------')
    }

    return res.status(200).json({ mensage: 'Sucesso', data: formResult, schemaTable })
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

  async receiver(req, res) {
    const { test_name, discipline_id, authorization } = req.headers
    const files = req.files
    const body = req.body
    var insertTable = {}
    let user
    let test

    console.log(test_name, discipline_id, authorization, body)

    try {
      user = await User.findOne({
        where: {
          token: authorization
        }
      })
    } catch (error) {
      return res
        .status(500)
        .json({
          error: 'error interno - USER',
          data: error
        })
    }

    // verica usuario
    if (!user) {
      return res
        .status(400)
        .json({ error: 'usuario nao encontrado' })
    }

    try {
      test = await Form.findAll({
        where: {
          discipline_id,
          table_name: test_name
        }
      })
    } catch (error) {
      return res
        .status(500)
        .json({
          error: 'error interno - FORM',
          data: error
        })
    }



    // verifica formulario
    if (!test) {
      return res
        .status(400)
        .json({ error: 'Teste não encontrado' })
    }

    insertTable = {
      ...insertTable,
      student_id: user.id
    }

    /*
        files.map(file => {
          insertTable = {
            ...insertTable,
            [file.fieldname]: file.filename
          }
        }) */

    files.map(file => {
      insertTable = {
        ...insertTable,
        [file.fieldname]: []
      }
    })

    files.map(file => {
      Object.keys(insertTable).map(key => {
        if (key === file.fieldname) {
          console.log('\nkeyyy and fildname', key, file.fieldname, '\n\n')
          insertTable[key] = [...insertTable[key], file.filename]
          console.log('\narray', insertTable[key], '\n\n')
        }
      })

      console.log('\ninsertTable', insertTable, '\n\n')
    })


    Object.keys(body).map(key => {
      insertTable = {
        ...insertTable,
        [key]: body[key],
      }
    })

    console.log('\n\n\n', insertTable, '\n\n\n')

    try {
      await knex(test_name).insert(insertTable);
      console.log('\n\n\n', { mensage: 'ok', file: req.files, body: req.body, insertTable })
      // return res.status(200).json({ mensage: 'ok', file: req.files, body: req.body, insertTable })
    } catch (error) {
      return res
        .status(400)
        .json({
          error: 'error - INSERT TABLE',
          data: error,
          insertTable,
          test_name
        })
    }

    //create docs
    let imagesDoc = {};
    files.map(item => {
      imagesDoc[item.fieldname] = item.path;
    })

    console.log('\n\n\n tentei -->   ', imagesDoc, '\n\n\n', `${test_name}-${discipline_id}.docx`)

    let content;
    try {
      content = fs.readFileSync(path.resolve(__dirname, '..', '..', 'assets', `${test_name}-${discipline_id}.docx`), 'binary')
    } catch (error) {
      return res
        .status(404)
        .json({
          error: "ERROR FILE", mensage: 'Não existe template em docs x para o formulario',
          test_name,
          discipline_id,
          docName: `${test_name}-${discipline_id}.docx`,
        });
    }


    var opts = {};
    opts.centered = false;
    opts.getImage = function (tagValue, tagName) {
      console.log('tag value', tagValue);
      return fs.readFileSync(tagValue);
    };
    opts.getSize = function (img, tagValue, tagName) {
      return [300, 300];
    };

    var imageModule = new ImageModule(opts);
    console.log('fiz imagem');

    var zip = new PizZip(content);
    console.log('fiz piz zip');
    var doc = new Docxtemplater();

    console.log('nova instancia doc');
    doc.attachModule(imageModule)
    console.log('chamei image');
    try {
      doc.loadZip(zip)
        .setData({
          ...body,
          ...imagesDoc,
          test_name,
          authorization: user.name,
        })
        .render();

      //set the templateVariables
      console.log('cheghei aqui');
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      // doc.render()
      console.log('renderizei');

    }
    catch (error) {
      var e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
        imagesDoc,
        files,
      }
      console.log(e);
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
      return res.json(e).status(500);
    }

    var buf = doc.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE" });

    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', `${test_name}-${discipline_id}-${authorization}.docx`), buf);
    console.log('terminando');

  }

  async show(req, res) {
    const student_id = req.params.id
    const { test_name } = req.headers
    let test
    let user
    let form

    // verifia usuario
    user = await User.findByPk(student_id)
    if (!user) {
      return res
        .status(400)
        .json({
          mensage: 'usuario inexistente'
        })
    }

    // verifica formulario
    form = await Form.findOne({
      where: {
        table_name: test_name
      }
    })

    if (!form) {
      return res
        .status(400)
        .json({
          mensage: 'teste inexistente'
        })
    }

    try {
      test = await knex(test_name).where({ student_id })

      return res
        .status(200)
        .json({
          mensage: 'Success',
          student_id,
          test_name,
          data: test
        })
    } catch (err) {
      return res
        .status(500)
        .json({
          error: 'Erro internal',
          err
        })
    }
  }

  async storeDoc(req, res) {
    //const body = req.body
    return res.status(201).json({ mensage: 'upload com sucesso', })
  }
}

module.exports = new FormController()
