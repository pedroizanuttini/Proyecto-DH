const { Router } = require('express');
const {showLogin,showRegister}=require('../controllers/auth.controller');

const router = Router();

router.get('/login', showLogin)  // http://localhost:3000/auth/login
router.get('/register', showRegister)  // http://localhost:3000/auth/register

module.exports = router;

