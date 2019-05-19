const express = require('express')

const routes = express.Router()

// import CONTROLLERS
const FormController = require('./app/controllers/FormController')
const CourseController = require('./app/controllers/CourseController')
const DisciplineControlle = require('./app/controllers/DisciplineController')
const UserControlle = require('./app/controllers/UserController')

// ------------------------ ROUTES --------------------

routes.post('/forms', FormController.store)
routes.get('/forms', FormController.createForm)


// Course

routes.get('/course', CourseController.index) // lista todos os cursos
routes.post('/course', CourseController.store) // cria um novo curso
routes.put('/course/:id', CourseController.update)// atualiza um curso

// Discipline

routes.post('/discipline', DisciplineControlle.store) //cria nova disciplina
routes.get('/discipline', DisciplineControlle.index) // lista todos os cursos
routes.put('/discipline/:id', DisciplineControlle.update)// atualiza um curso

// Users
routes.post('/user', UserControlle.store) // lista todos os cursos
routes.get('/user', UserControlle.index) // lista todos os cursos
routes.put('/user/:id', UserControlle.update)// atualiza um curso

// test
routes.get('/testes', UserControlle.test) // lista todos os cursos

module.exports = routes
