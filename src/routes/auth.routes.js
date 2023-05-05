const { Router } = require('express');
const { body } = require('express-validator');
const { showLogin, showRegister, createUser, login } = require('../controllers/auth.controller');
const multer = require('multer')
const upload = multer({ dest: 'public/uploads' })
const { fieldValidator } = require('../middlewares/fields-validators');
const fs=require('express-validator');
const authMiddleware=require('../middlewares/authMiddleware');

const router = Router();

router.get('/login', authMiddleware, showLogin)  // http://localhost:3000/auth/login
router.get('/register',authMiddleware, showRegister)  // http://localhost:3000/auth/register

router.post('/new',authMiddleware,upload.single('avatar'),/*[
    // body('fname','el nombre debe tener al menos dos caracteres').isLength({min:2, max:24}),
    // body('email', 'el email del campo es obligatorio').not().isEmpty(),
    // body('email', 'el valor ingresado no es un email válido').isEmail(),
    // body('password', 'la contraseña debe tener entre 8 y 12 caracteres').isLength({ min: 8, max: 12 }),
    // body('password','la contraseña debe contener al menos una Mayúscula, minúscula,números y caracteres especiales').matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"),
    // body('image')
    //     .custom((value, {req}) => {
    //         const file = req.file
    //         const extensiones="La imagen deber ser jpg, png ,jpeg y tamano maximo 10 mb"
    //         if(!file) {
    //             throw new Error(extensiones)
    //         }else if (file.size > (1024*1024*10)){
    //             fs.unlinkSync(file.path, (er)=>{console.log(er)})
    //             throw new Error(extensiones)
    //         }
    //         return true;
    //     }),
    fieldValidator
]*/ createUser)  //http://localhost:3000/auth/new
router.post('/login', authMiddleware,/*[
    // body('email', 'el nombre del campo es obligatorio').not().isEmpty(),
    // body('email', 'el valor ingresado no es un email válido').isEmail(),
    // body('password', 'la contraseña debe tener entre 8 y 12 caracteres').isLength({ min: 8, max: 12 }),
    // fieldValidator
]*/ login);//http://localhost:3000/auth/login

router.get('/logout', (req, res) => {
    req.session.userLogged = false; // destruye la sesión
    res.redirect('/auth/login'); // redirige al login
});

module.exports = router;

