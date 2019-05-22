const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const routes = express.Router()

// import CONTROLLERS
const FormController = require('./app/controllers/FormController')
const CourseController = require('./app/controllers/CourseController')
const DisciplineControlle = require('./app/controllers/DisciplineController')
const UserControlle = require('./app/controllers/UserController')
const ClassController = require('./app/controllers/ClassController')
const StudentController = require('./app/controllers/StudentController')

// ------------------------ ROUTES --------------------


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
routes.post('/user/login', UserControlle.login) // lista todos os cursos
routes.get('/user', UserControlle.index) // lista todos os cursos
routes.put('/user/:id', UserControlle.update)// atualiza um curso

//class
routes.post('/class', ClassController.store) // cria classe
routes.get('/class', ClassController.index) // lista todos os cursos
routes.put('/class/:id', ClassController.update)// atualiza um curso

// forms
routes.post('/form', FormController.store)
routes.get('/form', FormController.index) // lista todos os testes
routes.post('/form/receiver', upload.any(), FormController.receiver)

//students
routes.post('/student', StudentController.store)
routes.get('/student', StudentController.index)

// test
routes.get('/test', UserControlle.test) // lista todos os cursos

module.exports = routes
