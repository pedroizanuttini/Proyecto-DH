const { Router } = require('express');
const { check } = require('express-validator');
const {showLogin,showRegister, createUser, login}=require('../controllers/auth.controller');
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads' })
const { fieldValidator } = require('../middlewares/fields-validators');

const router = Router();

router.get('/login', showLogin)  // http://localhost:3000/auth/login
router.get('/register', showRegister)  // http://localhost:3000/auth/register

router.post('/new', upload.single('avatar'),createUser)  //http://localhost:3000/auth/new
router.post('/login',[                                   
    check('email','el nombre del campo es obligatorio').not().isEmpty(),
    check('email','el valor ingresado no es un email válido').isEmail(),
    check('password','la contraseña debe tener entre 6 y 12 caracteres').isLength({ min:6, max:12 }), 
    fieldValidator 
],login);//http://localhost:3000/auth/login

module.exports = router;

