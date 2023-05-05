const { Router } = require('express');
const {showCarrito}=require('../controllers/carrito.controller');


const router = Router();

router.get('/', showCarrito);

module.exports = router;