const { Router } = require('express');
const { showHome } = require('../controllers/index.controller');

const router = Router();

router.get('/', showHome);  // http://localhost:3000/home  GET


module.exports = router;