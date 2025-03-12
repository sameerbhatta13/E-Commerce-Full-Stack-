const multer = require('multer')

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + file.originalname)
  }
})

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 }, storage: storage })

module.exports = upload