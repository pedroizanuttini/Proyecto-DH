const multer = require('multer')
const upload = multer({ dest: 'public/uploads' })


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || (file.mimeType).includes("jpg")) {
        cb(null, true)
    } else {
        cb(null, false)
        req.fileError = 'ppp'
    }
}

// const fileFilter =(req,file,cb) => {
//     if((file.mimeType).includes("jpg") || (file.mimetype).includes("jpg") || (file.mimeType).includes("jpeg")){
//         upload(null,true)
//     }else{
//         upload(null, false)
//         req.fileError = "ppp"
//     }
// }

module.exports=fileFilter;