const multer = require('multer')
const upload = multer({ dest: 'public/uploads' })


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimeType==="jpg") {
        cb(null, true)
    } else {
        cb(null, false)
        req.fileError = 'ppp'
    }
}
console.log(fileFilter);



module.exports=fileFilter;