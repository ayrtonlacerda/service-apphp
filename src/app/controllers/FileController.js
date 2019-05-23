const { File } = require('../models')
const path = require('path')
const multerConfig = require('../../config/multer')
const upload = require('multer')(multerConfig)

class FileController {
  async show(req, res) {
    const { file } = req.params

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      file
    )

    return res.sendFile(filePath)
  }
}

module.exports = new FileController()