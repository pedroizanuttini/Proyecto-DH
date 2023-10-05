const { Router } = require('express');
const {createUser, login } = require('../controllers/auth.controller');
const multer = require('multer')
const upload = multer({ dest: 'public/uploads' })
const { fieldValidator } = require('../middlewares/fields-validators');
const fs=require('express-validator');
const {check} = require('express-validator');

const router = Router();



router.post('/register',upload.single('avatar'),
[check('email','El email es obligatorio').trim().notEmpty(),
check('email','Ingrese un correo electronico valido').isEmail(),
check('password', 'La contrasena es obligatoria').trim().notEmpty(),
check('fname','El nombre debe tener entre 2 y 15 caracteres').trim().isLength({min:2, max:15}),
check('lname','El apellido no debe tener mas de 20 caracteres').trim().isLength({max:20}),
check('password','La contrasena debe contener al menos 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
],fieldValidator,createUser)  //http://localhost:3000/v1/api/auth/register
router.post('/login',[check('email','El email es obligatorio').trim().notEmpty(),
    check('password','La contrasena es obligatoria').trim().notEmpty()], login); //http://localhost:3000/v1/api/auth/login



module.exports = router;

