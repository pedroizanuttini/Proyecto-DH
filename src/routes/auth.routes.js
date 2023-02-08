const { Router } = require('express');
const {showLogin,showRegister, createUser}=require('../controllers/auth.controller');

const router = Router();

router.get('/login', showLogin)  // http://localhost:3000/auth/login
router.get('/register', showRegister)  // http://localhost:3000/auth/register

router.post('/new', createUser)  //http://localhost:3000/auth/new

module.exports = router;

