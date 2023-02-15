const { Router } = require('express');
const {showLogin,showRegister, createUser, login}=require('../controllers/auth.controller');
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads' })

const router = Router();

router.get('/login', showLogin)  // http://localhost:3000/auth/login
router.get('/register', showRegister)  // http://localhost:3000/auth/register

router.post('/new', upload.single('avatar'),createUser)  //http://localhost:3000/auth/new
router.post('/login', login);

module.exports = router;

