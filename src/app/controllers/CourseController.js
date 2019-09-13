const { Course, User } = require('../models')

class CourseController {
  //lista todos os cursos
  async index(req, res) {
    let filter = {}
    if (req.query.course_id) {
      filter = {
        id: req.query.course_id
      }
    }
    if (req.query.course_name) {
      filter = {
        name: req.query.course_name
      }
    }

    try {
      const courses = await Course.findAll({
        where: filter
      })

      return res.json({ data: courses, total: courses.length })
    } catch (error) {
      return res.status(500).json({ error: error, mensage: 'SEVERAL ERROR' })
    }



  }

  //cria um novo curso no bd
  async store(req, res) {
    const { name } = req.body
    const { authorization } = req.headers

    try {
      const user = await User.findOne({ where: { token: authorization } })
      if (user === null || user.type !== 'admin') {
        return res.status(401).json({ error: 'Acesso negado!' })
      }
    } catch (error) {
      return res.status(500).json({ mensage: 'SEVERAL ERROR - USER', error: error })
    }


    try {
      const search = await Course.findAll({ where: { name } })
      console.log(authorization)
      if (search.length !== 0) {
        return res.status(400).json({ error: 'Ja existe esse curso' })
      }
    } catch (error) {
      return res.status(500).json({ mensage: 'SEVERAL ERROR - COURSE', error: error })
    }

    try {
      const course = await Course.create(req.body)

      return res.json(course)
    } catch (error) {
      return res.status(500).json({ mensage: 'SEVERAL ERROR - CREATE COURSE', error: error })
    }



  }

  // atualiza algum curso no bd
  async update(req, res) {
    const id = req.params.id
    const { authorization } = req.headers

    try {
      const user = await User.findOne({ where: { token: authorization } })
      if (user === null || user.type !== 'admin') {
        return res.status(401).json({ error: 'Acesso negado' })
      }
    } catch (error) {
      return res.status(500).json({ mensage: 'SEVERAL ERROR - USER', error: error })
    }

    try {
      const test = await Course.findByPk(id)
      console.log(id)
      if (test === null) {
        return res.status(400).json({ error: 'Não ha esse curso' })
      }
    } catch (error) {
      return res.status(500).json({ mensage: 'SEVERAL ERROR - COURSE', error: error })
    }

    try {
      const course = await Course.update(req.body, { where: { id } })
      return res.status(200).json({ id: id, mensage: 'Atualização feita com sucesso!', data: req.body })
    } catch (error) {
      return res.status(500).json({ mensage: 'SEVERAL ERROR - UPDATE COURSE', error: error })
    }
  }

}

module.exports = new CourseController()