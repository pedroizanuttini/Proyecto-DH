const multer = require('multer')
const upload = multer({ dest: 'public/uploads' })


const fileFilter = async(req, file) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimeType==="jpg") {
        return true
    } else {
        req.fileError = 'ppp'
        return false
    }
}
console.log(fileFilter);



module.exports=fileFilter;