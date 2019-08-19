const path = require('path')
const crypto = require('crypto')
const multer = require('multer')

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'assets'),
    filename: (req, file, cb) => {
      const body = req.body
      console.log('my body', body)
      cb(null, `${body.form_name}-${body.discipline}.docx`)
    }
  })
}
